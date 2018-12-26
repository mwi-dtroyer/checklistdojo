using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CommandLine;

namespace CheckListDojo
{
    public class ProgramOptions
    {
        [Option('c', "config-file", Default = "appsettings.json", HelpText = "The path to the configuration file to load with the application.")]
        public string ConfigFile { get; set; }
    }
}
