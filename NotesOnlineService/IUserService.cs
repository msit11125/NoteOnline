using System.Collections.Generic;
using NoteOnlineCore.Models;
using NoteOnlineCore.ViewModels;

namespace NotesOnlineService
{
    public interface IUserService
    {
        IEnumerable<Users> GetAllUser();
        UserVM GetUserByID(string guestID);
        UserVM FindUser(string account, string password);
        UserVM UserRegister(UserVM userVM);
    }
}