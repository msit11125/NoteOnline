using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace NotesOnline
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");




            // *** 解決Angular2 Router 受MVC限制 ***

            routes.MapRoute(
                     name: "default",
                     url: "{controller}/{action}/{id}",
                     defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional },
                     // Set a constraint to only use this for routes identified as server-side routes
                     constraints: new
                     {
                         serverRoute = new ServerRouteConstraint(url =>
                         {
                             return url.PathAndQuery.StartsWith("/Settings",
                                 StringComparison.InvariantCultureIgnoreCase);
                         })
                 });

            // This is a catch-all for when no other routes matched. Let the Angular 2 router take care of it
            routes.MapRoute(
                name: "angular",
                url: "{*url}",
                defaults: new { controller = "Home", action = "Index" } // The view that bootstraps Angular 2
            );

            // *** 解決Angular2 Router 受MVC限制 ***

        }
    }
}
