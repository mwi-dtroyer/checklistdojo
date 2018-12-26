using System;
using System.Threading;
using Autofac;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using ChecklistDojo.Configuration;
using Serilog;
using Serilog.Context;
using Serilog.Core;
using Serilog.Events;
using Serilog.Exceptions;
using Serilog.Formatting.Json;

namespace ChecklistDojo.Autofac
{
    public class LoggingModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<LogFilter>()
                .SingleInstance();

            builder.Register(ConfigureLoggingLevelSwitch)
                .AsSelf()
                .SingleInstance();

            builder.Register(ConfigureLogging)
                .AsSelf();

            builder.Register(CreateLogger)
                .As<ILogger>()
                .AsSelf();
        }

        private LoggingLevelSwitch ConfigureLoggingLevelSwitch(IComponentContext context)
        {
            var config = context.Resolve<IOptions<LoggingConfig>>().Value;
            var logLevelSwitch = new LoggingLevelSwitch(config.MinLevel);

            return logLevelSwitch;
        }

        private LoggerConfiguration ConfigureLogging(IComponentContext context)
        {
            var filter = context.Resolve<LogFilter>();
            var config = context.Resolve<IOptions<LoggingConfig>>().Value;


            return new LoggerConfiguration()
                .Enrich.WithExceptionDetails()
                .Enrich.FromLogContext()
                .MinimumLevel.Is(LogEventLevel.Verbose) // This is controlled through the log filter.
                .Filter.ByIncludingOnly(filter.Filter)
                .WriteTo.LiterateConsole(outputTemplate: LoggingConfig.DefaultLogTemplate)
                .WriteTo.RollingFile(
                    new JsonFormatter(),
                    config.LogFile,
                    retainedFileCountLimit: config.NumberOfFilesToKeep,
                    shared: true);
        }

        private static ILogger CreateLogger(IComponentContext context)
        {
            var httpCtx = context.Resolve<IHttpContextAccessor>();
            var config = context.Resolve<LoggerConfiguration>();
            var correlationIdProvided = httpCtx?.HttpContext?.Request?.Headers
                ?.TryGetValue(MwiHeaders.MwiCorrelationId, out var correlationId) ?? false;

            LogContext.PushProperty("CorrelationId", correlationIdProvided
                ? correlationId.ToString()
                : Guid.NewGuid().ToString());

            LogContext.PushProperty("CorrelationIdInHeader", correlationIdProvided);

            return config.CreateLogger();
        }

        public class LogFilter : IDisposable
        {
            public bool Disposed { get; private set; }

            private IOptionsMonitor<LoggingConfig> ConfigMonitor { get; }

            private IDisposable LoggingConfigChangedHandle { get; set; }

            private LoggingConfig CurrentConfig => _currentConfig;
            private LoggingConfig _currentConfig;

            public LogFilter(IOptionsMonitor<LoggingConfig> configMonitor)
            {
                ConfigMonitor = configMonitor;
                LoggingConfigChangedHandle = ConfigMonitor.OnChange(LoggingConfigChanged);
                _currentConfig = ConfigMonitor.CurrentValue;
            }

            ~LogFilter()
            {
                Dispose(false);
            }

            public bool Filter(LogEvent logEvent)
            {
                if (logEvent.Level < CurrentConfig.MinLevel)
                {
                    return false;
                }

                // We always want to log warning or above.
                if (logEvent.Level >= LogEventLevel.Warning)
                {
                    return true;
                }

                var hasSourceContext = logEvent.Properties.TryGetValue("SourceContext", out var sourceContextValue);
                if (hasSourceContext)
                {
                    var sourceContext = sourceContextValue.ToString().Trim('"');
                    if (sourceContext.StartsWith("Microsoft.AspNet"))
                    {
                        return CurrentConfig.EnableKestrelLogging;
                    }
                }

                return true;
            }

            private void LoggingConfigChanged(LoggingConfig config)
            {
                Interlocked.Exchange(ref _currentConfig, config);
            }

            public void Dispose()
            {
                Dispose(true);
                GC.SuppressFinalize(this);
            }

            protected virtual void Dispose(bool disposing)
            {
                if (Disposed)
                {
                    return;
                }

                if (disposing)
                {
                    LoggingConfigChangedHandle?.Dispose();
                    LoggingConfigChangedHandle = null;
                }

                Disposed = true;
            }
        }
    }
}
