namespace NoteOnlineCore.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Notes
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Sn { get; set; }

        [Key]
        [StringLength(50)]
        public string NoteID { get; set; }

        [Required]
        [StringLength(50)]
        public string NoteTitle { get; set; }

        [StringLength(250)]
        public string NotePhoto { get; set; }

        public DateTime? CreateDate { get; set; }

        public DateTime? LastUpdateDate { get; set; }

        [Required]
        [StringLength(50)]
        public string GuestID { get; set; }

        public int TypeID { get; set; }

        public virtual NoteDetails NoteDetails { get; set; }

        public virtual Types Types { get; set; }

        public virtual Users Users { get; set; }
    }
}
