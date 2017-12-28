using AutoMapper;
using NoteOnlineCore.Models;
using NoteOnlineCore.ViewModels;
using NotesOnlineRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
        public VocabularyVM SearchVocabulary(string word, out BaseReturn baseReturn, SearchWordStrategy strategy)
        {

            baseReturn = new BaseReturn();

            VocabularyVM searchRE = null;
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
        public BaseReturn SaveVocabulary(string guestID, VocabularyVM model)
        {
            BaseReturn saveReturn = new BaseReturn();
            var vocabularyModel = _mapper.Map<VocabularyVM, VocabularyDictionarys>(model);
            try
            {

                // 先看用戶是否儲存過了
                // 用戶單字collection
                var vocabularyCollect = _unitOfWork.UsersRepository
                    .Get(filter: u => u.GuestID == guestID, includeProperties: "VocabularyDictionarys")
                    .FirstOrDefault()
                    .VocabularyDictionarys;

                if (vocabularyCollect.Any(v => v.Vocabulary == model.Word)) // 檢查是否已儲存過
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
        public List<VocabularyVM> GetUserFavoriteWords(string guestID,out BaseReturn baseReturn)
        {
            baseReturn = new BaseReturn(); // 回傳訊息Model

            List<VocabularyVM> vocabularyVMList = new List<VocabularyVM>();
            try
            {
                var vocabularyCollection = _unitOfWork.UsersRepository
                    .Get(filter: u => u.GuestID == guestID, includeProperties: "VocabularyDictionarys")
                    .FirstOrDefault()
                    .VocabularyDictionarys;

                vocabularyVMList = _mapper
                    .Map<IEnumerable<VocabularyDictionarys>, IEnumerable<VocabularyVM>>(vocabularyCollection)
                    .ToList();

            }
            catch (Exception ex)
            {
                baseReturn.returnMsgNo = -1;
                baseReturn.returnMsg = "取得我的單字庫發生例外錯誤。";

            }
            baseReturn.returnMsgNo = 1;
            baseReturn.returnMsg = "取得我的單字庫成功";

            return vocabularyVMList;
        }
    }
}
