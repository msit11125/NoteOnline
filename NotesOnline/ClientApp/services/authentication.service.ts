import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';


import 'rxjs/add/operator/map';

export class User {
    constructor(
        public account: string,
        public password: string) { }
}



@Injectable()
export class AuthenticationService {

    constructor(
        private _router: Router, private http: Http) { }

    logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("access_token");

        this._router.navigateByUrl('/login'); //在Service中 這種navigate寫法 才有效果
    }

    login(user) {
        // Owin 取Token協定Content-Type: application/x-www-form-urlencoded
        // let body = JSON.stringify({ grant_type:"password" , username: user.account, password: user.password });
        // let headers = new Headers({ 'Content-Type': 'application/json' });

        let body = `grant_type=password&username=${user.account}&password=${user.password}`;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

        let options = new RequestOptions({ headers: headers });

        return this.http.post('/api/security/token', body, options)
            .map(res => res.json());
       
    }

    checkCredentials() {
        if (localStorage.getItem("user") === null) {
            this._router.navigateByUrl('/login');
        }
    }
}