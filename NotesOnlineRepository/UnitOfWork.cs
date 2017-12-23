using NoteOnlineCore.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotesOnlineRepository
{
    /// <summary>
    /// UnitOfWork 用途: Transaction
    /// 從Controller注入IUnitOfWork
    /// Service功能皆完成時呼叫SaveChanges
    /// </summary>
    public class UnitOfWork : IUnitOfWork
    {
        private DbContext _context;

        // 需要做Transaction的資料放在這裡
        private IRepository<Users> _usersRepository;
        private IRepository<UserDetails> _userDetailsRepository;
        private IRepository<Roles> _rolesRepository;
        private IRepository<Types> _typesRepository;
        private IRepository<Notes> _notesRepository;
        private IRepository<NoteDetails> _noteDetailsRepository;
        private IRepository<VocabularyDictionarys> _vocabularyRepository;

        #region Repository資料
        public IRepository<Users> UsersRepository
        {
            get
            {
                if (this._usersRepository == null)
                {
                    this._usersRepository = new GenericRepository<Users>(_context);
                }
                return _usersRepository;
            }
        }
        public IRepository<UserDetails> UserDetailsRepository
        {
            get
            {
                if (this._userDetailsRepository == null)
                {
                    this._userDetailsRepository = new GenericRepository<UserDetails>(_context);
                }
                return _userDetailsRepository;
            }
        }
        public IRepository<Roles> RolesRepository
        {
            get
            {
                if (this._rolesRepository == null)
                {
                    this._rolesRepository = new GenericRepository<Roles>(_context);
                }
                return _rolesRepository;
            }
        }
        public IRepository<Types> TypesRepository
        {
            get
            {
                if (this._typesRepository == null)
                {
                    this._typesRepository = new GenericRepository<Types>(_context);
                }
                return _typesRepository;
            }
        }
        public IRepository<Notes> NotesRepository
        {
            get
            {
                if (this._notesRepository == null)
                {
                    this._notesRepository = new GenericRepository<Notes>(_context);
                }
                return _notesRepository;
            }
        }
        public IRepository<NoteDetails> NoteDetailsRepository
        {
            get
            {
                if (this._noteDetailsRepository == null)
                {
                    this._noteDetailsRepository = new GenericRepository<NoteDetails>(_context);
                }
                return _noteDetailsRepository;
            }
        }
        public IRepository<VocabularyDictionarys> VocabularyDictionarysRepository
        {
            get
            {
                if (this._vocabularyRepository == null)
                {
                    this._vocabularyRepository = new GenericRepository<VocabularyDictionarys>(_context);
                }
                return _vocabularyRepository;
            }
        }



        #endregion


        public DbContext Context
        {
            get
            {
                if (this._context != null)
                {
                    return this._context;
                }

                throw new ArgumentNullException();
            }
        }


        public UnitOfWork(DbContext context)
        {
            this._context = context;
        }
        public int SaveChanges()
        {
            return _context.SaveChanges();
        }



        #region Dispose 釋放物件方法
        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    this.Context.Dispose();
                    this._context = null;
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        #endregion
    }
}
