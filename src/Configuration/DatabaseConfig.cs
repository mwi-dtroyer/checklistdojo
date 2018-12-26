namespace checklistdojo.Configuration
{
    public class DatabaseConfig
    {
        public DatabaseConnectionStringsConfig ConnectionStrings { get; set; } =
            new DatabaseConnectionStringsConfig();
    }

    public class DatabaseConnectionStringsConfig
    {
        public string Primary { get; set; }

        public string Replica { get; set; }
    }
}
