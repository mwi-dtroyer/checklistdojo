using System.Collections.Generic;
using System.Net;
using Microsoft.AspNetCore.HttpOverrides.Internal;

namespace ChecklistDojo.Configuration
{
    public class ServerConfig
    {
        /// <summary>
        /// Indicates if any errors returned by the server should return the full exception, if one is attached to the error.
        /// </summary>
        public bool ErrorsIncludeException { get; set; }

        public List<ServerListenConfig> Listen { get; set; }
    }

    public class ServerListenConfig
    {
        public string Host { get; set; }

        public ServerTlsConfig Tls { get; set; } = null;

        public IPEndPoint EndPoint()
        {
            if (string.IsNullOrWhiteSpace(Host))
            {
                return null;
            }

            if (IPEndPointParser.TryParse(Host, out var endpoint))
            {
                return endpoint;
            }

            return null;
        }
    }

    public class ServerTlsConfig
    {
        public bool Enabled { get; set; }

        public string CertPath { get; set; }

        public string CertPassword { get; set; }

        public string CertThumbprint { get; set; }
    }
}