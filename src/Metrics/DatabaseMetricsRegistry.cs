using App.Metrics;
using App.Metrics.Meter;
using App.Metrics.Timer;

namespace CheckListDojo.Metrics
{
    public interface IDatabaseMetricsRegistry
    {
        TimerOptions DatabaseTimer { get; }
        MeterOptions DatabaseSuccesses { get; }
        MeterOptions DatabaseFails { get; }
    }

    public class DatabaseMetricsRegistry : IDatabaseMetricsRegistry
    {
        public TimerOptions DatabaseTimer => new TimerOptions
        {
            Name = "database_timer",
            MeasurementUnit = Unit.Items,
            DurationUnit = TimeUnit.Milliseconds,
            RateUnit = TimeUnit.Milliseconds
        };

        public MeterOptions DatabaseSuccesses => new MeterOptions
        {
            Name = "database_successes",
            MeasurementUnit = Unit.Events,
        };

        public MeterOptions DatabaseFails => new MeterOptions
        {
            Name = "database_fails",
            MeasurementUnit = Unit.Events,
        };
    }
}
