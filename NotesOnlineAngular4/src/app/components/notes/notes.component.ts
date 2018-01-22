import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { NotesService } from "../../services/notes-service";
import { Note } from "../../models/Note";
import { AuthenticationService } from "../../services/authentication.service";
import { ModalService } from "../../services/modal.service";

//宣告可使用JQuery
//import $ from "jquery";
declare var $: any;

@Component({
  selector: 'notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit, AfterViewInit {

  private notes: Note[];
  searching: boolean = false; // Spinner
  private imgPath: string = "./assets/images/DoubleRing.gif"; // 取得圖片相對路徑

  constructor(
    private notesService: NotesService,
    private authService: AuthenticationService,
    private modalService: ModalService)
  {

  }

  ngOnInit(): void {
    // 驗證是否登入了
    if (!this.authService.checkCredentials()) {
      this.openModal('custom-modal-loginError');
      return;
    }

    this.GetAndFillNotes();
  }

  async ngAfterViewInit() {

  }

  public async GetAndFillNotes() {
    this.searching = true;
    await this.authService.checkRefreshToken();
    console.log("get note service");
    this.notesService.GetNotes().subscribe(
      data => {
        console.log(data);
        this.notes = data;
        this.searching = false;
      },
      failed => {
        console.log(failed);
        this.searching = false;

      }
    )
  }


  // 開啟/關閉 Model
  public openModal(id: string) {
    this.modalService.open(id);
  }
  public closeModal(id: string) {
    this.modalService.close(id);
  }
}
