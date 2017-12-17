namespace NoteOnlineCore.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class VocabularyDictionarys
    {
        [Key]
        [Column(Order = 0)]
        public int Sn { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(30)]
        public string Vocabulary { get; set; }

        [StringLength(150)]
        public string Definition { get; set; }

        [StringLength(500)]
        public string Contents { get; set; }
    }
}
