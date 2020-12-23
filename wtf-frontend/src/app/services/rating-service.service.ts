import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { connexionService } from './connexion.service';
import { Note } from '../modeles/note';
import { Header } from 'primeng/api/shared';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  url: string = "https://wtf-api-v1.herokuapp.com/api/films/rating"
  constructor(private _http: HttpClient, private _authService: connexionService) { }

  postRating(note: Note) {
    return this._http.post<Note>(this.url, note);
  }

  putRating(note: Note) {
    return this._http.put<Note>(this.url + "/" + note.id.toString(), note);
  }

}
