import { Component, OnInit, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { NotesService } from "../../services/notes-service";
import { Note } from "../../models/Note";
import { AuthenticationService } from "../../services/authentication.service";
import { ModalService } from "../../services/modal.service";

//宣告可使用JQuery
//import $ from "jquery";
declare var $: any;

@Component({
  selector: 'notes-detail',
  template:
  `
<div style="background-color:white;padding:1% 10%;">

    <p style="font-size:10px;">文章標題:</p>
    <a href="javascript:void(0)" style="font-size:26px;">{{note.NoteTitle}}</a>
    <br/><br/>
    <div [innerHTML]="note.Details | safeHtml"
          class="htmlDiv">
    </div>   <!-- Angular內建使用Html -->
    <br/><br/>
    <div>
      <div class="tags">
        <a href="javascript:void(0)" *ngFor="let tag of note.Tags">
          {{tag}}
        </a>
      </div>
    <span class="pull-right">最後修改時間:{{note.LastUpdateDate | date:'yyyy-MM-dd HH:mm a'}}</span>
    </div>
    <hr/>

    <div class="row">
         <a class="btn teal darken-3 pull-left" [routerLink]="['/notes']">
            <i class="material-icons">format_list_bulleted</i>
            回到列表
         </a>
         <a class="btn red darken-4 pull-right" [routerLink]="" (click)="openModal('custom-modal-delete');" >
            <i class="material-icons">clear</i>
            刪除文章
         </a>
        
         <a class="btn teal darken-1 pull-right" [routerLink]="['/notes-update', note.NoteID]" style="margin-right: 20px;">
            <i class="material-icons">edit</i>
            修改文章
         </a>

    </div>
    
</div>

<!--自訂客製化Modal (確認刪除)-->
<modal id="custom-modal-delete">
  <div class="mymodal">
    <div class="mymodal-body">
      <h3>
        <i class="fa fa-exclamation-triangle"></i>&nbsp;確定要刪除這篇文章?
      </h3>
      <button class="btn btn-danger" (click)="RemoveArticle()">刪除</button>
      <button class="btn btn-warning" (click)="closeModal('custom-modal-delete');">返回</button>
    </div>
  </div>
  <div class="mymodal-background"></div>
</modal>

  `,
  styles: [
    `
     .htmlDiv{
        border: solid 1px #E4E4E4;
        padding: 2%;
      }

    .tags a {
      background-color: #756f5d;
      padding: 10px;
      color: #fff;
      display: inline-block;
      font-size: 11px;
      text-transform: uppercase;
      line-height: 11px;
      border-radius: 2px;
      margin-bottom: 5px;
      margin-right: 2px;
      text-decoration: none;
    }

      .tags a i {
        padding-left: 5px;
        font-size: 9px;
      }

      .tags a:hover {
        background-color: #a38018;
      }

    `]
})
export class NotesDetailComponent implements OnInit, OnDestroy {

  id: string;  // 這個是NoteID
  private sub: any;

  private note: Note = new Note();

  constructor
    (
    private notesService: NotesService,
    private authService: AuthenticationService,
    private modalService: ModalService,
    private route: ActivatedRoute,
    private router: Router) {


  }

  ngOnInit(): void {
    // 驗證是否登入了
    if (!this.authService.checkCredentials()) {
      this.openModal('custom-modal-loginError');
      return;
    }
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      // +params['id'] : (+)  converts string 'id' to a number
      // 但這裡id是string

      this.GetAndFillNote();
    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  public async GetAndFillNote() {
    await this.authService.checkRefreshToken();
    this.notesService.GetNoteById(this.id).subscribe(
      data => {
        console.log(data);
        this.note = data;
      },
      failed => {
        console.log(failed);
      }
    );
  }

  public RemoveArticle() {
    this.notesService.DeleteNote(this.id).subscribe(
      data => {
        console.log(data);
        if (data.returnMsgNo == 1) {
          this.GetAndFillNote();
        }
        else {
          alert(data.returnMsg);
        }
      },
      failed => {
        console.log(failed);
      },
      () => {
        this.closeModal('custom-modal-delete');
        this.router.navigate(['/notes']);
      }
    );
  }

  // 開啟/關閉 Model
  public openModal(id: string) {
    this.modalService.open(id);
  }
  public closeModal(id: string) {
    this.modalService.close(id);
  }
}
