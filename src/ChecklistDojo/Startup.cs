using System.Reflection;
using Autofac;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using ChecklistDojo.Autofac;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Serilog;
using ILogger = Serilog.ILogger;

namespace ChecklistDojo
{
    public class Startup
    {
        private AssemblyName CurrentAssemblyInfo { get; }

        public Startup()
        {
            CurrentAssemblyInfo = typeof(Startup).Assembly.GetName();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            services.AddCors();
            services.AddHealth();
            services.AddMetrics();
            services.AddMetricsTrackingMiddleware();
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

            // This method gets called by the runtime after ConfigureServices is called.
            public void ConfigureContainer(ContainerBuilder builder)
            {
                builder.RegisterModule<DataAccessModule>();
                builder.RegisterModule<LoggingModule>();
                builder.RegisterModule<MetricsModule>();
                builder.RegisterModule<ServicesModule>();
            }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, 
            IHostingEnvironment env,
            ILogger serverLogger,
            IApplicationLifetime appLifetime,
            ILoggerFactory logger)
        {

            logger.AddSerilog(serverLogger);
            app.UseCors(ConfigureCors);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseMetricsAllEndpoints();
            app.UseMetricsAllMiddleware();
            app.UseHealthAllEndpoints();

            app.Use((context, next) =>
            {
                // This makes it so that if a correlation id is provided, it reassigns the automatically generated
                // HttpContext.TraceIdentifier to it, which will then show up in log messages as the RequestId field. 
                // See the DefaultLogTemplate in LoggingConfig.cs
                if (context.Request.Headers.TryGetValue("Correlation-Id", out var correlationId))
                {
                    context.TraceIdentifier = correlationId;
                }

                return next();
            });

            app.UseMvc();

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }

        private static void ConfigureCors(CorsPolicyBuilder policyBuilder)
        {
            policyBuilder.AllowAnyOrigin();
            policyBuilder.AllowAnyHeader();
            policyBuilder.WithMethods("GET", "POST");
        }
    }
}
