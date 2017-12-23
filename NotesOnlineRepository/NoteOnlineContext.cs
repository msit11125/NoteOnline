using NoteOnlineCore.Models;

namespace NotesOnlineRepository
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class NoteOnlineContext : DbContext
    {
        public NoteOnlineContext()
            : base("name=NoteOnlineContext")
        {
        }

        public virtual DbSet<NoteDetails> NoteDetails { get; set; }
        public virtual DbSet<Notes> Notes { get; set; }
        public virtual DbSet<Roles> Roles { get; set; }
        public virtual DbSet<Types> Types { get; set; }
        public virtual DbSet<UserDetails> UserDetails { get; set; }
        public virtual DbSet<Users> Users { get; set; }
        public virtual DbSet<VocabularyDictionarys> VocabularyDictionarys { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<NoteDetails>()
                .HasOptional(e => e.Notes)
                .WithRequired(e => e.NoteDetails);

            modelBuilder.Entity<Roles>()
                .HasMany(e => e.Users)
                .WithMany(e => e.Roles)
                .Map(m => m.ToTable("UsersRoles").MapLeftKey("RoleID").MapRightKey("GuestID"));

            modelBuilder.Entity<UserDetails>()
                .Property(e => e.PhoneNumber)
                .IsUnicode(false);

            modelBuilder.Entity<Users>()
                .HasMany(e => e.Notes)
                .WithRequired(e => e.Users)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Users>()
                .HasOptional(e => e.UserDetails)
                .WithRequired(e => e.Users);

            modelBuilder.Entity<Users>()
                .HasMany(e => e.VocabularyDictionarys)
                .WithMany(e => e.Users)
                .Map(m => m.ToTable("UsersVocabularys").MapLeftKey("GuestID").MapRightKey("VocabularySn"));
        }
    }
}
