using System;
using System.IO;
using Autofac.Extensions.DependencyInjection;
using CheckListDojo.Configuration;
using CommandLine;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Serilog;
using Serilog.Events;
using Serilog.Exceptions;

namespace CheckListDojo
{
    public class Program
    {
        private static ILogger StartupLogger { get; set; }

        public static int Main(string[] args)
        {
            StartupLogger = new LoggerConfiguration()
                .Enrich.WithExceptionDetails()
                .MinimumLevel.Is(LogEventLevel.Verbose)
                .WriteTo.LiterateConsole(outputTemplate: LoggingConfig.DefaultLogTemplate)
                .CreateLogger()
                .ForContext<Startup>();

            var exitCode = Parser.Default
                .ParseArguments<ProgramOptions>(args)
                .MapResult(Run, errors => 1);

            //CreateWebHostBuilder(args).Build().Run(); //automatically generated
            return exitCode;
        }

        //following copied from Efs.Operators
        private static int Run(ProgramOptions options)
        {
            StartupLogger.Verbose("Attempting to load configuration file {configFile}.", options.ConfigFile);
            IConfiguration config;
            try
            {
                config = LoadConfiguration(options.ConfigFile);
            }
            catch (Exception ex)
            {
                StartupLogger.Fatal(ex, "Failed to load configuration file.");
                return 1;
            }

            StartupLogger.Debug("Successfully loaded configuration file.");
            StartupLogger.Verbose("Attempting to create web host.");

            IWebHost host;
            try
            {
                host = CreateWebHost(config);
            }
            catch (Exception ex)
            {
                StartupLogger.Fatal(ex, "Failed to create web host.");
                return 1;
            }

            host.Run();

            return 0;
        }

        private static IWebHost CreateWebHost(IConfiguration config)
        {
            return new WebHostBuilder()
                .UseKestrel(ConfigureKestrel)
                .ConfigureServices(s => PreConfigureServices(config, s))
                .UseConfiguration(config)
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseStartup<Startup>()
                .Build();
        }

        private static void ConfigureKestrel(KestrelServerOptions options)
        {
            options.ApplicationServices.GetService<IKestrelServerConfig>()?
                .ApplyConfiguration(options);
        }

        private static void PreConfigureServices(IConfiguration config, IServiceCollection services)
        {
            services.AddAutofac();

            services
                .Configure<DatabaseConfig>(config.GetSection("database"))
                .Configure<LoggingConfig>(config.GetSection("logging"))
                .Configure<ServerConfig>(config.GetSection("server"));

            services
                .AddSingleton<IKestrelServerConfig, KestrelServerConfig>();
        }

        private static IConfiguration LoadConfiguration(string path)
        {
            var configFilePath = GetConfigFilePath(path);

            StartupLogger.Debug("Loading configuration from {configFilePath.", configFilePath);

            IConfiguration config;
            try
            {
                config = new ConfigurationBuilder()
                    .AddJsonFile(configFilePath, optional: false, reloadOnChange: true)
                    .Build();
            }
            catch (Exception ex)
            {
                StartupLogger.Error(ex, "Failed to load configuration from {configFilePath}.", configFilePath);
                throw;
            }

            return config;
        }

        private static string GetConfigFilePath(string path)
        {
            if (!string.IsNullOrWhiteSpace(path))
            {
                return path;
            }

            var assemblyLocation = typeof(Program).Assembly.Location;
            var assemblyPath = Path.GetDirectoryName(assemblyLocation);

            return Path.Combine(assemblyPath, "appsettings.json");
        }
    }
}
