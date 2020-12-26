import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { connexionService } from './connexion.service';
import { Note } from '../modeles/note';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  urlFilm: string = "https://wtf-api-v1.herokuapp.com/api/films/rating"
  urlSaison: string = "https://wtf-api-v1.herokuapp.com/api/series/saison/rating"
  constructor(private _http: HttpClient, private _authService: connexionService) { }

  postRating(note: Note) {
    return this._http.post<Note>(this.urlFilm, note);
  }

  putRating(note: Note) {
    return this._http.put<Note>(this.urlFilm + "/" + note.id.toString(), note);
  }

  postRatingSerie(note: Note) {
    return this._http.post<Note>(this.urlFilm, note);
  }

  putRatingSerie(note: Note) {
    return this._http.put<Note>(this.urlFilm + "/" + note.id.toString(), note);
  }
}
