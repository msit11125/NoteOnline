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
        VocabularyInfo SearchVocabulary(string word, out BaseInfo baseReturn, SearchWordStrategy strategy);
        /// <summary>
        /// 儲存單字
        /// </summary>
        BaseInfo SaveVocabulary(string guestID, VocabularyInfo model);

        /// <summary>
        /// 取得儲存過(加到最愛)的單字
        /// </summary>
        List<VocabularyInfo> GetUserFavoriteWords(string guestID, string searchWord, int currentPageNumber, int pageSize, string sortDirection, string sortExpression, out int totalRows, out BaseInfo baseReturn);

        /// <summary>
        /// 移除單字
        /// </summary>
        /// <param name="wordSn">單字Sn</param>
        /// <returns></returns>
        void RemoveFavorite(string guestID, int wordSn, out BaseInfo baseReturn);
    }
}