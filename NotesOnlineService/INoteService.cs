using System.Collections.Generic;
using NoteOnlineCore.ViewModels;

namespace NotesOnlineService
{
    public interface INoteService
    {
        List<NoteVM> GetNotes(string guestID, out BaseInfo baseReturn);
        NoteVM GetNotesByID(string NoteID, out BaseInfo baseReturn);
        void InsertNote(NoteVM noteVM, out BaseInfo baseReturn);
        void UpdateNote(NoteVM noteVM, out BaseInfo baseReturn);
        void DeleteNote(string NoteID, out BaseInfo baseReturn);
    }
}