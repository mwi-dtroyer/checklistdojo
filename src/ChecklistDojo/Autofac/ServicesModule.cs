using Autofac;
using Microsoft.AspNetCore.Http;

namespace ChecklistDojo.Autofac
{
    public class ServicesModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<HttpContextAccessor>()
                .As<IHttpContextAccessor>()
                .SingleInstance();
        }
    }
}
