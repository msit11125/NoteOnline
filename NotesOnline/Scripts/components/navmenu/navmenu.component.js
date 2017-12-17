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
var shared_service_1 = require("../../services/shared-service");
var authentication_service_1 = require("../../services/authentication.service");
var NavMenuComponent = (function () {
    function NavMenuComponent(_sharedService, _authenticationService) {
        var _this = this;
        this._sharedService = _sharedService;
        this._authenticationService = _authenticationService;
        this.userName = this.getUserLogin();
        this.canLogOut = (this.userName == "[尚未登入]") ? false : true;
        _sharedService.changeEmitted$.subscribe(function (text) {
            console.log(text); // 會得到傳過來的訊息 xxx is Login.
            _this.userName = _this.getUserLogin(); // 更新登入狀態
            _this.canLogOut = true;
        });
    }
    // 登入字條
    NavMenuComponent.prototype.getUserLogin = function () {
        if (localStorage.getItem('user')) {
            return "[" + localStorage.getItem('user') + "]";
        }
        return "[尚未登入]";
    };
    NavMenuComponent.prototype.logOut = function () {
        var name = localStorage.getItem('user');
        this._authenticationService.logout();
        this._sharedService.emitChange(name + ' is LogOut.');
        this.canLogOut = false;
    };
    return NavMenuComponent;
}());
NavMenuComponent = __decorate([
    core_1.Component({
        selector: 'nav-menu',
        templateUrl: './ClientApp/components/navmenu/navmenu.component.html',
        styleUrls: ['./ClientApp/components/navmenu/navmenu.component.css']
    }),
    __metadata("design:paramtypes", [shared_service_1.SharedService,
        authentication_service_1.AuthenticationService])
], NavMenuComponent);
exports.NavMenuComponent = NavMenuComponent;
//# sourceMappingURL=navmenu.component.js.map