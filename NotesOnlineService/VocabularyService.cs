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
        /// 儲存單字
        /// </summary>
        public BaseReturn SaveVocabulary(string guestID, VocabularyVM model)
        {
            BaseReturn saveReturn = new BaseReturn();
            var vocabularyModel = _mapper.Map<VocabularyVM, VocabularyDictionarys>(model);
            try
            {
                //先看字典庫裡有沒有儲存過此單字
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
                // 增加用戶儲存的單字
                _unitOfWork.UsersRepository
                    .Get(filter: u => u.GuestID == guestID,includeProperties: "VocabularyDictionarys")
                    .FirstOrDefault()
                    .VocabularyDictionarys
                    .Add(vocabularyModel);


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
