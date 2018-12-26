using CommandLine;

namespace ChecklistDojo
{
    public class ProgramOptions
    {
        [Option('c', "config-file", Default = "appsettings.json", HelpText = "The path to the configuration file to load with the application.")]
        public string ConfigFile { get; set; }
    }
}
