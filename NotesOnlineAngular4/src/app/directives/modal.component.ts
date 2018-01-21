import { Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';

import { ModalService } from "../services/modal.service";


// Angular 自製 Modeal
// 參考 http://jasonwatmore.com/post/2017/01/24/angular-2-custom-modal-window-dialog-box

@Component({
    moduleId: module.id.toString(),
    selector: 'modal',
    template: '<ng-content></ng-content>'
})
export class ModalComponent implements OnInit, OnDestroy {
    @Input() id: string;
    private element: any;

    constructor(private modalService: ModalService,
                private el: ElementRef) {
        this.element = $(el.nativeElement);
    }

    ngOnInit(): void {
        let modal = this;

        // ensure id attribute exists
        if (!this.id) {
            console.error('modal must have an id');
            return;
        }

        // move element to bottom of page (just before </body>) so it can be displayed above everything else
        this.element.appendTo('body');

        // close modal on background click
        // 按任何滑鼠鍵就會關閉Modal
        //this.element.on('click', function (e: any) {
        //    var target = $(e.target);
        //    if (!target.closest('.modal-body').length) {
        //        modal.close();
        //    }
        //});

        // add self (this modal instance) to the modal service so it's accessible from controllers
        this.modalService.add(this);
    }

    // remove self from modal service when directive is destroyed
    ngOnDestroy(): void {
        this.modalService.remove(this.id);
        this.element.remove();
    }

    // open modal
    open(): void {
        this.element.show();
        $('body').addClass('modal-open');
    }

    // close modal
    close(): void {
        this.element.hide();
        $('body').removeClass('modal-open');
    }
}
