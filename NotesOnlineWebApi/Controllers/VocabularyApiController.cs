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
            BaseInfo baseReturn;
            var searchRE = _vocabularyService.SearchVocabulary(word, out baseReturn, new SearchWordStrategy_VoiceTube());

            if (baseReturn.returnMsgNo != 1)
                return BadRequest(baseReturn.returnMsg);

            return Ok(searchRE);
        }


        /// <summary>
        /// 把單字加到最愛
        /// </summary>
        [AcceptVerbs("POST")]
        public IHttpActionResult AddToFavorite(VocabularyInfo model)
        {
            // 取得用戶資料
            string guestID = UserInformationHelper.GetUserGuestID();

            BaseInfo baseReturn;
           _vocabularyService.SaveVocabulary(guestID, model, out baseReturn);

            return Ok(baseReturn);
        }


        /// <summary>
        /// 取得蒐藏的單字
        /// </summary>
        [AcceptVerbs("POST")]
        [Route("api/vocabularyapi/getfavorite")]
        public IHttpActionResult GetFavorite(VocabularyVM model)
        {
            // 取得用戶資料
            string guestID = UserInformationHelper.GetUserGuestID();

            string searchWord = model.SearchWord;
            int currentPageNumber = model.CurrentPageNumber;
            int pageSize = model.PageSize;
            string sortExpression = model.SortExpression;
            string sortDirection = model.SortDirection;
            int totalRows = 0;

            BaseInfo baseReturn;
            List<VocabularyInfo> vocabularyList = _vocabularyService.GetUserFavoriteWords(guestID, searchWord, currentPageNumber,
                pageSize, sortExpression, sortDirection, out totalRows, out baseReturn);

            model.returnMsgNo = baseReturn.returnMsgNo;
            model.returnMsg = baseReturn.returnMsg;
            model.TotalRows = totalRows;
            model.TotalPages = Utilities.CalculateTotalPages(totalRows, pageSize);
            model.VocabularyList = vocabularyList;

            if (baseReturn.returnMsgNo != 1)
                return BadRequest(baseReturn.returnMsg);

            return Ok(model);
        }


        [AcceptVerbs("Delete")]
        [Route("api/vocabularyapi/{wordSn}")]
        public IHttpActionResult RemoveFavorite(int wordSn)
        {
            if (wordSn == 0)
                return BadRequest("移除的單字Sn不可為0");

            // 取得用戶資料
            string guestID = UserInformationHelper.GetUserGuestID();

            BaseInfo baseReturn = new BaseInfo();

            _vocabularyService.RemoveFavorite(guestID, wordSn, out baseReturn);

            if (baseReturn.returnMsgNo != 1)
                return BadRequest(baseReturn.returnMsg);

            return Ok(
                new
                {
                    returnMsgNo = 1,
                    returnMsg = baseReturn.returnMsg
                });
        }

    }




}
