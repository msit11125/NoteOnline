import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // 有雙向綁定 [(ngModel)] 要加這個


import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';



import { AuthenticationService } from './services/authentication.service'; // Service 登入服務
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading'; /* 與 materialize.css => 5120行 衝突 */
import { SharedService } from "./services/shared-service";


@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([  
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent },
            { path: 'home', component: HomeComponent },
            { path: '**', redirectTo: 'home' },
        ]),
        LoadingModule.forRoot({  // 自訂Loading樣式
            animationType: ANIMATION_TYPES.threeBounce,
            backdropBackgroundColour: 'rgba(0,0,0,0.1)',
            backdropBorderRadius: '4px',
            primaryColour: '#00AA88',
            secondaryColour: '#00AA88',
            tertiaryColour: '#00AA88'
        }),
    ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        FooterComponent,
        HomeComponent,
        LoginComponent,
    ],
    bootstrap: [AppComponent],
    providers: [
        { provide: 'BASE_URL', useFactory: getBaseUrl }, 
        AuthenticationService,
        SharedService // 共用Service
    ]
})
export class AppModule { }

export function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}