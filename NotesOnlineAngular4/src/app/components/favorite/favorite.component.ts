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

  private searchWord: string; // 欲搜尋的單字
  private totalRows: number;
  private currentPageNumber: number = 1;
  private totalPages: number;
  private pageSize: number = 10;
  private sortDirection: string;
  private sortExpression: string;
  private pageArr: number[] = [] ; // 頁數陣列 1 2 3 ...
  private vocabularyList: Vocabulary[];

  private imgPath: string = "./assets/images/DoubleRing.gif"; // 取得圖片相對路徑
  private searching: boolean = true; // 搜尋中Spinner
  private FullHtml: string = ""; // 單字詳細內容

  constructor
      (private vocabularyService: VocabularyService,
       private _authservice: AuthenticationService,
       private modalService: ModalService,
       private _router: Router) {


    // 驗證是否登入了
    if (!_authservice.checkCredentials()) {
      this.openModal('custom-modal-loginError');
      return;
    }


    this.GetPageConditions();
  }

  ngOnInit() {
  }

  //更換頁面
  public BtnChangePage(currentPage: number) {
    this.currentPageNumber = currentPage;
    this.GetPageConditions();
  }
  //上下頁面
  public BtnPageControl(mode: string) {
    switch (mode) {
      case "pre":
        if (this.currentPageNumber > 1)
          this.currentPageNumber -= 1;
          this.GetPageConditions();
        break;
      case "next":
        if (this.currentPageNumber < this.totalPages)
          this.currentPageNumber += 1;
          this.GetPageConditions();
        break;
    }
  }


  // 取得頁面查詢後DATA
  public async GetPageConditions()
  {
    // 檢查是否需refreshToken
    await this._authservice.checkRefreshToken();

    this.searching = true;
    //取得頁面查詢資訊 (POST前置動作)
    let vocabularyVM = new VocabularyVM();
    vocabularyVM.SearchWord = this.searchWord;
    vocabularyVM.PageSize = this.pageSize;
    vocabularyVM.SortDirection = this.sortDirection;
    vocabularyVM.SortExpression = this.sortExpression;
    vocabularyVM.CurrentPageNumber = this.currentPageNumber;

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
      },
      failed => {
        //獲取錯誤
        console.log(failed);
        this.searching = false;
      },
      () => {
        this.searching = false; // complete subscribe
      }
    );
  }




  // 按下詳細
  public MoreDetail(word: string) {
    // 找到單字的全文
    console.log(word);
    this.FullHtml = this.vocabularyList.find(v => v.Word == word).FullHtml;

    this.openModal("custom-modal-detail");
  }

  // 按下搜尋
  public FilterWord() {
    
    if (this.searchWord !== undefined) {
      this.GetPageConditions();
      console.log(this.searchWord + " search done.");
    }
  }

  // 刪除單字方法
  private rmWordSn: number = 0; // 準備移除的wordSn
  private rmWord: string = ""; // 準備移除的word
  public RemoveWord(mode: string, wordSn: number, word: string) {
    switch (mode) {
      case "set":
        this.rmWordSn = wordSn;
        this.rmWord = word;
        break;
      case "remove":
        // 檢查是否需refreshToken
        this._authservice.checkRefreshToken();

        this.vocabularyService.RemoveVocabulary(this.rmWordSn).subscribe(
          data => {
            // 回傳結果
            var returnMsgNo = data.returnMsgNo;
            if (returnMsgNo != 1)
              alert(data.returnMsg);
            else
              this.GetPageConditions(); // 刷新Page
          },
          failed => {
            //獲取錯誤
            console.log(failed);
            alert(failed);
          },
          () => this.closeModal('custom-modal-delete')
        );
        break;
    }
  }

  // 開啟/關閉 Model
  public openModal(id: string) {
    this.modalService.open(id);
  }
  public closeModal(id: string) {
    this.modalService.close(id);
  }
}
