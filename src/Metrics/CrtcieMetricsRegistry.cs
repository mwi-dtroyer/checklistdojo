using App.Metrics;
using App.Metrics.Meter;
using App.Metrics.Timer;

namespace checklistdojo.Metrics
{
    public interface ICrtcieMetricsRegistry
    {
        TimerOptions CrtcieTimer { get; }
        MeterOptions CrtcieSuccesses { get; }
        MeterOptions CrtcieFails { get; }
    }

    public class CrtcieMetricsRegistry : ICrtcieMetricsRegistry
    {
        public TimerOptions CrtcieTimer => new TimerOptions
        {
            Name = "crtcie_timer",
            MeasurementUnit = Unit.Items,
            DurationUnit = TimeUnit.Milliseconds,
            RateUnit = TimeUnit.Milliseconds
        };

        public MeterOptions CrtcieSuccesses => new MeterOptions
        {
            Name = "crtcie_successes",
            MeasurementUnit = Unit.Events,
        };

        public MeterOptions CrtcieFails => new MeterOptions
        {
            Name = "crtcie_fails",
            MeasurementUnit = Unit.Events,
        };
    }
}
