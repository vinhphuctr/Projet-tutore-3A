import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Serie } from '../modeles/serie';
import { Video } from '../modeles/video';
import { rechercheAvancee } from '../modeles/rechercheAvancee';



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

  rechercheAvancee(recherche : rechercheAvancee): Observable<Video[]> {
    let url;
    if(recherche.filmOuSerie == "film"){
      url = "https://wtf-api-v1.herokuapp.com/api/films?";
      if(recherche.duree != null || recherche.duree != undefined){
        url+= '&duree_max=' + recherche.duree;
      }
    }
    else {
      url = "https://wtf-api-v1.herokuapp.com/api/series?";
    }
    if(recherche.titre != null || recherche.titre != undefined){
      url += "&titre=" + recherche.titre;
    }
    if(recherche.vo != null || recherche.titre != undefined){
      url += "&vo=" + recherche.vo;
    }
    return this._httpClient.get<Video[]>(url);
   }
}
