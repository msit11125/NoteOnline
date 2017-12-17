import { Component, Pipe, PipeTransform } from '@angular/core';
import { Router } from "@angular/router";
import { VocabularyService, Vocabulary } from "../../services/vocabulary.service";

import { DomSanitizer } from '@angular/platform-browser'
import { AuthenticationService } from "../../services/authentication.service";



@Component({
    selector: 'vocabulary',
    templateUrl: './ClientApp/components/vocabulary/vocabulary.component.html',
    styleUrls: [ './ClientApp/components/vocabulary/vocabulary.component.css' ]

})
export class VocabularyComponent {

    historyWords: string[]; // 以前的搜尋
    word: string;
    fullHtml: string = "<span>搜尋結果會顯示在這裡。</span>"; // Html翻譯全文
    chineseDefins: string[]; // 中文解釋 (n.或v. ...)
    imgPath: string ="../../../Content/images/DoubleRing.gif"; // 取得圖片相對路徑
    searching: boolean = false; // 搜尋中
    hasAdd: boolean = false; // 已加到最愛


    constructor(private _service: VocabularyService,
                private _authservice: AuthenticationService) {
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
        this.searching = true;
        this.chineseDefins = null;

        let vocabulary: Vocabulary = {
            "word" : this.word
        }

        // 翻譯
        this._service.Translation(vocabulary).subscribe(
            data => {
                // 回傳 html 結果
                this.fullHtml = data.FullHtml;
                this.chineseDefins = data.ChineseDefin; //中文顯示
                // 加到歷史搜尋
                if (!this.historyWords.includes(vocabulary.word)) { //判斷不重複
                    // 歷史超過10筆 取出最左邊的單字 (注意array為初始化時候的判斷)
                    if (typeof this.historyWords !== 'undefined' && this.historyWords.length > 9) {
                        this.historyWords.shift(); // 取陣列最左
                    }
                    this.historyWords.push(vocabulary.word); //加入新搜尋的單字
                }
                localStorage.setItem("historyWords", JSON.stringify(this.historyWords)); //儲存到localStorage

                this.searching = false;
            },
            failed => {
                //獲取錯誤
                console.log(failed.json());
                this.fullHtml = "搜尋不到任何結果。";
                this.searching = false;
            }
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
        if (this._authservice.checkCredentials()) {
            //有結果才加入
            if (this.chineseDefins) { 
                this.hasAdd = !this.hasAdd;
            } else {
                alert("無此單字!");
            }
        }
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
