import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';

import { SharedService } from "../../services/shared-service";
import { Router } from "@angular/router";
import { ModalService } from "../../services/modal.service";

import { environment } from "../../../environments/environment";

//宣告可使用JQuery
//import $ from "jquery";
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  public webApiEndPoint: string;

  constructor( private modalService: ModalService,
               private _router: Router,
               private elementRef: ElementRef) {

    // 讀取index.html的webApiEndPoint attribute
    let native = this.elementRef.nativeElement;
    this.webApiEndPoint = native.getAttribute("webApiEndPoint");
    environment.apiServer = this.webApiEndPoint;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    $('.button-collapse').sideNav();

  }

  // 關閉Model
  closeModal(id: string) {
    this.modalService.close(id);
    this._router.navigate(['/login']); // 返回登入
  }
}
