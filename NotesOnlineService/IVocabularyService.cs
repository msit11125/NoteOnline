using NoteOnlineCore.ViewModels;
using System.Collections.Generic;

namespace NotesOnlineService
{
    public interface IVocabularyService
    {
        /// <summary>
        /// 搜尋單字
        /// </summary>
        /// <param name="word">單字</param>
        /// <param name="baseUrl">Server網址</param>
        /// <param name="baseReturn">回傳結果</param>
        /// <param name="strategy">策略</param>
        VocabularyVM SearchVocabulary(string word, out BaseReturn baseReturn, SearchWordStrategy strategy);
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