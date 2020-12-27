import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { connexionService } from './connexion.service';
import { NoteSerie, NoteFilm } from '../modeles/note';


@Injectable({
  providedIn: 'root'
})
export class RatingService {

  urlFilm: string = "https://wtf-api-v1.herokuapp.com/api/films/rating"
  urlSaison: string = "https://wtf-api-v1.herokuapp.com/api/series/saison/rating"
  constructor(private _http: HttpClient, private _authService: connexionService) { }

  postRating(note: NoteFilm) {
    return this._http.post<NoteFilm>(this.urlFilm, note);
  }

  putRating(note: NoteFilm) {
    return this._http.put<NoteFilm>(this.urlFilm + "/" + note.id.toString(), note);
  }

  postRatingSerie(note: NoteSerie) {
    return this._http.post<NoteSerie>(this.urlSaison, note);
  }

  putRatingSerie(note: NoteSerie) {
    return this._http.put<NoteSerie>(this.urlSaison + "/" + note.id.toString(), note);
  }
}
