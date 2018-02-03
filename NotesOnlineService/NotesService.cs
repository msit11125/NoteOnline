using AutoMapper;
using HtmlAgilityPack;
using NoteOnlineCore.Models;
using NoteOnlineCore.ViewModels;
using NotesOnlineRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace NotesOnlineService
{
    public class NotesService : INoteService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public NotesService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this._unitOfWork = unitOfWork;
            this._mapper = mapper;
        }


        public List<NoteVM> GetNotes(string guestID, out BaseInfo baseReturn)
        {
            baseReturn = new BaseInfo();
            IEnumerable<Notes> notes;
            List<NoteVM> noteVMs;
            try
            {
                notes = _unitOfWork.NotesRepository
                    .Get(filter: n => n.GuestID == guestID, includeProperties: "NoteDetails,Users,Types")
                    .OrderByDescending(n => n.CreateDate);

                noteVMs = _mapper.Map<IEnumerable<Notes>, IEnumerable<NoteVM>>(notes).ToList();
            }
            catch (Exception ex)
            {
                baseReturn.returnMsgNo = -1;
                baseReturn.returnMsg = "查詢失敗。";
                return null;
            }

            // 替換成 GetImage Controller Url
            // Combine Uri
            string baseUrl = HttpContext.Current.Request.Url.Scheme + "://" +
                HttpContext.Current.Request.Url.Authority +
                HttpContext.Current.Request.ApplicationPath.TrimEnd('/');
            var getImageUrl = baseUrl + "/image/get?imageName=";

            noteVMs.ForEach(n => n.NotePhoto = (string.IsNullOrEmpty(n.NotePhoto)) ? "" : getImageUrl + n.NotePhoto);

            // 讀取些許文字
            noteVMs.ForEach(n => n.Details = SubStringFewWords(n.Details, 100));


            baseReturn.returnMsgNo = 1;
            baseReturn.returnMsg = "查詢成功!";
            return noteVMs;
        }

        public NoteVM GetNotesByID(string NoteID, out BaseInfo baseReturn)
        {
            baseReturn = new BaseInfo();
            Notes note;
            NoteVM noteVM;
            try
            {
                note = _unitOfWork.NotesRepository.GetByID(NoteID);
                // 替換成 GetImage Controller Url
                // Combine Uri
                string baseUrl = HttpContext.Current.Request.Url.Scheme + "://" +
                    HttpContext.Current.Request.Url.Authority +
                    HttpContext.Current.Request.ApplicationPath.TrimEnd('/');
                var getImageUrl = baseUrl + "/image/get?imageName=";
                note.NotePhoto = (string.IsNullOrEmpty(note.NotePhoto)) ? "" : getImageUrl + note.NotePhoto;

                noteVM = _mapper.Map<Notes, NoteVM>(note);
                noteVM = _mapper.Map<NoteDetails, NoteVM>(note.NoteDetails, noteVM);
            }
            catch (Exception)
            {
                baseReturn.returnMsgNo = -1;
                baseReturn.returnMsg = "查詢失敗。";
                return null;
            }

            baseReturn.returnMsgNo = 1;
            baseReturn.returnMsg = "查詢成功!";
            return noteVM;
        }

        //檢查照片是否已存在
        public bool CheckPhotoIsExist(string photoName)
        {
            if (!string.IsNullOrEmpty(photoName))
            {
                var anyNotePhoto = _unitOfWork.NotesRepository
                .Get(filter: n => n.NotePhoto == photoName).Any();
                if (!anyNotePhoto)
                    return true;
            }
            return false;
        }

        public void InsertNote(NoteVM noteVM, out BaseInfo baseReturn)
        {
            baseReturn = new BaseInfo();

            var newNote = _mapper.Map<NoteVM, Notes>(noteVM);

            newNote.NoteDetails = _mapper.Map<NoteVM, NoteDetails>(noteVM);
            newNote.CreateDate = newNote.LastUpdateDate = DateTime.Now;
            newNote.NoteID = newNote.NoteDetails.NoteID
                = Guid.NewGuid().ToString("D").ToUpper() + "_" + DateTime.Now.ToString("yyyyMMdd");
            try
            {
                if(this.CheckPhotoIsExist(noteVM.NotePhoto))
                {
                    baseReturn.returnMsgNo = -2;
                    baseReturn.returnMsg = "照片新增重複。";
                    return;
                }
                _unitOfWork.NotesRepository.Insert(newNote);
                _unitOfWork.SaveChanges();
            }
            catch (Exception ex)
            {
                baseReturn.returnMsgNo = -1;
                baseReturn.returnMsg = "新增失敗。";
                return;
            }

            baseReturn.returnMsgNo = 1;
            baseReturn.returnMsg = "新增成功!";
            return;
        }

        public void UpdateNote(NoteVM noteVM, out BaseInfo baseReturn)
        {
            baseReturn = new BaseInfo();

            try
            {
                string baseUrl = HttpContext.Current.Request.Url.Scheme + "://" +
                                HttpContext.Current.Request.Url.Authority +
                                HttpContext.Current.Request.ApplicationPath.TrimEnd('/');
                var getImageUrl = baseUrl + "/image/get?imageName=";

                noteVM.NotePhoto = RemoveString(noteVM.NotePhoto, getImageUrl);
                
                var oldNote = _unitOfWork.NotesRepository.GetByID(noteVM.NoteID);

                var newNote = _mapper.Map<NoteVM, Notes>(noteVM);
                newNote.NoteDetails = _mapper.Map<NoteVM, NoteDetails>(noteVM, oldNote.NoteDetails);
                newNote.LastUpdateDate = DateTime.Now;

                oldNote = _mapper.Map(newNote, oldNote); // 更新 ( Mapping Self )

                _unitOfWork.NotesRepository.Update(oldNote);

                _unitOfWork.SaveChanges();
            }
            catch (Exception ex)
            {
                baseReturn.returnMsgNo = -1;
                baseReturn.returnMsg = "修改失敗。";
                return;
            }

            baseReturn.returnMsgNo = 1;
            baseReturn.returnMsg = "修改成功!";
            return;
        }

        public void DeleteNote(string NoteID, out BaseInfo baseReturn)
        {
            baseReturn = new BaseInfo();
            try
            {
                _unitOfWork.NotesRepository.Delete(NoteID);
                _unitOfWork.SaveChanges();
            }
            catch (Exception)
            {
                baseReturn.returnMsgNo = -1;
                baseReturn.returnMsg = "刪除失敗。";
                return;
            }

            baseReturn.returnMsgNo = 1;
            baseReturn.returnMsg = "刪除成功!";
            return;
        }



        private string SubStringFewWords(string content, int lenth)
        {
            var doc = new HtmlDocument();
            doc.LoadHtml(content);
            var innerText = doc.DocumentNode.InnerText
                .Replace("&nbsp;", "")
                .Replace("\r", "")
                .Replace("\n", "");

            if (innerText.Length <= lenth)
            {
                return innerText;
            }

            return innerText.Substring(0, lenth) + "...";
        }


        private string RemoveString(string source, string removeStr)
        {
            return source.Replace(removeStr, "");
        }
    }
}
