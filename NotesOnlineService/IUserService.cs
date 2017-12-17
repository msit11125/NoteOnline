using System.Collections.Generic;
using NoteOnlineCore.Models;
using NoteOnlineCore.ViewModels;

namespace NotesOnlineService
{
    public interface IUserService
    {
        IEnumerable<Users> GetAllUser();
        /// <summary>
        /// 取得用戶資訊By GuestID
        /// </summary>
        /// <param name="guestID"></param>
        /// <returns></returns>
        UserVM GetUserByID(string guestID);
        /// <summary>
        /// 用戶登入
        /// </summary>
        /// <param name="account">帳號</param>
        /// <param name="password">密碼</param>
        /// <returns>UserVM</returns>
        UserVM FindUser(string account, string password);
        /// <summary>
        /// 用戶註冊
        /// </summary>
        /// <param name="userVM">用戶資料</param>
        /// <returns>UserVM</returns>
        UserVM UserRegister(UserVM userVM);
    }
}