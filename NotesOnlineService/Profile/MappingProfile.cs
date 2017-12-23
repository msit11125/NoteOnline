using AutoMapper;
using NoteOnlineCore.Models;
using NoteOnlineCore.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotesOnlineService
{

    public static class MappingProfile
    {
        public static MapperConfiguration InitializeAutoMapper()
        {
            MapperConfiguration config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<UserVM, Users>();

                cfg.CreateMap<Users, UserVM>()
                   .ForMember(x => x.Address, y => y.MapFrom(s => s.UserDetails.Address))
                   .ForMember(x => x.Money, y => y.MapFrom(s => s.UserDetails.Money))
                   .ForMember(x => x.PhoneNumber, y => y.MapFrom(s => s.UserDetails.PhoneNumber))
                   .ForMember(x => x.Photos, y => y.MapFrom(s => s.UserDetails.Photos))
                   .ForMember(x => x.Email, y => y.MapFrom(s => s.UserDetails.Email))
                   .ForMember(x => x.Name, y => y.MapFrom(s => s.UserDetails.Name))
                   .ForMember(x => x.RolesIDs, y => y.MapFrom(s => s.Roles.Select(r => r.RoleID)))
                   .ForMember(x => x.RolesNames, y => y.MapFrom(s => s.Roles.Select(r => r.RoleName)));

                cfg.CreateMap<UserDetails, UserVM>();
                cfg.CreateMap<UserVM, UserDetails>();

                cfg.CreateMap<Roles, RoleVM>();
                cfg.CreateMap<RoleVM, Roles>();

                cfg.CreateMap<VocabularyVM, VocabularyDictionarys>()
                    .ForMember(x => x.Vocabulary, y => y.MapFrom(vm => vm.Word))
                    .ForMember(x => x.Definition, y => y.MapFrom(vm => String.Join("|", vm.ChineseDefin)))
                    .ForMember(x => x.Contents, y => y.MapFrom(vm => vm.FullHtml));


                cfg.CreateMap<VocabularyDictionarys, VocabularyVM>()
                    .ForMember(x => x.Word, y => y.MapFrom(vd => vd.Vocabulary))
                    .ForMember(x => x.ChineseDefin, y => y.MapFrom(vd => vd.Definition.Split('|').ToList()))
                    .ForMember(x => x.FullHtml, y => y.MapFrom(vd => vd.Contents));

                cfg.CreateMap<Roles, RoleVM>();

            });

            return config;
        }
    }
}
