import { Component, Input, OnInit  } from '@angular/core';

//宣告可使用JQuery
declare var $: any;

@Component({
    selector: 'my-app',
    templateUrl: './ClientApp/components/app/app.component.html',
    styleUrls: ['./ClientApp/components/app/app.component.css']
})
export class AppComponent {

    // 登入字條
    getUserLogin(): string {
        if (localStorage.getItem('user')) {
            return "|登入中:" + localStorage.getItem('user');
        }
        return "|尚未登入";
    }

    userName: string = this.getUserLogin();

    @Input() user: string;
    constructor() {
    }




    ngAfterViewInit() {
        $('.button-collapse').sideNav();
    }
}
