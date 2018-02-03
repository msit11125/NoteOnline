import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TypesService } from "../../services/types-service";
import { ArticleType } from "../../models/Type";
import { Note } from "../../models/Note";
import { NotesService } from "../../services/notes-service";
import { ModalService } from "../../services/modal.service";
import { AuthenticationService } from "../../services/authentication.service";
import { Router } from "@angular/router";

//宣告可使用JQuery
//import $ from "jquery";
declare var $: any;
declare var CKEDITOR: any;

@Component({
  selector: 'notes-create',
  templateUrl: './notes-create.component.html',
  styleUrls: ['./notes-create.component.css']
})
export class NotesCreateComponent implements OnInit, AfterViewInit {

  saveStatusText: string = "";
  loading: boolean = false; // Spinner
  articleType: ArticleType[];
  note: Note = new Note();

  noteForm: FormGroup;

  constructor(private elementRef: ElementRef,
    private typesService: TypesService,
    private notesService: NotesService,
    private modalService: ModalService,
    private authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder) {
    // 自訂表單驗證
    this.noteForm = fb.group(
      {
        'noteTitle': ['', [Validators.required, Validators.maxLength(50)]],
        'articleType': ['', Validators.required],
      })

  }

  ngOnInit(): void {
    // 驗證是否登入了
    if (!this.authService.checkCredentials()) {
      this.openModal('custom-modal-loginError');
      return;
    }

    this.typesService.GetArticleTypes().subscribe(
      data => {
        this.articleType = data;
      },
      failed => {
        console.log(failed);
      }
    )
  }

  ngAfterViewInit() {
    //產生ckEditor
    var config = {
      language: 'zh',
      uiColor: '#DDDDDD',
      toolbar: [
        ['Source', '-', 'NewPage', 'Save', 'Preview', '-', 'Templates'],
        ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Print', 'SpellChecker', 'Scayt'],
        ['Undo', 'Redo', '-', 'Find', 'Replace', '-', 'SelectAll', 'RemoveFormat'],
        '/',
        ['Bold', 'Italic', 'Underline', 'Strike', '-', 'Subscript', 'Superscript'],
        ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', 'Blockquote'],
        ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
        ['Link', 'Unlink', 'Anchor'],
        ['Image', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak'],
        '/',
        ['Styles', 'Format', 'Font', 'FontSize'],
        ['TextColor', 'BGColor'],
        ['Maximize', 'ShowBlock']
      ]
    }
    CKEDITOR.replace('editor1', config);
    //ckeditor change事件
    for (var i in CKEDITOR.instances) {
      CKEDITOR.instances[i].on('change', function () {
        var htmlText = CKEDITOR.instances.editor1.getData();
        document.getElementsByName('displayCK')[0].innerHTML = htmlText;
      });
    }


  }

  private expand: boolean = false;
  public ExpandAndCollapse() {
    this.expand = !this.expand;
  }

  private step: number = 1;
  public GoToStep(stepNum: number) {
    this.step = stepNum;
  }

  // 選擇圖片
  public ChangeFile(event): void {
    // 更換圖片
    var fileImg = event.target;
    if (fileImg.files && fileImg.files[0]) {
      var reader = new FileReader();

      reader.addEventListener("load", function () {
        $('#blah').show();
        $('#blah').attr('src', reader.result);
      }, false);
      reader.readAsDataURL(fileImg.files[0]);
    }

    //更換檔案
    let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    let files: FileList = target.files;
    this.note.NotePhotoFile = files[0];
    this.note.NotePhoto = files[0].name;
    console.log(this.note.NotePhotoFile);
  }


  // 加入Tag
  public AddTag() {
    var tag = $("#tagInput").val();
    if (tag != "") {
      this.note.Tags.push(tag);
      $("#tagInput").val(""); // clear tag input
    }
  }
  // 移除Tag
  public removeTag(tag: string) {
    if (this.note.Tags.includes(tag)) {
      var index = this.note.Tags.indexOf(tag, 0);
      if (index > -1) {
        this.note.Tags.splice(index, 1);
      }
    }
  }

  // 繳交文章表單
  public async SubmitArticle() {


    this.loading = true;

    console.log(this.note);
    await this.authService.checkRefreshToken();

    //取得ckeditor text
    this.note.Details = CKEDITOR.instances.editor1.getData();


    //上傳檔案
    if (this.note.NotePhotoFile) {
      var newFileName = await this.notesService.UploadFile(this.note.NotePhotoFile);
      this.note.NotePhoto = newFileName; // 更新名稱
    }

    this.notesService.AddNote(this.note).subscribe(
      data => {
        var returnMsgNo = data.returnMsgNo;
        var returnMsg = data.returnMsg;
        if (returnMsgNo == 1) {
          this.saveStatusText = "儲存成功!";
        }
        else
          this.saveStatusText = returnMsg;

        this.openModal('custom-modal-savesuccess');

        this.loading = false; // 結束等待
      },
      failed => {
        console.log(failed.json());

        this.loading = false; // 結束等待
      }
    )
  }

  public ChangeTypeSelect(e) {
    var select = e.target;
    this.note.TypeID = select.value;
  }





  // 開啟及關閉 Model
  openModal(id: string) {
    this.modalService.open(id);
  }
  closeModal(id: string) {
    this.modalService.close(id);
    this.router.navigate(['/notes']);
  }
}
