import { Component, Input } from '@angular/core';
import { SharedService } from "../../services/shared-service";
import { AuthenticationService } from "../../services/authentication.service";


//宣告可使用JQuery
declare var $: any;

@Component({
    selector: 'nav-menu',
    templateUrl: './ClientApp/components/navmenu/navmenu.component.html',
    styleUrls: ['./ClientApp/components/navmenu/navmenu.component.css']
})
export class NavMenuComponent {

    // 登入字條
    getUserLogin(): string {
        if (localStorage.getItem('user')) {
            return "[" + localStorage.getItem('user') +"]";
        }
        return "[尚未登入]";
    }
    userName: string = this.getUserLogin();
    canLogOut: boolean = (this.userName == "[尚未登入]") ? false : true ;

    constructor(private _sharedService: SharedService,
        private _authenticationService: AuthenticationService) {

        _sharedService.changeEmitted$.subscribe(
            text => {
                console.log(text); // 會得到傳過來的訊息 xxx is Login.
                this.userName = this.getUserLogin(); // 更新登入狀態
                this.canLogOut = true;
            });
    }

    logOut() {
        let name:string = localStorage.getItem('user');

        this._authenticationService.logout();
        this._sharedService.emitChange(name + ' is LogOut.');

        this.canLogOut = false;

    }

}
