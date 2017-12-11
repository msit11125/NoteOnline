import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, User } from '../../services/authentication.service'

@Component({
    selector: 'login',
    templateUrl: './ClientApp/components/login/login.component.html',
    styleUrls: ['./ClientApp/components/login/login.component.css']
})

export class LoginComponent {

    public user = new User('', '');
    public errorMsg = '';

    constructor(
        private _router: Router,
        private _service: AuthenticationService) { }


    public loading = false; //Spinner

    login() {
        this.loading = true;

        this._service.login(this.user).subscribe(
            result => {
                if (result.access_token) { // 成功token有值
                    localStorage.setItem("user", this.user.account);
                    localStorage.setItem("access_token", result.access_token);
                    this._router.navigate(['Home']);
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