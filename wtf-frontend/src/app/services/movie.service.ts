import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Video } from '../modeles/video';
import { HttpClient,HttpHeaders, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private _httpClient : HttpClient) { }

  getMovie(id: number): Observable<Video> {

    let url = "http://wtfilm-api.herokuapp.com/api/video/get/" + id;

    return this._httpClient.get<Video>(url);
  }
}
