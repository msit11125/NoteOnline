using Autofac;
using Autofac.Integration.WebApi;
using AutoMapper;
using Microsoft.Owin.Security.OAuth;
using NotesOnlineWebApi.Provider;
using NotesOnlineRepository;
using NotesOnlineService;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Http;

namespace NotesOnlineWebApi
{
    public class AutofacConfig
    {
        public static IContainer Initialize()
        {
            var builder = new ContainerBuilder();

            // Get your HttpConfiguration.
            var config = GlobalConfiguration.Configuration;

            // Register your Web API controllers.
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());

            // OPTIONAL: Register the Autofac filter provider.
            builder.RegisterWebApiFilterProvider(config);

            // OPTIONAL: Register the Autofac model binder provider.
            builder.RegisterWebApiModelBinderProvider();

            // DbContext
            builder.RegisterType(typeof(NoteOnlineContext)).As(typeof(DbContext)).InstancePerLifetimeScope();
            // Repository
            builder.RegisterModule<RepositoryModule>(); //等同(new RepositoryModule());
            // UnitOfWork
            builder.RegisterType<UnitOfWork>().As<IUnitOfWork>();
            // Service
            builder.RegisterModule<ServiceModule>();  //等同(new ServiceModule());
            // AutoMapper
            var mapper = MappingProfile.InitializeAutoMapper().CreateMapper();
            builder.RegisterInstance<IMapper>(mapper);

            builder.RegisterType<AuthorizationServerProvider>()
                   .As<IOAuthAuthorizationServerProvider>()
                   .PropertiesAutowired() // to automatically resolve IUserService
                   .SingleInstance(); // you only need one instance of this provider

            // Set the dependency resolver to be Autofac.
            var container = builder.Build();
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
            return container;

        }

    }


    /// <summary>
    /// 註冊所有 Service 組件
    /// </summary>
    public class ServiceModule : Autofac.Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            //// 註冊方法 1
            //builder.RegisterType<CategoryService>().As<ICategoryService>();


            //// 註冊方法 2
            //載入命名空間
            var asmb = Assembly.Load("NotesOnlineService");
            // /*或是*/ var asmb = Assembly.GetExecutingAssembly(); // 獲得全部的Assembly


            //搜尋命名空間結尾為Service的類別 做註冊
            builder.RegisterAssemblyTypes(asmb)
            .Where(t => t.Name.EndsWith("Service")) // 指定型別篩選條件
            .AsImplementedInterfaces()
            .InstancePerLifetimeScope();

            base.Load(builder);
        }
    }

    public class RepositoryModule : Autofac.Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            // 註冊所有IRepository<>型別
            builder.RegisterGeneric(typeof(GenericRepository<>))
           .As(typeof(IRepository<>))
           .InstancePerLifetimeScope();

            base.Load(builder);
        }
    }


}