import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from "../../environments/environment";
import { BaseInfo } from "../models/BaseInfo";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AuthenticationService } from "./authentication.service";

export class Vocabulary {
  public Word: string;
  public FullHtml: string;
  public ChineseDefin: string[];
}

export class VocabularyVM extends BaseInfo {
  public SearchWord: string;
  public VocabularyList: Vocabulary[];
}


@Injectable()
export class VocabularyService {

  constructor(private _router: Router,
              private http: Http) { }

    //翻譯
    public Translation(word: string) {
        
      return this.http.get(environment.apiServer +"/api/vocabularyapi?word=" + word)
            .map(res => res.json());
    }

    //儲存單字
    public SaveVocabulary(vocabulary: Vocabulary) {
      let headers = new Headers(
        {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
          'Content-Type': 'application/json'
        }
      );

      return this.http.post(environment.apiServer + "/api/vocabularyapi", JSON.stringify(vocabulary), { headers: headers })
        .map(res => res.json())
        .catch(e => {
          if (e.status === 401) {
            return Observable.throw('Unauthorized');
          }
        });

    }

    //取得單字List
    public GetVocabularyList(vocabularyVM: VocabularyVM) {
      let headers = new Headers(
        {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
      );
      return this.http.post(environment.apiServer + "/api/vocabularyapi/getfavorite", vocabularyVM, { headers: headers })
        .map(res => res.json())
        .catch(e => {
          if (e.status === 401) {
            return Observable.throw('Unauthorized');
          }
        });
    }
}
