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
            try
            {
                notes = _unitOfWork.NotesRepository
                    .Get(filter: n => n.GuestID == guestID, includeProperties: "NoteDetails");
            }
            catch (Exception)
            {
                baseReturn.returnMsgNo = -1;
                baseReturn.returnMsg = "查詢失敗。";
                return null;
            }
            var noteVMs = _mapper.Map<IEnumerable<Notes>, IEnumerable<NoteVM>>(notes);

            baseReturn.returnMsgNo = 1;
            baseReturn.returnMsg = "查詢成功!";

            return noteVMs.ToList();
        }

        public NoteVM GetNotesByID(string NoteID, out BaseInfo baseReturn)
        {
            baseReturn = new BaseInfo();
            Notes note;
            try
            {
                note = _unitOfWork.NotesRepository.GetByID(NoteID);
            }
            catch (Exception)
            {
                baseReturn.returnMsgNo = -1;
                baseReturn.returnMsg = "查詢失敗。";
                return null;
            }

            NoteVM noteVM = _mapper.Map<Notes, NoteVM>(note);
            noteVM = _mapper.Map<NoteDetails, NoteVM>(note.NoteDetails, noteVM);

            baseReturn.returnMsgNo = 1;
            baseReturn.returnMsg = "查詢成功!";
            return noteVM;
        }

        public void InsertNote(NoteVM noteVM, out BaseInfo baseReturn)
        {
            baseReturn = new BaseInfo();

            var newNote = _mapper.Map<NoteVM, Notes>(noteVM);
            newNote.NoteDetails = _mapper.Map<NoteVM, NoteDetails>(noteVM);
            newNote.CreateDate = newNote.LastUpdateDate = DateTime.Now;
            newNote.NoteID = newNote.NoteDetails.NoteID 
                = $"{noteVM.GuestID}-{DateTime.Now.ToString("yyyy-MM-dd-hh:mm:ss")}";
            try
            {
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

            var newNote = _mapper.Map<NoteVM, Notes>(noteVM);
            newNote.NoteDetails = _mapper.Map<NoteVM, NoteDetails>(noteVM);
            newNote.LastUpdateDate = DateTime.Now; 
            try
            {
                var oldNote = _unitOfWork.NotesRepository.GetByID(noteVM.NoteID);
                var updatedNote = _mapper.Map(newNote, oldNote); // 更新 ( Mapping Self )
                oldNote = updatedNote;

                _unitOfWork.SaveChanges();
            }
            catch (Exception)
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
    }
}
