namespace NoteOnlineCore.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Users
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Users()
        {
            Notes = new HashSet<Notes>();
            Roles = new HashSet<Roles>();
            VocabularyDictionarys = new HashSet<VocabularyDictionarys>();
        }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Sn { get; set; }

        [Key]
        [StringLength(50)]
        public string GuestID { get; set; }

        [Required]
        [StringLength(50)]
        public string Account { get; set; }

        public DateTime CreateDate { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Notes> Notes { get; set; }

        public virtual UserDetails UserDetails { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Roles> Roles { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<VocabularyDictionarys> VocabularyDictionarys { get; set; }
    }
}
