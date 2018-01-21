using NoteOnlineCore.ViewModels;
using NotesOnlineService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
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
            BaseInfo baseReturn;
            // 取得用戶資料
            string guestID = UserInformationHelper.GetUserGuestID();

            var searchRE = _noteService.GetNotes(guestID, out baseReturn);


            if (baseReturn.returnMsgNo != 1)
                return BadRequest(baseReturn.returnMsg);

            return Ok(searchRE);
        }

        [AcceptVerbs("GET")]
        public IHttpActionResult GetNotesById(string noteId)
        {
            BaseInfo baseReturn;

            var searchRE = _noteService.GetNotesByID(noteId, out baseReturn);

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

        [AcceptVerbs("DELETE")]
        public IHttpActionResult DeleteNote(string noteId)
        {
            BaseInfo baseReturn;

            _noteService.DeleteNote(noteId, out baseReturn);

            return Ok(baseReturn);
        }



        [HttpPost]
        [Route("api/uploadfile")]
        public HttpResponseMessage UploadImageFile()
        {
            HttpResponseMessage response = new HttpResponseMessage();
            var httpRequest = HttpContext.Current.Request;
            string guestID = UserInformationHelper.GetUserGuestID();

            string newFileName="";
            //判斷是否有上傳的檔案
            if (httpRequest.Files.Count > 0)
            {
                foreach (string file in httpRequest.Files)
                {
                    var postedFile = httpRequest.Files[file];
                    newFileName = DateTime.Now.ToString("yyyyMMddHHmmss_") + postedFile.FileName;

                    var filePath = HttpContext.Current.Server.MapPath(
                        "~/App_Data/images/" + newFileName);
                    postedFile.SaveAs(filePath);
                }
            }
            response.Content = new StringContent(newFileName);
            return response;
        }
    }
}
