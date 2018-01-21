import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from "../../environments/environment";
import { Note } from "../models/Note";


@Injectable()
export class NotesService {

  constructor(private http: Http) { }

  public GetNotes() {
    let headers = new Headers(
      {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
      }
    );

    return this.http.get(environment.apiServer + "/api/notesapi", { headers: headers })
      .map(res => res.json());
  }

  public GetNoteById(noteId: string) {
    let headers = new Headers(
      {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
      }
    );
    return this.http.get(environment.apiServer + "/api/notesapi?noteId=" + noteId, { headers: headers })
      .map(res => res.json());
  }

  public AddNote(note: Note) {
    let headers = new Headers(
      {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
      }
    );

    return this.http.post(environment.apiServer + "/api/notesapi", JSON.stringify(note), { headers: headers })
      .map(res => res.json());
  }

  public DeleteNote(noteId: string) {
    let headers = new Headers(
      {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
      }
    );
    return this.http.delete(environment.apiServer + "/api/notesapi?noteId=" + noteId, { headers: headers })
      .map(res => res.json());
  }


  public async UploadFile(file: File): Promise<string> {
      let formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      let headers = new Headers()
      headers.append('Authorization', 'Bearer ' + localStorage.getItem('access_token'));  
      let options = new RequestOptions({ headers: headers });
      let res = await this.http.post(environment.apiServer + "/api/uploadfile", formData, options)
        .toPromise();

      return res.text();
  }

}
