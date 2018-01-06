import { Component, Pipe, PipeTransform } from '@angular/core';
import { Router } from "@angular/router";
import { VocabularyService, Vocabulary } from "../../services/vocabulary.service";

import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from "../../services/authentication.service";
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'vocabulary',
  templateUrl: './vocabulary.component.html',
  styleUrls: ['./vocabulary.component.css']

})
export class VocabularyComponent {
  loading: boolean = false; // Spinner
  historyWords: string[]; // 以前的搜尋
  word: string;
  fullHtml: string = "<span>搜尋結果會顯示在這裡。</span>"; // Html翻譯全文
  chineseDefins: string[]; // 中文解釋 (n.或v. ...)
  imgPath: string = "./assets/images/DoubleRing.gif" ; // 取得圖片相對路徑
  searching: boolean = false; // 搜尋中
  hasAdd: boolean = false; // 已加到最愛
  saveStatusText: string = "儲存成功!"; //儲存狀態

  constructor(private _service: VocabularyService,
    private _authservice: AuthenticationService,
    private modalService: ModalService
  ) {
    let historyArr = JSON.parse(localStorage.getItem("historyWords")); // 取出localStorage內的歷史搜尋的單字
    if (historyArr != null) {
      this.historyWords = historyArr;
    }
    else {
      this.historyWords = [];
    }
  }

  //搜尋單字
  btnSearch() {
    this.hasAdd = false; // 改變圖示
    // 驗證不為空
    if (typeof this.word == 'undefined' || this.word == '') {
      console.log('查詢不可為空');
      return;
    }

    this.searching = true;
    this.chineseDefins;


    // 翻譯
    this._service.Translation(this.word).subscribe(
      data => {
        // 回傳 html 結果
        this.fullHtml = data.FullHtml;
        this.chineseDefins = data.ChineseDefin; //中文顯示
        // 加到歷史搜尋
        if (!this.historyWords.includes(this.word)) { //判斷不重複
          // 歷史超過10筆 取出最左邊的單字 (注意array為初始化時候的判斷)
          if (typeof this.historyWords !== 'undefined' && this.historyWords.length > 9) {
            this.historyWords.shift(); // 取陣列最左
          }
          this.historyWords.push(this.word); //加入新搜尋的單字
        }
        localStorage.setItem("historyWords", JSON.stringify(this.historyWords)); //儲存到localStorage

      },
      failed => {
        //獲取錯誤
        console.log(failed.json());
        this.fullHtml = "搜尋不到任何結果。";
        
      },
      () => this.searching = false
    );
  }

  //搜尋單字(按下Enter鍵)
  pressEnterKey(event) {
    if (event.keyCode == 13) {
      this.btnSearch();
    }
  }

  //按下單字Tag
  wordTagSearch(tagWord) {
    this.word = tagWord;
    this.btnSearch();
  }

  //加到最愛
  addFavorite() {
    // 檢查登入狀態
    if (!this._authservice.checkCredentials()) {
      this.openModal('custom-modal-loginError'); // 這個在app.component.html
      return null;
    }
    //有結果才加入
    if (this.chineseDefins) {
      this.loading = true;
      // 組合成單字物件
      let vocabulary: Vocabulary = {
        "WordSn": null,
        "Word": this.word,
        "FullHtml": this.fullHtml,
        "ChineseDefin": this.chineseDefins
      };

      this._service.SaveVocabulary(vocabulary).subscribe(
        data => {
          // 回傳 html 結果
          var returnMsgNo = data.returnMsgNo;
          var returnMsg = data.returnMsg;
          if (returnMsgNo == 1) {
            this.hasAdd = !this.hasAdd; // 改變圖示
            this.saveStatusText = "儲存成功!";
          }
          else
            this.saveStatusText = returnMsg;

          this.openModal('custom-modal-savesuccess'); // 這個在此vocabulary.component.html
        },
        failed => {
          //獲取錯誤
          console.log(failed);
          // 是401錯誤就更新Token
          if (failed === 'Unauthorized') {
            this._authservice.refreshToken().subscribe(
              data => {
                if (data) {
                  console.log("refresh token done.");
                  this.addFavorite(); //重新再做一次
                }
              },
              err => {
                console.log(err);
                //過久未登入 => 登出
                this._authservice.logout();
                window.location.reload();
              });
          }
          else {
            alert("儲存單字時發生錯誤");
          }
        },
        () => this.loading = false
      );

    } else {
      alert("無此單字!");
    }

  }



  // 開啟及關閉 Model
  openModal(id: string) {
    this.modalService.open(id);
  }
  closeModal(id: string) {
    this.modalService.close(id);
  }
}



// ---- 建立safeHtml管道 (Pipe) ----
//      :使Server傳回的Html驗證安全性
@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) { }
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}
