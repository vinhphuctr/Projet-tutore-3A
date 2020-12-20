import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Video } from '../modeles/video';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private _httpClient : HttpClient) { }

  getMovie(id: number): Observable<Video> {

    let url = "https://wtf-api-v1.herokuapp.com/api/films/" + id;
    this._httpClient.get<Video>(url).subscribe(res => {
     console.log(res)
  });
    return this._httpClient.get<Video>(url);
  }
}
