import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // 有雙向綁定[(ngModel)]要加FormsModule   使用表單驗證(Moder Driven)要加 ReactiveFormsModule


import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from "./components/register/register.component";
import { ControlMessagesComponent } from "./components/register/control-messages.component";
import { VocabularyComponent} from "./components/vocabulary/vocabulary.component";
import { ModalComponent } from './directives/modal.component'; // 自訂彈出Modal
import { FavoriteComponent } from './components/favorite/favorite.component';
import { NotesComponent } from "./components/notes/notes.component";
import { NotesCreateComponent } from "./components/notes/notes-create.component";
import { NotesDetailComponent } from "./components/notes/notes-detail.component";
import { NotesUpdateComponent } from "./components/notes/notes-update.component";


import { AuthenticationService } from './services/authentication.service'; // Service 登入服務
import { SharedService } from "./services/shared-service";
import { ValidationService } from "./services/validation.service";
import { VocabularyService } from "./services/vocabulary.service";
import { ModalService } from './services/modal.service';
import { TypesService } from "./services/types-service";
import { NotesService } from "./services/notes-service";


// 額外下載的module
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading'; /* 與 materialize.css => 5120行 衝突 */
import { SafeHtmlPipe } from "./pipe/safehtml-pipe";

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
      { path: 'register', component: RegisterComponent },
      { path: 'vocabulary', component: VocabularyComponent },
      { path: 'favorite', component: FavoriteComponent },
      { path: 'notes', component: NotesComponent },
      { path: 'notes-create', component: NotesCreateComponent },
      { path: 'notes-detail/:id', component: NotesDetailComponent },
      { path: 'notes-update/:id', component: NotesUpdateComponent },
      { path: '**', redirectTo: 'home' },

    ]),
    LoadingModule.forRoot({  // 自訂Loading樣式
      animationType: ANIMATION_TYPES.rectangleBounce,
      backdropBackgroundColour: 'rgba(0,0,0,0.8)',
      backdropBorderRadius: '4px',
      primaryColour: '#fff',
      secondaryColour: '#fff',
      tertiaryColour: '#fff'
    }),
    
  ],
  declarations: [
    AppComponent,
    NavMenuComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ControlMessagesComponent,
    VocabularyComponent, 
    SafeHtmlPipe, //自訂Html的管道
    ModalComponent, // 自製Modal
    FavoriteComponent,
    NotesComponent,
    NotesCreateComponent,
    NotesDetailComponent,
    NotesUpdateComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: 'BASE_URL', useFactory: getBaseUrl },
    AuthenticationService,
    SharedService, // 共用 Service
    ValidationService, // 驗證 Service
    VocabularyService, 
    ModalService,// 自製Modal
    TypesService, 
    NotesService,
  ]
})
export class AppModule { }

// 取得根Server網址
export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}
