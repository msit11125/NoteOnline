import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from "../../environments/environment";


@Injectable()
export class TypesService {

  constructor(private http: Http) { }

  // 取得分類List
  public GetArticleTypes() {
    return this.http.get(environment.apiServer + "/api/typesapi")
      .map(res => res.json());
  }

}
