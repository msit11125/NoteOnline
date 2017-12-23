using NoteOnlineCore.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotesOnlineRepository
{
    public interface IUnitOfWork : IDisposable
    {
        DbContext Context { get; }

        IRepository<Users> UsersRepository { get; }
        IRepository<UserDetails> UserDetailsRepository { get; }
        IRepository<Roles> RolesRepository { get; }
        IRepository<Types> TypesRepository { get; }
        IRepository<Notes> NotesRepository { get; }
        IRepository<NoteDetails> NoteDetailsRepository { get; }
        IRepository<VocabularyDictionarys> VocabularyDictionarysRepository { get; }


        /// <summary>
        /// 儲存所有異動。
        /// </summary>
        int SaveChanges();
    }
}
