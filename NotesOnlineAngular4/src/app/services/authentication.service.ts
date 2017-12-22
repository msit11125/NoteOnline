import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';


import 'rxjs/add/operator/map';
import { ConstantValues } from "../constant-values";

export class User {
    constructor(
        public account: string,
        public password: string)
    { }
}
export class UserRegisterModel {
    account: string;
    password: string;
    email: string;
    name: string;
    photos: string;
    phoneNumber: string;
    address: string;
    rolesIDs: number[];
}


@Injectable()
export class AuthenticationService {

    constructor(
        private _router: Router, private http: Http) { }

    logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("access_token");

        // 2.0 之後 route的name設定移除了 無法使用 this.router.navigate(['Login'])
        // 以下這種navigate寫法 才有會效果
        this._router.navigateByUrl('/login');
    }

    //登入
    login(user: User) {
        // Owin 取Token協定Content-Type: application/x-www-form-urlencoded
        // let body = JSON.stringify({ grant_type:"password" , username: user.account, password: user.password });
        // let headers = new Headers({ 'Content-Type': 'application/json' });

        let body = `grant_type=password&username=${user.account}&password=${user.password}`;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

        let options = new RequestOptions({ headers: headers });

        return this.http.post( ConstantValues.apiUrl +'/api/security/token', body, options)
            .map(res => res.json());
       
    }

    //註冊
    register(userData: UserRegisterModel) {
        let headers = new Headers(
            {
                'Authorization': 'Bearer ' +localStorage.getItem('access_token'),
                'Content-Type': 'application/json'
            }
        );

        return this.http.post( ConstantValues.apiUrl +"/api/userapi/userregister", JSON.stringify(userData), { headers: headers })
            .map(res => res.json());
    }

    //檢查登入狀態 false:尚未登入 true:已登入
    checkCredentials() {
        if (localStorage.getItem("user") === null || localStorage.getItem("access_token") === null) {
            alert("請先登入!");
            this._router.navigateByUrl('/login');
            return false; 
        }
        return true;
    }
}
