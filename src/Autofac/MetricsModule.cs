using App.Metrics;
using App.Metrics.AspNetCore.Endpoints;
using App.Metrics.Formatters.Json;
using App.Metrics.Formatters.Prometheus;
using Autofac;
using checklistdojo.Metrics;
using Microsoft.Extensions.Options;

namespace checklistdojo.Autofac
{
    public class MetricsModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<ConfigureMetricsEndpointOptions>()
                .As<IConfigureOptions<MetricEndpointsOptions>>()
                .SingleInstance();

            builder.Register(ConfigureMetrics)
                .As<IMetricsRoot>()
                .As<IMetrics>()
                .SingleInstance();

            builder.RegisterType<CrtcieMetricsRegistry>()
                .As<ICrtcieMetricsRegistry>()
                .SingleInstance();
        }

        private static IMetricsRoot ConfigureMetrics(IComponentContext context)
        {
            return AppMetrics.CreateDefaultBuilder()
                .OutputMetrics.AsPrometheusPlainText()
                .OutputMetrics.AsPrometheusProtobuf()
                .Build();
        }

        public class ConfigureMetricsEndpointOptions : IConfigureOptions<MetricEndpointsOptions>
        {
            public void Configure(MetricEndpointsOptions options)
            {
                var prometheusOptions = new MetricsPrometheusOptions();

                options.EnvironmentInfoEndpointEnabled = true;
                options.EnvInfoEndpointOutputFormatter = new EnvInfoJsonOutputFormatter();

                options.MetricsEndpointEnabled = true;
                options.MetricsEndpointOutputFormatter =
                    new MetricsPrometheusProtobufOutputFormatter(prometheusOptions);

                options.MetricsTextEndpointEnabled = true;
                options.MetricsTextEndpointOutputFormatter =
                    new MetricsPrometheusTextOutputFormatter(prometheusOptions);
            }
        }
    }
}
