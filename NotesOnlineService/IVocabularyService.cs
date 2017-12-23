using NoteOnlineCore.ViewModels;
using System.Collections.Generic;

namespace NotesOnlineService
{
    public interface IVocabularyService
    {
        /// <summary>
        /// 儲存單字
        /// </summary>
        BaseReturn SaveVocabulary(string guestID, VocabularyVM model);

        /// <summary>
        /// 取得儲存過(加到最愛)的單字
        /// </summary>
        List<VocabularyVM> GetUserFavoriteWords(string guestID, out BaseReturn baseReturn);

    }
}