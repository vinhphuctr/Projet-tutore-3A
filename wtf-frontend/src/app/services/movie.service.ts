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

  constructor(private _httpClient: HttpClient, private _connexionService: connexionService) { }

  getMovie(id: number): Observable<Video> {

    let url = "https://wtf-api-v1.herokuapp.com//films/" + id.toString();
    return this._httpClient.get<Video>(url)
      .pipe(map(res => {
        res.rates = res.rates.filter(rate => {
          return rate.user === this._connexionService.getCurrentUser().id;
        })
        return res
      }));
  }
}
