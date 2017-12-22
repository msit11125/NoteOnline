import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, User } from '../../services/authentication.service'
import { SharedService } from "../../services/shared-service";

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {

    public user = new User('', '');
    public errorMsg = '';

    constructor(
        private _router: Router,
        private _service: AuthenticationService,
        private _sharedService: SharedService)
    {
        // 檢查登入狀態: 登入過 則不需重複登入
        if (localStorage.getItem("user") != null && localStorage.getItem("access_token") != null) {
            this._router.navigate(['/home']);
        }
    }


    public loading = false; //Spinner


    login() {
        this.loading = true;

        this._service.login(this.user).subscribe(
            result => {
                if (result.access_token) { // 成功token有值
                    localStorage.setItem("user", this.user.account);
                    localStorage.setItem("access_token", result.access_token);

                    this._sharedService.emitChange(this.user.account +' is Login.');

                    this._router.navigate(['/home']);
                }
                this.loading = false;

            },
            failed => {
                //獲取錯誤
                console.log(failed.json());
                this.errorMsg = failed.json().error_description;

                this.loading = false;
            }
        );


    }
}