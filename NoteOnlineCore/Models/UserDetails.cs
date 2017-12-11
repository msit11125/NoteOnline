namespace NoteOnlineCore.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class UserDetails
    {
        [Key]
        [StringLength(50)]
        public string GuestID { get; set; }

        [StringLength(300)]
        public string Password { get; set; }

        [StringLength(250)]
        public string Photos { get; set; }

        [StringLength(250)]
        public string Address { get; set; }

        [StringLength(20)]
        public string PhoneNumber { get; set; }

        public decimal Money { get; set; }

        [StringLength(200)]
        public string Email { get; set; }

        [StringLength(50)]
        public string Name { get; set; }

        public virtual Users Users { get; set; }
    }
}
