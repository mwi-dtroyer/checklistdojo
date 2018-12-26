using Autofac;
using ChecklistDojo.Configuration;
using ChecklistDojo.Data.Repositories;
using Microsoft.Extensions.Options;

namespace ChecklistDojo.Autofac
{
    public class DataAccessModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            //TO DO: Replace with actual working database access code
            //builder.Register(ConfigureDatabaseAccess)
            //    .As<IDatabaseAccess>()
            //    .SingleInstance();

            builder.RegisterType<ScaffoldingRepository>()
                .As<ScaffoldingRepository>()
                .SingleInstance();
        }

        //private static MySqlDatabaseAccess ConfigureDatabaseAccess(IComponentContext context)
        //{
        //    var config = context.Resolve<IOptions<DatabaseConfig>>().Value;

        //    return new MySqlDatabaseAccess(
        //        config.ConnectionStrings.Primary,
        //        config.ConnectionStrings.Replica);
        //}
    }
}
