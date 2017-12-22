import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from "../../services/validation.service";


@Component({
    selector: 'control-messages',
    template: `<div *ngIf="errorMessage !== null" class="error">
                    {{errorMessage}}
               </div>`,
    styleUrls: ['./register.component.css']

})
export class ControlMessagesComponent {     // 顯示驗證錯誤訊息的Component
    @Input() control: FormControl;
    constructor() { }

    get errorMessage() {
        for (let propertyName in this.control.errors) {
            if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
                return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
            }
        }

        return null;
    }
}