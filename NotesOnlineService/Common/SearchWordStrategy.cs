using HtmlAgilityPack;
using NoteOnlineCore.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;

namespace NotesOnlineService
{
    public abstract class SearchWordStrategy
    {
        public abstract VocabularyInfo Search(string word);
    }

    /// <summary>
    /// 使用VoiceTube作為爬蟲對象
    /// </summary>
    public class SearchWordStrategy_VoiceTube : SearchWordStrategy
    {
        static readonly string searchUrl = "https://tw.voicetube.com/definition/";

        string _baseUrl;


        public SearchWordStrategy_VoiceTube()
        {
            // 根目錄網址 + 回傳本Api的Url
            _baseUrl = HttpContext.Current.Request.Url.GetLeftPart(UriPartial.Authority)
                       + HttpContext.Current.Request.ApplicationPath
                       + "api/VocabularyApi?word=";
        }

        public override VocabularyInfo Search(string word)
        {
            //回傳Model
            VocabularyInfo searchRE = new VocabularyInfo();

            // From Web
            var url = searchUrl + word;
            var web = new HtmlWeb();
            var doc = web.Load(url);

            var definSingleNode = doc.DocumentNode.SelectSingleNode("//div[@id='definition']");

            if (definSingleNode == null)
            {
                return null;
            }
            foreach (var node in definSingleNode.Descendants())
                if (node.Name == "a")  //替換為data-link
                {
                    node.SetAttributeValue("data-link", _baseUrl + node.InnerHtml);
                    node.Attributes["href"].Value = "javascript:void(0)"; 
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

            return searchRE;
        }
    }
}
