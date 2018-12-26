using Autofac;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace CheckListDojo.Autofac
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
