import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Serie } from '../modeles/serie';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class SerieService {

  constructor(private _httpClient : HttpClient) {
  }
  getSerie(id: number): Observable<Serie> {

    let url = "https://wtf-api-v1.herokuapp.com/api/series/" + id;
    this._httpClient.get<Serie>(url).subscribe(res => {
     console.log(res)
  });
    return this._httpClient.get<Serie>(url);
  }
}
