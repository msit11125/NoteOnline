using NoteOnlineCore.Models;
using NoteOnlineCore.ViewModels;
using NotesOnlineRepository;
using NotesOnlineService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Threading;
using System.Web.Http;

namespace NotesOnlineWebApi.Controllers
{
    public class UserApiController : ApiController
    {
        private readonly IUserService userService;

        public UserApiController(IUserService userService)
        {
            this.userService = userService;
        }

        [AcceptVerbs("Get")]
        [Authorize(Roles="一般會員,管理者")]
        public IHttpActionResult GetUserByID()
        {
            //Get the current claims principal 取得資訊
            var identity = (ClaimsPrincipal)Thread.CurrentPrincipal;

            // Get the claims values 取得ID
            string guestID = identity.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier)
                               .Select(c => c.Value).SingleOrDefault();

            var userlist = userService.GetUserByID(guestID);
            return Ok(userlist);
        }

        [AcceptVerbs("POST")]
        public IHttpActionResult UserRegister(UserVM userVM)
        {
            var insertRE = userService.UserRegister(userVM);
            return Ok(insertRE);
        }


    }
}
