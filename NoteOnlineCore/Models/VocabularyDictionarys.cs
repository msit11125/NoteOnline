namespace NoteOnlineCore.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class VocabularyDictionarys
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public VocabularyDictionarys()
        {
            Users = new HashSet<Users>();
        }

        [Key]
        public int Sn { get; set; }

        [Required]
        [StringLength(30)]
        public string Vocabulary { get; set; }

        [StringLength(150)]
        public string Definition { get; set; }

        [StringLength(500)]
        public string Contents { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Users> Users { get; set; }
    }
}
