using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoteOnlineCore.ViewModels
{

    public class VocabularyVM
    {
        public string Word { get; set; }
        public string FullHtml { get; set; } // 翻譯全文
        public List<string> ChineseDefin { get; set; } // 中文解釋

    }
}
