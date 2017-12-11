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
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UserService(IUnitOfWork unitOfWork,  IMapper mapper)
        {
            this._unitOfWork = unitOfWork;
            this._mapper = mapper;
        }


        public IEnumerable<Users> GetAllUser()
        {
            return _unitOfWork.UsersRepository.Get();
        }

        /// <summary>
        /// 找單一用戶資訊
        /// </summary>
        /// <param name="guestID"></param>
        /// <returns>UserVM</returns>
        public UserVM GetUserByID(string guestID)
        {
            var user = _unitOfWork.UsersRepository.Get(filter: u => u.GuestID == guestID,
                includeProperties: "Roles,UserDetails")
                .SingleOrDefault();
            if (user == null)
                return new UserVM() { returnMsgNo = -1, returnMsg = "找不到用戶!" };

            var userVM = _mapper.Map<Users, UserVM>(user);
            userVM.returnMsgNo = 1;
            userVM.returnMsg = "搜尋成功!";

            return userVM;
        }

        /// <summary>
        /// 用戶登入
        /// </summary>
        /// <param name="account">帳號</param>
        /// <param name="password">密碼</param>
        /// <returns>UserVM</returns>
        public UserVM FindUser(string account,string password)
        {
            string sha256Password = password.SHA256EnCrypt();
            Users user = _unitOfWork.UsersRepository.Get(filter: u => u.Account == account && u.UserDetails.Password == sha256Password,
                includeProperties: "Roles,UserDetails").FirstOrDefault();

            if (user == null)
                return new UserVM() { returnMsgNo = -1, returnMsg = "找不到用戶!" };

            var userVM = _mapper.Map<Users, UserVM>(user);
            userVM.returnMsgNo = 1;
            userVM.returnMsg = "登入成功!";

            return userVM;
        }



        public UserVM UserRegister(UserVM userVM)
        {
            //密碼加密
            string sha256Password = userVM.Password.SHA256EnCrypt();
            userVM.Password = sha256Password;
            //建立時間
            userVM.CreateDate = DateTime.Now;
            //建立ID
            Guid guid = Guid.NewGuid();
            string id = guid.ToString().Substring(0, 6).ToUpper();
            userVM.GuestID = "GUS-A01-" + DateTime.Now.Year + DateTime.Now.Month + id;


            var user = _mapper.Map<UserVM, Users>(userVM);
            var userDetail = _mapper.Map<UserVM, UserDetails>(userVM);
            try
            {
                InsertRoles(userVM.RolesIDs, user); // 新增加入權限

                _unitOfWork.UsersRepository.Insert(user);
                _unitOfWork.UserDetailsRepository.Insert(userDetail);

                _unitOfWork.SaveChanges();
                return userVM;
            }
            catch (Exception ex)
            {
                return new UserVM() { returnMsgNo = -1, returnMsg = "新增失敗。" };
            }

        }

        private void InsertRoles(IEnumerable<int> selectIDs, Users user)
        {
            foreach(var role in _unitOfWork.RolesRepository.Get())
            {
                if (selectIDs.Contains(role.RoleID))
                    user.Roles.Add(role);
            }
        }


    }
}
