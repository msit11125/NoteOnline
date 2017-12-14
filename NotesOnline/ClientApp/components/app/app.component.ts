import { Component,  OnInit  } from '@angular/core';

import { SharedService } from "../../services/shared-service";

//宣告可使用JQuery
declare var $: any;

@Component({
    selector: 'my-app',
    templateUrl: './ClientApp/components/app/app.component.html',
    styleUrls: ['./ClientApp/components/app/app.component.css']
})
export class AppComponent {



    constructor() {

    }

    OnInit() {
    }


    ngAfterViewInit() {
        $('.button-collapse').sideNav();

    }
}
