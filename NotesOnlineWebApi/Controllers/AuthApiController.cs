using NoteOnlineCore.ViewModels;
using NotesOnlineService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace NotesOnlineWebApi.Controllers
{
    [Authorize]
    public class AuthApiController : ApiController
    {
        private readonly IUserService userService;

        public AuthApiController(IUserService userService)
        {
            this.userService = userService;
        }

        public IHttpActionResult FindUser(LoginVM input)
        {
            var loginRE = userService.FindUser(input.Account, input.Password);
            return Ok(loginRE);
        }


       
    }

    // 備註: Owin 中沒有SignOut登出，只能等過期時間，由client端移除token
    // var AuthenticationManager = Request.GetOwinContext().Authentication;
    // AuthenticationManager.SignOut();
}
