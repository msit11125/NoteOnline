import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import { ConstantValues } from "../constant-values";

export class Vocabulary {
  public word: string;
  public fullHtml: string;
  public chineseDefin: string[];
}


@Injectable()
export class VocabularyService {

    constructor(
        private _router: Router, private http: Http) { }

    //翻譯
    Translation(word: string) {
        
        return this.http.get( ConstantValues.apiUrl +"/api/vocabularyapi?word=" + word)
            .map(res => res.json());
    }

    //儲存單字
    SaveVocabulary(vocabulary: Vocabulary) {
      let headers = new Headers(
        {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
          'Content-Type': 'application/json'
        }
      );

      return this.http.post(ConstantValues.apiUrl + "/api/vocabularyapi", JSON.stringify(vocabulary), { headers: headers })
        .map(res => res.json());

    }


}
