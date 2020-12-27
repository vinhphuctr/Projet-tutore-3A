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
            this.totalNotes[saison.id_saison] = rate.note + this.totalNotes[saison.id_saison];
            this.nbrNotes[saison.id_saison] = 1 + this.nbrNotes[saison.id_saison];

            console.log(typeof (rate.note));
            console.log(typeof (this.totalNotes[saison.id_saison])); 

           // console.log(this.totalNotes[saison.id_saison]);
           // console.log(rate.note);

            

            
            console.log(this.nbrNotes); 
            return rate.user === this._connexionService.getCurrentUser().id;
          })
        }
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
