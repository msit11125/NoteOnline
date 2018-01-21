using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace NotesOnlineWebApi.Controllers
{
    public class ImageController : ApiController
    {
        [HttpGet]
        [Route("image/get")]
        public HttpResponseMessage ImageGet(string imageName)
        {
            var response = Request.CreateResponse(HttpStatusCode.OK);

            var path = "~/App_Data/images/" + imageName;
            path = System.Web.Hosting.HostingEnvironment.MapPath(path);
            var ext = System.IO.Path.GetExtension(path);

            var contents = System.IO.File.ReadAllBytes(path);

            System.IO.MemoryStream ms = new System.IO.MemoryStream(contents);

            response.Content = new StreamContent(ms);
            response.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("image/" + ConvertExtension(ext) );

            return response;
        }


        private string ConvertExtension(string ext)
        {
            switch(ext)
            {
                case ".jpg":
                    return "jpeg";
                case ".png":
                    return "png";
                case ".gif":
                    return "gif";
                default:
                    return "jpeg";
            }
        }

    }
}
