using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoteOnlineCore.ViewModels
{
    public class NoteVM
    {
        [StringLength(50)]
        public string NoteID { get; set; }

        [Required]
        [StringLength(50)]
        public string NoteTitle { get; set; }

        [StringLength(250)]
        public string NotePhoto { get; set; }

        public DateTime? CreateDate { get; set; }

        public DateTime? LastUpdateDate { get; set; }

        [StringLength(50)]
        public string GuestID { get; set; }

        public int TypeID { get; set; }

        [StringLength(2000)]
        public string Details { get; set; }

        public IEnumerable<string> Tags { get; set; }  // Mapping時使用「,」分隔
    }
}
