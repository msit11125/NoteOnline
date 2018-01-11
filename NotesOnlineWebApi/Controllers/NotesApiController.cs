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
    public class NotesApiController : ApiController
    {
        private readonly INoteService _noteService;

        public NotesApiController(INoteService noteService)
        {
            this._noteService = noteService;
        }

        [AcceptVerbs("GET")]
        public IHttpActionResult GetNotes()
        {
            // 取得用戶資料
            BaseInfo baseReturn;
            string guestID = UserInformationHelper.GetUserGuestID();
            var searchRE = _noteService.GetNotes(guestID, out baseReturn);

            if (baseReturn.returnMsgNo != 1)
                return BadRequest(baseReturn.returnMsg);

            return Ok(searchRE);
        }


        [AcceptVerbs("POST")]
        public IHttpActionResult InsertNote(NoteVM model)
        {
            // 取得用戶資料
            BaseInfo baseReturn;
            string guestID = UserInformationHelper.GetUserGuestID();
            model.GuestID = guestID;
            _noteService.InsertNote(model, out baseReturn);

            if (baseReturn.returnMsgNo != 1)
                return BadRequest(baseReturn.returnMsg);

            return Ok(baseReturn);
        }

    }
}
