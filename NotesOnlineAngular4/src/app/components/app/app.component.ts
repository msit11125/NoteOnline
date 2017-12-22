import { Component,  OnInit  } from '@angular/core';

import { SharedService } from "../../services/shared-service";

//宣告可使用JQuery
//import $ from "jquery";
declare var $: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
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
