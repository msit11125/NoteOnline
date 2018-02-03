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

                cfg.CreateMap<VocabularyInfo, VocabularyDictionarys>()
                    .ForMember(x => x.Vocabulary, y => y.MapFrom(vm => vm.Word))
                    .ForMember(x => x.Definition, y => y.MapFrom(vm => String.Join("|", vm.ChineseDefin)))
                    .ForMember(x => x.Contents, y => y.MapFrom(vm => StringCompressorHelper.CompressString(vm.FullHtml))); // Html格式字串壓縮

                cfg.CreateMap<VocabularyDictionarys, VocabularyInfo>()
                    .ForMember(x => x.WordSn, y => y.MapFrom(vd => vd.Sn))
                    .ForMember(x => x.Word, y => y.MapFrom(vd => vd.Vocabulary))
                    .ForMember(x => x.ChineseDefin, y => y.MapFrom(vd => vd.Definition.Split('|').ToList()))
                    .ForMember(x => x.FullHtml, y => y.MapFrom(vd => StringCompressorHelper.DecompressString(vd.Contents))); // Html格式字串解壓縮

                cfg.CreateMap<Notes, NoteVM>()
                 .ForMember(x => x.Details, y => y.MapFrom(n => n.NoteDetails.Details))
                 .ForMember(x => x.Tags, y => y.MapFrom(n => n.NoteDetails.Tags.Split(',')))
                 .ForMember(x => x.GuestName, y => y.MapFrom(n => n.Users.UserDetails.Name))
                 .ForMember(x => x.TypeName, y => y.MapFrom(n => n.Types.TypeName));
                cfg.CreateMap<NoteDetails, NoteVM>()
                 .ForMember(x => x.Tags, y => y.MapFrom(nv => nv.Tags.Split(',')));

                cfg.CreateMap<NoteVM, Notes>() ;
                cfg.CreateMap<NoteVM, NoteDetails>()
                 .ForMember(x => x.Tags, y => y.MapFrom(nd => String.Join(",", nd.Tags)))
                 .ForMember(x => x.NoteID, y => y.Ignore())
                 .ForMember(x => x.Notes, y => y.Ignore());


                cfg.CreateMap<Notes, Notes>()
                 .ForMember(x => x.Sn, y => y.Ignore())
                 .ForMember(x => x.Types, y => y.Ignore())
                 .ForMember(x => x.Users, y => y.Ignore())
                 .ForMember(x => x.NoteDetails, y => y.MapFrom(n => n.NoteDetails));


                cfg.CreateMap<Types, TypeVM>();
                cfg.CreateMap<TypeVM, Types>();

            });

            return config;
        }
    }
}
