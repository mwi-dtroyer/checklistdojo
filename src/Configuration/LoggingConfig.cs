using Serilog.Events;

namespace checklistdojo.Configuration
{
    public class LoggingConfig
    {
        public static string DefaultLogTemplate { get; } =
            "[{Timestamp:yyyy-MM-dd HH:mm:ss} {Level}](CorrelationIdProvidedExternally:{CorrelationIdProvidedExternally})({CorrelationId})({SourceContext}) {Message}{NewLine}{Exception}";

        public bool EnableKestrelLogging { get; set; } = true;

        public LogEventLevel MinLevel { get; set; } = LogEventLevel.Debug;

        public string LogFile { get; set; } = "default-{Date}.log";

        public int NumberOfFilesToKeep { get; set; } = 1;
    }
}
