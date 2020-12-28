import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Serie } from '../modeles/serie';
import { Video } from '../modeles/video';



@Injectable({
  providedIn: 'root'
})
export class SuggestionService {


  constructor(private _httpClient : HttpClient) { }

  getSuggestions(){
    /*
    let url = "http://wtfilm-api.herokuapp.com/api/video/get/all/";
    let result = this._httpClient.get<any>(url);
    console.log(result);
    */
  }




  rechercheRapide(keyword: string): Observable<Video[]> {

   let url = "https://wtf-api-v1.herokuapp.com/api/films?titre=" + keyword;
   return this._httpClient.get<Video[]>(url);
  }
}
