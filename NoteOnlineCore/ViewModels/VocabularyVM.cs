using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoteOnlineCore.ViewModels
{

    public class VocabularyVM
    {
        [StringLength(30, ErrorMessage = "Word 超過長度")]
        public string Word { get; set; }

        public string FullHtml { get; set; } // 翻譯全文

        public List<string> ChineseDefin { get; set; } // 中文解釋

    }
}
