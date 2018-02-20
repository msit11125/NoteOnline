import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from "../../services/validation.service"; // 驗證Service
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
  public loginForm: FormGroup;

  public rememberMe: boolean = true;


  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _service: AuthenticationService,
    private _sharedService: SharedService) {

    // 檢查登入狀態: 登入過 則不需重複登入
    if (localStorage.getItem("user") != null && localStorage.getItem("access_token") != null) {
      this._router.navigate(['/home']);
    }
    // 自訂表單驗證
    this.loginForm = fb.group(
      {
        'account': ['', [Validators.required, Validators.minLength(5)]],
        'password': ['', [Validators.required, ValidationService.passwordValidator]],
      });
  }






  public loading = false; //Spinner

  login() {
    this.loading = true;

    this._service.login(this.user).subscribe(
      result => {
        if (result) { // 成功token有值

          this._sharedService.emitChange(this.user.account + ' is Login.');

          this._router.navigate(['/home']);
        }

      },
      failed => {
        //獲取錯誤
        console.log(failed.json());
        this.errorMsg = failed.json().error_description;
        this.loading = false;
        
      },
      () => this.loading = false
    );


  }
}
