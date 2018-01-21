using NoteOnlineCore.ViewModels;
using NotesOnlineService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace NotesOnlineWebApi.Controllers
{
    public class TypesApiController : ApiController
    {
        private readonly ITypesService _typesService;

        public TypesApiController(ITypesService typesService)
        {
            this._typesService = typesService;
        }

        [AcceptVerbs("GET")]
        public IHttpActionResult GetArticleTypes()
        {
            BaseInfo baseReturn;
            var searchRE = _typesService.GetAllType(out baseReturn);

            if (baseReturn.returnMsgNo != 1)
                return BadRequest(baseReturn.returnMsg);

            return Ok(searchRE);
        }

    }
}
