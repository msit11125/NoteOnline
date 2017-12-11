using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoteOnlineCore.ViewModels
{
    public class BaseReturn
    {
        /// <summary>
        /// 1: 登入成功
        /// </summary>
        public int returnMsgNo { get; set; } 
        public string returnMsg { get; set; }
    }
}
