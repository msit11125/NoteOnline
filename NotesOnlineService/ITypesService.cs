using System.Collections.Generic;
using NoteOnlineCore.ViewModels;

namespace NotesOnlineService
{
    public interface ITypesService
    {
        List<TypeVM> GetAllType(out BaseInfo baseReturn);
    }
}