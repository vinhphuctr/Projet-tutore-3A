import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Video } from '../modeles/video';
import { HttpClient } from '@angular/common/http';
import { connexionService } from './connexion.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  totalNotes : number = 0;
  nbrNotes : number = 0;

  constructor(private _httpClient: HttpClient, private _connexionService: connexionService) { }

  getMovie(id: number): Observable<Video> {

    let url = "https://wtf-api-v1.herokuapp.com/api/films/" + id.toString();
    return this._httpClient.get<Video>(url)
      .pipe(map(res => {
        res.rates = res.rates.filter(rate => {
          this.totalNotes += rate.note;
          this.nbrNotes += 1;
          return rate.user === this._connexionService.getCurrentUser().id;
        })
        return res
      }));
  }

  getTotalNotes(){
    return this.totalNotes;
  }

  getnbrNotes(){
    return this.nbrNotes;
  }


  getAllMovies(): Observable<Video> {
    let url = "https://wtf-api-v1.herokuapp.com/api/films";
    return this._httpClient.get<Video>(url)

  }
}
