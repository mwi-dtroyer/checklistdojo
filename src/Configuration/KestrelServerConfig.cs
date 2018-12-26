using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Security.Cryptography.X509Certificates;
using System.Security.Principal;
using CheckListDojo.Extensions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.Extensions.Options;
using Serilog;

namespace CheckListDojo.Configuration
{
    public interface IKestrelServerConfig
    {
        void ApplyConfiguration(KestrelServerOptions options);
    }

    public class KestrelServerConfig : IKestrelServerConfig
    {
        private const string DefaultCertStoreName = "WebHosting";
        private const StoreLocation DefaultCertStoreLocation = StoreLocation.LocalMachine;

        private ILogger Log { get; }

        private ServerConfig ServerConfig { get; }

        public KestrelServerConfig(ILogger log,
            IOptions<ServerConfig> serverConfig)
        {
            Log = log.ForContext<KestrelServerConfig>();
            ServerConfig = serverConfig.Value;
        }

        public void ApplyConfiguration(KestrelServerOptions options)
        {
            // Disables the default "Server" HTTP header that Kestrel adds.
            // This -will not- add a custom Server header.
            options.AddServerHeader = false;

            if (ServerConfig.Listen == null || ServerConfig.Listen.Count == 0)
            {
                Log.Warning(
                    "Server configuration does not contain any IPEndPoints defined. Using default bindings if available.");
                return;
            }

            var nonTlsBindings = ServerConfig.Listen
                .Where(c => c.Tls == null)
                .ToList();

            var tlsBindings = ServerConfig.Listen
                .Where(c => c.Tls != null)
                .ToList();

            SetupNonTlsBindings(options, nonTlsBindings);
            SetupTlsBindings(options, tlsBindings);
        }

        private void SetupNonTlsBindings(KestrelServerOptions options, List<ServerListenConfig> configs)
        {
            Log.Debug("Have {count} bindings without TLS enabled", configs.Count);
            if (configs.Count == 0)
            {
                return;
            }

            foreach (var binding in configs)
            {
                var endpoint = binding.EndPoint();
                if (endpoint == null)
                {
                    Log.Warning("Failed to bind to {endpoint}", binding.Host);
                    continue;
                }

                Log.Information("Binding to endpoint {endpoint}", endpoint);
                options.Listen(endpoint);
            }
        }

        private void SetupTlsBindings(KestrelServerOptions options, List<ServerListenConfig> configs)
        {
            Log.Debug("Have {count} bindings with TLS enabled", configs.Count);
            if (configs.Count == 0)
            {
                return;
            }

            using (var certStore = GetCertificateStore())
            {
                certStore?.Open(OpenFlags.ReadOnly);

                // CertificatesKeyedByThumbprint is an extension method that will handle null-checking
                // on certStore. If certStore is null, this should return an empty dictionary.
                Dictionary<string, X509Certificate2> certs;
                if (IsRunningAsWindowsAdmin())
                {
                    certs = certStore?.CertificatesKeyedByThumbprint() ?? new Dictionary<string, X509Certificate2>();
                }
                else
                {
                    certs = new Dictionary<string, X509Certificate2>();
                }

                Log.Debug("Cert store at {@storeInfo} has {count} certificates available.",
                    new {Location = DefaultCertStoreLocation, Name = DefaultCertStoreName}, certs.Count);

                foreach (var binding in configs)
                {
                    BindToTlsHost(options, binding, certs);
                }

                certStore?.Close();
            }
        }

        private void BindToTlsHost(KestrelServerOptions options, ServerListenConfig binding,
            Dictionary<string, X509Certificate2> availableCerts)
        {
            var endpoint = binding.EndPoint();
            if (endpoint == null)
            {
                Log.Warning("Failed to bind to {endpoint}", binding.Host);
                return;
            }

            var certThumbprint = CleanupCertThumbprint(binding.Tls.CertThumbprint);
            var haveCert = availableCerts.TryGetValue(certThumbprint ?? "", out var cert);

            if (!haveCert)
            {
                // Otherwise, we don't have a certificate so we'll need to fallback on to the path that -should-
                // be in the CertPath property in the binding.
                if (!File.Exists(binding.Tls.CertPath))
                {
                    Log.Fatal("TLS certificate does not exist at {path}", binding.Tls.CertPath);
                    throw new FileNotFoundException(
                        "TLS certificate file was not found at the specified path.",
                        binding.Tls.CertPath);
                }

                Log.Information("Using TLS certificate from file system at {path}", binding.Tls.CertPath);

                cert = string.IsNullOrWhiteSpace(binding.Tls.CertPassword)
                    ? new X509Certificate2(binding.Tls.CertPath)
                    : new X509Certificate2(binding.Tls.CertPath, binding.Tls.CertPassword);
            }
            else
            {
                Log.Information("Using TLS certificate from certificate store. {@storeInfo}",
                    new {Location = DefaultCertStoreLocation, Name = DefaultCertStoreName});
            }

            Log.Information("Binding to endpoint {endpoint}", endpoint);
            options.Listen(endpoint, opts => { opts.UseHttps(cert); });
        }

        private bool IsRunningAsWindowsAdmin()
        {
            if (!RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
            {
                return false;
            }

            try
            {
                var ident = WindowsIdentity.GetCurrent();
                var principal = new WindowsPrincipal(ident);
                var isAdmin = principal.IsInRole(WindowsBuiltInRole.Administrator);
                return isAdmin;
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Failed to determine if current user is a Windows administrator");
                Log.Warning("Assuming current user is NOT a Windows administrator");
                return false;
            }
        }

        private X509Store GetCertificateStore()
        {
            if (!RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
            {
                Log.Debug(
                    "Current OS does not appear to be Windows. {typeName} will not be used for certificate selection.",
                    typeof(X509Store).Name);

                return null;
            }

            Log.Debug("Current OS appears to be Windows. Will include {typeName} for certificate selection.",
                typeof(X509Store).Name);

            return new X509Store(DefaultCertStoreName, DefaultCertStoreLocation);
        }

        private static string CleanupCertThumbprint(string thumbprint)
        {
            if (string.IsNullOrWhiteSpace(thumbprint))
            {
                return thumbprint;
            }

            // We're using this to clean up the thumbprint to remove white space
            // and non-standard characters that can sometimes be included in thumbprint strings.
            var thumbprintChars = thumbprint.ToLower()
                .ToCharArray()
                .Where(char.IsLetterOrDigit)
                .ToArray();

            return new string(thumbprintChars);
        }
    }
}
