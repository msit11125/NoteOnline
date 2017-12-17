"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var authentication_service_1 = require("../../services/authentication.service");
var shared_service_1 = require("../../services/shared-service");
var LoginComponent = (function () {
    function LoginComponent(_router, _service, _sharedService) {
        this._router = _router;
        this._service = _service;
        this._sharedService = _sharedService;
        this.user = new authentication_service_1.User('', '');
        this.errorMsg = '';
        this.loading = false; //Spinner
        // 檢查登入狀態: 登入過 則不需重複登入
        if (localStorage.getItem("user") != null && localStorage.getItem("access_token") != null) {
            this._router.navigate(['/home']);
        }
    }
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.loading = true;
        this._service.login(this.user).subscribe(function (result) {
            if (result.access_token) {
                localStorage.setItem("user", _this.user.account);
                localStorage.setItem("access_token", result.access_token);
                _this._sharedService.emitChange(_this.user.account + ' is Login.');
                _this._router.navigate(['/home']);
            }
            _this.loading = false;
        }, function (failed) {
            //獲取錯誤
            console.log(failed.json());
            _this.errorMsg = failed.json().error_description;
            _this.loading = false;
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'login',
        templateUrl: './ClientApp/components/login/login.component.html',
        styleUrls: ['./ClientApp/components/login/login.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        authentication_service_1.AuthenticationService,
        shared_service_1.SharedService])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map