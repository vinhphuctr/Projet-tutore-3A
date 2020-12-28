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

  totalNotes: Array<number> = [];
  nbrNotes: Array<number> = [];






  constructor(private _httpClient: HttpClient, private _connexionService: connexionService) {
  }
  getSerie(id: number): Observable<Serie> {
    let url = "https://wtf-api-v1.herokuapp.com/api/series/" + id;
    return this._httpClient.get<Serie>(url)
      .pipe(map(res => {
        for (let saison of res.saisons) {
          saison.rates = saison.rates.filter(rate => {
            if(this.totalNotes[saison.id_saison] == null){
              this.totalNotes[saison.id_saison] = rate.note;
            }
            else this.totalNotes[saison.id_saison] += rate.note;

            if(this.nbrNotes[saison.id_saison] == null){
              this.nbrNotes[saison.id_saison] = 1;
            }
            else {
              this.nbrNotes[saison.id_saison] += 1;
            }
            return rate.user === this._connexionService.getCurrentUser().id;
          })
        }
        console.log(this.nbrNotes);
        console.log(this.totalNotes);
        console.log(res);
        return res
      }));
  }


  getTotalNotes(id_saison : number) {
    return this.totalNotes[id_saison];
  }

  getnbrNotes(id_saison : number) {
    return this.nbrNotes[id_saison];
  }



}
