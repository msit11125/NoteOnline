using AutoMapper;
using NoteOnlineCore.Models;
using NoteOnlineCore.ViewModels;
using NotesOnlineRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotesOnlineService
{
    public class TypesService : ITypesService
    {
        private readonly IRepository<Types> _typesRepo;
        private readonly IMapper _mapper;

        public TypesService(IRepository<Types> typesRepo, IMapper mapper)
        {
            this._typesRepo = typesRepo;
            this._mapper = mapper;
        }


        public List<TypeVM> GetAllType(out BaseInfo baseReturn)
        {
            baseReturn = new BaseInfo();
            IEnumerable<TypeVM> typeVMs;
            try
            {
                var types = _typesRepo.Get();
                typeVMs = _mapper.Map<IEnumerable<Types>, IEnumerable<TypeVM>>(types);

            }
            catch (Exception ex)
            {
                baseReturn.returnMsgNo = -1;
                baseReturn.returnMsg = "取得Types資料發生例外";
                return null;
            }

            baseReturn.returnMsgNo = 1;
            baseReturn.returnMsg = "取得Types資料成功";
            return typeVMs.ToList();
        }
    }
}
