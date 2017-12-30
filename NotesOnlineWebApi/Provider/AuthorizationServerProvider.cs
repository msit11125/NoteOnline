using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json;
using NoteOnlineCore.Models;
using NotesOnlineRepository;
using NotesOnlineService;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading;
using System.Threading.Tasks;
using System.Web;

namespace NotesOnlineWebApi.Provider
{
    public class AuthorizationServerProvider : OAuthAuthorizationServerProvider
    {
        public IUserService _userService { get; }


        public AuthorizationServerProvider(IUserService userService)
        {
            _userService = userService;

            // 手動注入方式
            // var mapper = MappingProfile.InitializeAutoMapper().CreateMapper();
            // var context = new NoteOnlineContext();
            // _userService = new UserService(new UnitOfWork(context), mapper);
        }

        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }


        // (Startup中可設定Route)
        // 自訂驗證 ClaimsIdentity (驗證成功回傳Token)
        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            //允許CORS
            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });
            try
            {
                //設定自己的DB驗證
                var userVM = _userService.FindUser(context.UserName, context.Password);
                if (userVM.returnMsgNo == 1)
                {
                    var identity = new ClaimsIdentity(context.Options.AuthenticationType);
                    
                    identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, userVM.GuestID));
                    identity.AddClaim(new Claim(ClaimTypes.Name, userVM.Name));
                    identity.AddClaim(new Claim(ClaimTypes.Email, userVM.Email));

                    //角色權限
                    var rolesNamesUser = new List<string>();

                    if (userVM.RolesIDs != null)
                    {
                        rolesNamesUser = userVM.RolesNames?.ToList();
                    }

                    IPrincipal principal = new GenericPrincipal(identity, rolesNamesUser.ToArray());
                        
                    Thread.CurrentPrincipal = principal;

                    context.Validated(identity);


                }
                else
                {
                    //自訂錯誤回傳
                    context.SetError("invalid_grant", "帳號或密碼錯誤!");
                }

            }
            catch (Exception ex)
            {
                context.SetError("invalid_grant", ex.Message);
            }
        }

        //回傳Token
        public override Task TokenEndpointResponse(OAuthTokenEndpointResponseContext context)
        {
            // TODO 更新DB Token...
            string token = context.AccessToken;

            return base.TokenEndpointResponse(context);
        }
    }
}