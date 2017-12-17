"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms"); // 有雙向綁定[(ngModel)]要加FormsModule   使用表單驗證(Moder Driven)要加 ReactiveFormsModule
var app_component_1 = require("./components/app/app.component");
var home_component_1 = require("./components/home/home.component");
var navmenu_component_1 = require("./components/navmenu/navmenu.component");
var login_component_1 = require("./components/login/login.component");
var footer_component_1 = require("./components/footer/footer.component");
var register_component_1 = require("./components/register/register.component");
var control_messages_component_1 = require("./components/register/control-messages.component");
var vocabulary_component_1 = require("./components/vocabulary/vocabulary.component");
var authentication_service_1 = require("./services/authentication.service"); // Service 登入服務
var ngx_loading_1 = require("ngx-loading"); /* 與 materialize.css => 5120行 衝突 */
var shared_service_1 = require("./services/shared-service");
var validation_service_1 = require("./services/validation.service");
var vocabulary_service_1 = require("./services/vocabulary.service");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            http_1.HttpModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            router_1.RouterModule.forRoot([
                { path: '', redirectTo: 'login', pathMatch: 'full' },
                { path: 'login', component: login_component_1.LoginComponent },
                { path: 'home', component: home_component_1.HomeComponent },
                { path: 'register', component: register_component_1.RegisterComponent },
                { path: 'vocabulary', component: vocabulary_component_1.VocabularyComponent },
                { path: '**', redirectTo: 'home' },
            ]),
            ngx_loading_1.LoadingModule.forRoot({
                animationType: ngx_loading_1.ANIMATION_TYPES.threeBounce,
                backdropBackgroundColour: 'rgba(0,0,0,0.4)',
                backdropBorderRadius: '4px',
                primaryColour: '#00AA88',
                secondaryColour: '#00AA88',
                tertiaryColour: '#00AA88'
            }),
        ],
        declarations: [
            app_component_1.AppComponent,
            navmenu_component_1.NavMenuComponent,
            footer_component_1.FooterComponent,
            home_component_1.HomeComponent,
            login_component_1.LoginComponent,
            register_component_1.RegisterComponent,
            control_messages_component_1.ControlMessagesComponent,
            vocabulary_component_1.VocabularyComponent,
            vocabulary_component_1.SafeHtmlPipe,
        ],
        bootstrap: [app_component_1.AppComponent],
        providers: [
            { provide: 'BASE_URL', useFactory: getBaseUrl },
            authentication_service_1.AuthenticationService,
            shared_service_1.SharedService,
            validation_service_1.ValidationService,
            vocabulary_service_1.VocabularyService,
        ]
    })
], AppModule);
exports.AppModule = AppModule;
// 取得根Server網址
function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}
exports.getBaseUrl = getBaseUrl;
//# sourceMappingURL=boot.js.map