import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Serie } from '../modeles/serie';
import { Observable } from 'rxjs';
import { connexionService } from './connexion.service';
import { map, filter } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class SerieService {

  constructor(private _httpClient: HttpClient, private _connexionService: connexionService) {
  }
  getSerie(id: number): Observable<Serie> {
    let url = "https://wtf-api-v1.herokuapp.com/api/series/" + id;
    return this._httpClient.get<Serie>(url)
      .pipe(map(res => {
        for (let saison of res.saisons) {
         saison.rates = saison.rates.filter(rate => {
            return rate.user === this._connexionService.getCurrentUser().id;
          })
        }
        console.log(res);

        return res
      }));
  }
}
