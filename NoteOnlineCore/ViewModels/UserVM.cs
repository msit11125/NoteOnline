using NoteOnlineCore.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoteOnlineCore.ViewModels
{
    public class UserVM : BaseInfo
    {
        public string GuestID { get; set; }

        [Required]
        public string Account { get; set; }

        public DateTime CreateDate { get; set; }

        [Required]
        public string Password { get; set; }

        public string Photos { get; set; }

        public string Address { get; set; }

        public string PhoneNumber { get; set; }

        public decimal Money { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Name { get; set; }


        public IEnumerable<int> RolesIDs { get; set; }

        public IEnumerable<string> RolesNames { get; set; }
    }
}
