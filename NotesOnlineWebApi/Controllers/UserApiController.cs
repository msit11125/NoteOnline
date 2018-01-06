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
            // 取得用戶資料
            string guestID = UserInformationHelper.GetUserGuestID();

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
