import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { environment } from "../../environments/environment";

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

  public logout() {

    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    // 2.0 之後 route的name設定移除了 無法使用 this.router.navigate(['Login'])
    // 以下這種navigate寫法 才有會效果
    this._router.navigateByUrl('/login');
  }

  // 登入 (取得Token)
  public login(user: User): Observable<boolean> {
    // Owin 取Token協定Content-Type: application/x-www-form-urlencoded
    // let body = JSON.stringify({ grant_type:"password" , username: user.account, password: user.password });
    // let headers = new Headers({ 'Content-Type': 'application/json' });

    let body = `grant_type=password&username=${user.account}&password=${user.password}`;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

    let options = new RequestOptions({ headers: headers });

    return this.http.post(environment.apiServer + '/api/security/token', body, options)
      .map((res: Response) => {
        var returnedBody: any = res.json();
        if (typeof returnedBody.access_token !== 'undefined') {
          localStorage.setItem("user", user.account);
          localStorage.setItem("access_token", returnedBody.access_token);
          localStorage.setItem("refresh_token", returnedBody.refresh_token);
          // 設定refresh Token的routine => 120分鐘 (與Server端相同)
          this.setCookie("TokenExpire", "exist", 120);
          return true;
        }
        return false;
      });
  }

  // (更新Token)
  public refreshToken(): Observable<boolean> {

    let body = `grant_type=refresh_token&refresh_token=${localStorage.getItem("refresh_token")}`;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(environment.apiServer + '/api/security/token', body, options)
      .map((res: Response) => {
        var returnedBody: any = res.json();
        if (typeof returnedBody.access_token !== 'undefined') {
          localStorage.setItem("access_token", returnedBody.access_token);
          localStorage.setItem("refresh_token", returnedBody.refresh_token);
          return true;
        }
        return false;
      });

  }

  //註冊
  public register(userData: UserRegisterModel) {
    let headers = new Headers(
      {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
      }
    );
    let options = new RequestOptions({ headers: headers });

    return this.http.post(environment.apiServer + "/api/userapi/userregister", JSON.stringify(userData), options)
      .map(res => res.json());
  }

  //檢查登入狀態 false:尚未登入 true:已登入
  public checkCredentials() {
    var flag: boolean =
      localStorage.getItem("user") === null ||
      localStorage.getItem("access_token") === null ||
      localStorage.getItem("refresh_token") === null;

    if (flag) {
      return false;
    }
    return true;
  }

  // 檢查是否需RefreshToken => 並更新Token
  public checkRefreshToken() {
    //檢查refreshtoken cookie是否不存在(過期)
    var username = this.getCookie("TokenExpire");
    if (username != "") {
      // 尚未過期
    } else {
      // 需更新Token
      this.refreshToken().subscribe(
        data => {
          if (data) {
            console.log("refresh token done.");
            // 設定accessToken的routine => 120分鐘 (與Server端相同)
            this.setCookie("TokenExpire", "exist", 120);
          }
        },
        err => {
          console.log(err);
          //過久未登入 => 登出
          this.logout();
          window.location.reload();
        });
    }
  }





  // 設定Cookie
  public setCookie(cname, cvalue, exminute) {
    var d = new Date();
    d.setTime(d.getTime() + (exminute * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  // 取得Cookie 
  public getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
}
