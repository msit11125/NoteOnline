using Microsoft.Owin;
using Microsoft.Owin.Security.OAuth;
using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using NotesOnlineWebApi.Provider;
using Autofac;
using Microsoft.Owin.Security.Infrastructure;

[assembly: OwinStartup(typeof(NotesOnlineWebApi.Startup))]
namespace NotesOnlineWebApi
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var config = new HttpConfiguration();
            //other configurations
            var container = AutofacConfig.Initialize();

            ConfigureOAuth(app, container);
            //Cors 允許
            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);
            app.UseWebApi(config);
        }

        public void ConfigureOAuth(IAppBuilder app,IContainer container)
        {
            var oAuthServerOptions = new OAuthAuthorizationServerOptions()
            {
                AllowInsecureHttp = true,
                TokenEndpointPath = new PathString("/api/security/token"),
                AccessTokenExpireTimeSpan = TimeSpan.FromHours(2), // 設定過期時間
                Provider = container.Resolve<IOAuthAuthorizationServerProvider>(),
                RefreshTokenProvider = container.Resolve<IAuthenticationTokenProvider>()
            };

            app.UseOAuthAuthorizationServer(oAuthServerOptions);
            app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());
        }
    }
}