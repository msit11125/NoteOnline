import { Component, OnInit } from '@angular/core';
import { VocabularyService } from "../../services/vocabulary.service";
import { AuthenticationService } from "../../services/authentication.service";
import { ModalService } from "../../services/modal.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  constructor(private vocabularyService: VocabularyService,
              private authenticationService: AuthenticationService,
              private modalService: ModalService,
              private _router: Router)
  {
    // 驗證是否登入了
    if (!authenticationService.checkCredentials())
    {
      this.openModal('custom-modal-loginError');
    };



  }

  ngOnInit() {
  }


  // 開啟 Model
  openModal(id: string) {
    this.modalService.open(id);
  }

}
