import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";

import { ValidationService } from "../../services/validation.service"; // 驗證Service
import { AuthenticationService, UserRegisterModel } from "../../services/authentication.service";



@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    public loading = false; //Spinner

    // Roles權限
    roles: any[] = [
        {
            "id": "2",
            "name": "一般會員"
        },
        {
            "id": "1",
            "name": "管理員"
        },
    ];

    // 繳交的表單資訊
    userData: any = {
        roles: []
    };


    userForm: FormGroup;
    constructor(private fb: FormBuilder,
                private authenticationService: AuthenticationService,
                private _router: Router) {
        // 自訂表單驗證
        this.userForm = fb.group(
            {
                'account': ['', [Validators.required, Validators.minLength(5)]],
                'password': ['', [Validators.required, ValidationService.passwordValidator] ],
                'confirmPassword': ['', Validators.required ],
                'email': ['', [Validators.required, ValidationService.emailValidator]],
                'name': [''],
                'phoneNumber': [''],
                'address': ['']
            },
            {
                validator: ValidationService.matchingPasswords('password', 'confirmPassword') //  => 驗證相同密碼
            });

        console.log(this.userForm);
    }

    //增加,變動角色
    onRoleToggle(roleId: number, $event: any) {
        if ($event.target.checked)
            this.userData.roles.push(roleId);
        else {
            var index = this.userData.roles.indexOf(roleId);
            this.userData.roles.splice(index, 1); // 移除
        }
    }

    //提交表單
    onSubmit() {
        let postData: UserRegisterModel = {
            "account": this.userData.account,
            "password": this.userData.password,
            "email": this.userData.email,
            "name": this.userData.name,
            "photos": "",
            "phoneNumber": this.userData.phoneNumber,
            "address": this.userData.address,
            "rolesIDs": this.userData.roles  // role id [] 
        };
        console.log(postData);

        if (this.userForm.dirty && this.userForm.valid) {


            this.loading = true;

            //新增
            this.authenticationService.register(postData)
                .subscribe(
                data => {
                    console.log(data);
                    alert(` 註冊成功! \n名稱: ${this.userForm.value.account} Email: ${this.userForm.value.email}`);

                    this._router.navigate(['/login']);

                    this.loading = false;
                },
                failed => {
                    //獲取錯誤
                    console.log(failed.json());

                    this.loading = false;
                });

        }
    }
}
