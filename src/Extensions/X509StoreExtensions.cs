using System.Collections.Generic;
using System.Security.Cryptography.X509Certificates;

namespace CheckListDojo.Extensions
{
    public static class X509StoreExtensions
    {        
        /// <summary>
        /// Retrieves all of the certificates from the certificate store as a dictionary keyed by their thumbprints.
        /// </summary>
        public static Dictionary<string, X509Certificate2> CertificatesKeyedByThumbprint(this X509Store certStore)
        {
            if (certStore == null)
            {
                return new Dictionary<string, X509Certificate2>();
            }

            var dict = new Dictionary<string, X509Certificate2>();
            foreach (var cert in certStore.Certificates)
            {
                var thumbprint = cert.Thumbprint?.ToLower();

                if (dict.ContainsKey(thumbprint))
                {
                    dict[thumbprint] = cert;
                    continue;
                }

                dict.Add(thumbprint, cert);
            }

            return dict;
        }
    }
}
