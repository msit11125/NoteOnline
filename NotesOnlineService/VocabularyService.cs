using AutoMapper;
using NoteOnlineCore.Models;
using NoteOnlineCore.ViewModels;
using NotesOnlineRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Linq.Dynamic;

namespace NotesOnlineService
{
    public class VocabularyService : IVocabularyService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public VocabularyService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this._unitOfWork = unitOfWork;
            this._mapper = mapper;
        }

        /// <summary>
        /// 搜尋單字
        /// </summary>
        /// <param name="word">單字</param>
        /// <param name="baseUrl">Server網址</param>
        /// <param name="baseReturn">回傳結果</param>
        /// <param name="strategy">策略</param>
        /// <returns></returns>
        public VocabularyInfo SearchVocabulary(string word, out BaseInfo baseReturn, SearchWordStrategy strategy)
        {

            baseReturn = new BaseInfo();

            VocabularyInfo searchRE = null;
            try
            {
                searchRE = strategy.Search(word);
            }
            catch (Exception)
            {
                baseReturn.returnMsgNo = -2;
                baseReturn.returnMsg = "查詢發生例外錯誤";
            }

            if (searchRE == null)
            {
                baseReturn.returnMsgNo = -1;
                baseReturn.returnMsg = "沒有找到相關的單字";
            }
            else
            {
                baseReturn.returnMsgNo = 1;
                baseReturn.returnMsg = "搜尋成功!";
            }

            return searchRE;
        }

        /// <summary>
        /// 儲存單字
        /// </summary>
        public BaseInfo SaveVocabulary(string guestID, VocabularyInfo model)
        {
            BaseInfo saveReturn = new BaseInfo();
            var vocabularyModel = _mapper.Map<VocabularyInfo, VocabularyDictionarys>(model);
            try
            {

                // 先看用戶是否儲存過了
                // 用戶單字collection
                var vocabularyCollect = _unitOfWork.UsersRepository
                    .Get(filter: u => u.GuestID == guestID, includeProperties: "VocabularyDictionarys")
                    .FirstOrDefault()
                    .VocabularyDictionarys;

                if (vocabularyCollect.Any(v => v.Vocabulary.ToLower() == model.Word.ToLower())) // 檢查是否已儲存過
                {
                    saveReturn.returnMsgNo = -2;
                    saveReturn.returnMsg = "單字已儲存過。";
                    return saveReturn;
                }

                //再看字典庫裡有沒有儲存過此單字
                var vocabularyOld = _unitOfWork.VocabularyDictionarysRepository
                    .Get(filter: v => v.Vocabulary == model.Word).FirstOrDefault();
                if (vocabularyOld == null) //沒有則首次加入
                {
                    _unitOfWork.VocabularyDictionarysRepository.Insert(vocabularyModel);
                }
                else
                {
                    vocabularyModel = vocabularyOld; // 取代為字典庫內的
                }
                // 用戶增加儲存的單字
                vocabularyCollect.Add(vocabularyModel);

                _unitOfWork.SaveChanges();
            }
            catch (Exception ex)
            {
                saveReturn.returnMsgNo = -1;
                saveReturn.returnMsg = "儲存單字時發生例外錯誤。";
                return saveReturn;
            }

            saveReturn.returnMsgNo = 1;
            saveReturn.returnMsg = "單字儲存成功!";
            return saveReturn;

        }

        /// <summary>
        /// 取得儲存過(加到最愛)的單字
        /// </summary>
        public List<VocabularyInfo> GetUserFavoriteWords(string guestID, string searchWord, int currentPageNumber, int pageSize,
            string sortDirection, string sortExpression, out int totalRows, out BaseInfo baseReturn)
        {
            baseReturn = new BaseInfo(); // 回傳訊息Model

            List<VocabularyInfo> vocabularyVMList = null;
            try
            {
                var vocabularyCollection = _unitOfWork.UsersRepository
                    .Get(filter: u => u.GuestID == guestID, includeProperties: "VocabularyDictionarys")
                    .FirstOrDefault()
                    .VocabularyDictionarys
                    .AsQueryable();

                // filters
                if (sortExpression.Length == 0) sortExpression = "Vocabulary";
                if (sortDirection.Length == 0) sortDirection = "ASC";
                sortExpression = sortExpression + " " + sortDirection;

                if (vocabularyCollection != null && searchWord.Trim().Length > 0)
                {
                    vocabularyCollection = vocabularyCollection.Where(c => c.Vocabulary.StartsWith(searchWord));
                }
                totalRows = vocabularyCollection.Count();

                // Dynamic Linq 擴充
                List<VocabularyDictionarys> collection = vocabularyCollection
                    .OrderBy(sortExpression)
                    .Skip((currentPageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .ToList();

                vocabularyVMList = _mapper
                    .Map<IEnumerable<VocabularyDictionarys>, IEnumerable<VocabularyInfo>>(collection)
                    .ToList();
            }
            catch (Exception ex)
            {
                baseReturn.returnMsgNo = -1;
                baseReturn.returnMsg = "取得我的單字庫發生例外錯誤。";
                totalRows = 0;
                return null;
            }

            baseReturn.returnMsgNo = 1;
            baseReturn.returnMsg = "取得我的單字庫成功!";

            return vocabularyVMList;
        }


        /// <summary>
        /// 移除單字
        /// </summary>
        /// <param name="wordSn">單字Sn</param>
        /// <returns></returns>
        public void RemoveFavorite(string guestID, int wordSn, out BaseInfo baseReturn)
        {
            baseReturn = new BaseInfo();
            try
            {
                // 1. Find VocabularyDictionary
                var vocabulary = _unitOfWork.VocabularyDictionarysRepository.GetByID(wordSn);

                // 2. Find User Collecions
                var vocabularyCollection = _unitOfWork.UsersRepository
                    .Get(filter: u => u.GuestID == guestID, includeProperties: "VocabularyDictionarys")
                    .FirstOrDefault()
                    .VocabularyDictionarys;

                // 3. Remove it From User Collecions
                vocabularyCollection.Remove(vocabulary);

                _unitOfWork.SaveChanges();
            }
            catch (Exception ex)
            {
                baseReturn.returnMsgNo = -1;
                baseReturn.returnMsg = "刪除單字時發生例外。";
                return;
            }

            baseReturn.returnMsgNo = 1;
            baseReturn.returnMsg = "刪除單字成功!";

        }
    }
}
