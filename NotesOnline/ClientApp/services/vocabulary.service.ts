import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

export class Vocabulary {
    constructor(
        public word: string)
    { }
}


@Injectable()
export class VocabularyService {

    constructor(
        private _router: Router, private http: Http) { }

    //翻譯
    Translation(vocabulary: Vocabulary) {
        let headers = new Headers(
            {
                //'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                //'Content-Type': 'application/json'
            }
        );

        return this.http.get("/api/vocabularyapi?word=" + vocabulary.word, { headers: headers })
            .map(res => res.json());
    }



}