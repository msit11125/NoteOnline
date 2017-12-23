﻿using HtmlAgilityPack;
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
            //回傳Model
            VocabularyVM searchRE = new VocabularyVM();

            string searchUrl = "https://tw.voicetube.com/definition/" + word;

            // From Web
            var url = searchUrl;
            var web = new HtmlWeb();
            var doc = web.Load(url);


            var definSingleNode = doc.DocumentNode.SelectSingleNode("//div[@id='definition']");

            if (definSingleNode == null)
            {
                return BadRequest("沒有找到相關的單字");
            }



            //取得跟目錄網址 例如:http://localhost:59674
            var baseUrl = Request.RequestUri.GetLeftPart(UriPartial.Authority);
            foreach (var node in definSingleNode.Descendants())
            {
                if (node.Name == "a")
                {
                    node.Attributes["href"].Value = baseUrl + "/api/VocabularyApi?word=" + node.InnerText;
                }
            }

            // 找到解釋
            List<string> defins = new List<string>();
            var filterHtml = definSingleNode.InnerHtml
                .Replace("<h3>解釋</h3>", "<h3>")
                .Replace("<h3>例句</h3>", "</h3>")
                .Replace("<br>", "")
                .Replace("\n", "|");

            string pattern = "<h3>(.*?)</h3>";
            MatchCollection matches = Regex.Matches(filterHtml, pattern);
            Console.WriteLine("Matches found: {0}", matches.Count);

            if (matches.Count > 0)
                foreach (Match m in matches)
                {
                    // 分割每個解釋
                    defins = m.Groups[1].ToString().Split('|').Select(w => w).ToList();
                    // 空白移除
                    defins.Remove("");
                }


            // 加入標題
            HtmlNode titleNode = HtmlNode.CreateNode($"<h2>{word}</h2>");
            definSingleNode.PrependChild(titleNode);
            string html = definSingleNode.InnerHtml.Replace("\n", ""); // html格式 不需要換行

            // 加到回傳Json內
            searchRE.Word = word;
            searchRE.ChineseDefin = defins;
            searchRE.FullHtml = html;

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
