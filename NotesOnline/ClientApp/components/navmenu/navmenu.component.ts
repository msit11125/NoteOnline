import { Component, Input } from '@angular/core';

@Component({
    selector: 'nav-menu',
    templateUrl: './ClientApp/components/navmenu/navmenu.component.html',
    styleUrls: ['./ClientApp/components/navmenu/navmenu.component.css']
})
export class NavMenuComponent {


    @Input() user: string;
    constructor(){
    }

}
