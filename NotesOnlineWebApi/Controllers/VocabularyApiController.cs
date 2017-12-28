using NoteOnlineCore.ViewModels;
using NotesOnlineService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Text.RegularExpressions;
using System.Threading;
using System.Web;
using System.Web.Http;

namespace NotesOnlineWebApi.Controllers
{
    [Authorize]
    public class VocabularyApiController : ApiController
    {
        private readonly IVocabularyService _vocabularyService;

        public VocabularyApiController(IVocabularyService vocabularyService)
        {
            this._vocabularyService = vocabularyService;
        }

        #region 備註
        // 如果 SearchWord 改用Post 則要使用Model Binding的方式才接的到參數 (原因是因為表單傳過來不是Json格式) 
        // 這裡接到單一參數為JSON 除非POST過來是application/json加[FromBody]可解決，不然只能建立Model
        //public class Form
        //{
        //    public string word { get; set; }
        //}
        #endregion

        /// <summary>
        /// 從VoiceTube搜尋單字
        /// </summary>
        /// <param name="word">單字</param>
        [AcceptVerbs("GET")]
        [AllowAnonymous]
        public IHttpActionResult SearchWord(string word)
        {
            // 根目錄網址 + 回傳本Api的Url
            var thisUrl = HttpContext.Current.Request.Url.GetLeftPart(UriPartial.Authority) 
                + HttpContext.Current.Request.ApplicationPath
                + "api/VocabularyApi?word=" ;

            BaseReturn baseRE = new BaseReturn();
            var searchRE = _vocabularyService.SearchVocabulary(word, out baseRE, new SearchWordStrategy_VoiceTube(thisUrl));

            if(baseRE.returnMsgNo != 1)
                return BadRequest(baseRE.returnMsg);

            return Ok(searchRE);
        }


        /// <summary>
        /// 把單字加到最愛
        /// </summary>
        [AcceptVerbs("POST")]
        public IHttpActionResult AddToFavorite(VocabularyVM model)
        {
            //Get the current claims principal 取得資訊
            var identity = (ClaimsPrincipal)Thread.CurrentPrincipal;

            // Get the claims values 取得ID
            string guestID = identity.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier)
                               .Select(c => c.Value).SingleOrDefault();


            BaseReturn result =_vocabularyService.SaveVocabulary(guestID, model);

            return Ok(result);
        }


        /// <summary>
        /// 取得蒐藏的單字
        /// </summary>
        [AcceptVerbs("GET")]
        [Route("api/vocabularyapi/getfavorite")]
        public IHttpActionResult GetFavorite()
        {
            //Get the current claims principal 取得資訊
            var identity = (ClaimsPrincipal)Thread.CurrentPrincipal;

            // Get the claims values 取得ID
            string guestID = identity.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier)
                               .Select(c => c.Value).SingleOrDefault();



            BaseReturn baseReturn = new BaseReturn();
            var result = _vocabularyService.GetUserFavoriteWords(guestID,out baseReturn);
            if(baseReturn.returnMsgNo != 1)
            {
                return BadRequest(baseReturn.returnMsg);
            }

            return Ok(result);
        }

    }




}
