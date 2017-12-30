using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoteOnlineCore.ViewModels
{
    public class BaseInfo
    {
        /// <summary>
        /// 1: 成功
        /// </summary>
        public int returnMsgNo { get; set; } 
        public string returnMsg { get; set; }

        public int TotalPages { get; set; }
        public int TotalRows { get; set; }
        public int PageSize { get; set; }
        public string SortExpression { get; set; } // 排序欄位
        public string SortDirection { get; set; }  // ASC | DESC
        public int CurrentPageNumber { get; set; } // 目前頁數


        public BaseInfo()
        {
            TotalPages = 0;
            TotalPages = 0;
            PageSize = 0;
            SortExpression = "";
            SortDirection = "";
        }
    }
}
