namespace NoteOnlineCore.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class NoteDetails
    {
        [Key]
        [StringLength(50)]
        public string NoteID { get; set; }

        [StringLength(2000)]
        public string Details { get; set; }

        [StringLength(150)]
        public string Tags { get; set; }

        public virtual Notes Notes { get; set; }
    }
}
