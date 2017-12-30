using Microsoft.Owin.Security.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Threading.Tasks;

namespace NotesOnlineWebApi.Provider
{
    public class ApplicationRefreshTokenProvider : AuthenticationTokenProvider
    {
   
        public override void Create(AuthenticationTokenCreateContext context)
        {
            // Expiration time in seconds
            int expire = 10 * 24 * 60 * 60; // 10 days
            context.Ticket.Properties.ExpiresUtc = new DateTimeOffset(DateTime.Now.AddSeconds(expire));
            // 產生refresh token
            var guid = context.SerializeTicket();
            context.SetToken(guid);

            // TODO 更新DB Token...
        }

        public override void Receive(AuthenticationTokenReceiveContext context)
        {
            //允許CORS
            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });

            context.DeserializeTicket(context.Token);
        }
    }
}