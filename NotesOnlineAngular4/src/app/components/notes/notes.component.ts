import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';

//宣告可使用JQuery
//import $ from "jquery";
declare var $: any;

@Component({
  selector: 'notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit, AfterViewInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {

  }


}
