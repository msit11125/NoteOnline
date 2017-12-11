using NoteOnlineCore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoteOnlineCore.ViewModels
{
    public class UserVM : BaseReturn
    {
        public string GuestID { get; set; }

        public string Account { get; set; }

        public DateTime CreateDate { get; set; }

        public string Password { get; set; }

        public string Photos { get; set; }

        public string Address { get; set; }

        public string PhoneNumber { get; set; }

        public decimal Money { get; set; }

        public string Email { get; set; }

        public string Name { get; set; }


        public IEnumerable<int> RolesIDs { get; set; }

        public IEnumerable<string> RolesNames { get; set; }
    }
}
