import { Component, OnInit } from '@angular/core';
import { VocabularyService, Vocabulary, VocabularyVM } from "../../services/vocabulary.service";
import { AuthenticationService } from "../../services/authentication.service";
import { ModalService } from "../../services/modal.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  private searchWord: string;
  private totalRows: number;
  private currentPageNumber: number = 1;
  private totalPages: number;
  private pageSize: number = 10;
  private sortDirection: string;
  private sortExpression: string;
  private pageArr: number[] = [] ; // 頁數陣列 1 2 3 ...
  private vocabularyList: Vocabulary[];

  private imgPath: string = "./assets/images/DoubleRing.gif"; // 取得圖片相對路徑
  private searching: boolean = true; // 搜尋中

  constructor
      (private vocabularyService: VocabularyService,
       private authenticationService: AuthenticationService,
       private modalService: ModalService,
       private _router: Router) {


    // 驗證是否登入了
    if (!authenticationService.checkCredentials()) {
      this.openModal('custom-modal-loginError');
      return;
    }


    this.GetPageConditions();
  }

  ngOnInit() {
  }

  //更換頁面
  private BtnChangePage(currentPage: number) {
    this.currentPageNumber = currentPage;
    this.GetPageConditions();
  }



  // 取得頁面查詢後DATA
  private GetPageConditions()
  {
    this.searching = true;
    //取得頁面查詢資訊 (POST前置動作)
    let vocabularyVM = new VocabularyVM();
    vocabularyVM.searchWord = this.searchWord;
    vocabularyVM.pageSize = this.pageSize;
    vocabularyVM.sortDirection = this.sortDirection;
    vocabularyVM.sortExpression = this.sortExpression;
    vocabularyVM.currentPageNumber = this.currentPageNumber;

    // 查詢user的單字列表
    this.vocabularyService.GetVocabularyList(vocabularyVM).subscribe(
      data => {
        // 回傳結果
        this.vocabularyList = data.VocabularyList;
        this.currentPageNumber = data.CurrentPageNumber;
        this.totalPages = data.TotalPages;

        this.pageArr = [];
        for (var i = 1; i <= this.totalPages; i++) {
          this.pageArr.push(i);
        }
        console.log(this.vocabularyList);
      },
      failed => {
        //獲取錯誤
        console.log(failed);
        if (failed === 'Unauthorized') {
          // 是401錯誤就更新Token
          this.authenticationService.refreshToken().subscribe(
            data => {
              if (data) {
                this.GetPageConditions();
                console.log("refresh token done.");
              } 
            },
            err => {
              console.log(err);
              //過久未登入 => 登出
              this.authenticationService.logout();
              window.location.reload();
            });
        }
        else {
          alert("查詢單字列表發生錯誤");

        }
      },
      () => {
        this.searching = false; // complete subscribe
      }
    );
  }

  // 開啟 Model
  openModal(id: string) {
    this.modalService.open(id);
  }

}
