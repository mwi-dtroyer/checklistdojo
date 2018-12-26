using Autofac;
using CheckListDojo.Configuration;
using CheckListDojo.Data.Repositories;
using Microsoft.Extensions.Options;
using Mwi.Data.Dapper;
using Mwi.Data.Dapper.MySql;

namespace CheckListDojo.Autofac
{
    public class DataAccessModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.Register(ConfigureDatabaseAccess)
                .As<IDatabaseAccess>()
                .SingleInstance();

            builder.RegisterType<ScaffoldingRepository>()
                .As<ScaffoldingRepository>()
                .SingleInstance();
        }

        private static MySqlDatabaseAccess ConfigureDatabaseAccess(IComponentContext context)
        {
            var config = context.Resolve<IOptions<DatabaseConfig>>().Value;

            return new MySqlDatabaseAccess(
                config.ConnectionStrings.Primary,
                config.ConnectionStrings.Replica);
        }
    }
}
