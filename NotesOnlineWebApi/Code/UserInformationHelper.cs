using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Web;

namespace NotesOnlineWebApi
{
    public static class UserInformationHelper
    {
        public static string GetUserGuestID()
        {
            //Get the current claims principal 取得資訊
            var identity = (ClaimsPrincipal)Thread.CurrentPrincipal;

            // Get the claims values 取得ID
            string guestID = identity.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier)
                               .Select(c => c.Value).SingleOrDefault();

            return guestID;
        }
    }
}