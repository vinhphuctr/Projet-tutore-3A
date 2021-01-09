import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Serie } from '../modeles/serie';
import { Video } from '../modeles/video';
import { Categorie } from '../modeles/categorie';
import { rechercheAvancee } from '../modeles/rechercheAvancee';
import { rechercheFilm } from '../modeles/rechercheFIlm';
import { rechercheSerie } from '../modeles/rechercheSerie';





@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

  url: string;
  url_serie: string;


  constructor(private _httpClient : HttpClient) { }

  getSuggestions(){
    /*
    let url = "http://wtfilm-api.herokuapp.com/api/video/get/all/";
    let result = this._httpClient.get<any>(url);
    console.log(result);
    */
  }

  rechercheRapide(url: string): Observable<rechercheFilm> {
   return this._httpClient.get<rechercheFilm>(url);
  }

  rechercheRapideSerie(url: string): Observable<rechercheSerie> {
    return this._httpClient.get<rechercheSerie>(url);
   }

  rechercheAvancee(url: string): Observable<rechercheFilm> {
    return this._httpClient.get<rechercheFilm>(url);
   }

   rechercheAvanceeSerie(url: string): Observable<rechercheSerie> {
    return this._httpClient.get<rechercheSerie>(url);
   }

  getAllCategories(): Observable<Categorie> {

    let url = "https://wtf-api-v1.herokuapp.com/api/categories";
    return this._httpClient.get<Categorie>(url);
  }


  rechercheAvancee_Categorie_movies(tab_categorie: Array<number>): Observable<Video> {
    // http://wtf-api-v1.herokuapp.com/api/series?categories=35&categories=12&
    this.url = "https://wtf-api-v1.herokuapp.com/api/films?";

    for (let i = 0; i < tab_categorie.length; i++) {
      this.url += "categories=" + tab_categorie[i] + "&";

    }

    console.log(this.url);

    return this._httpClient.get<Video>(this.url);
  }
  rechercheAvancee_Categorie_series(tab_categorie: Array<any>): Observable<Serie> {

    this.url_serie = "https://wtf-api-v1.herokuapp.com/api/series?";

    for (let i = 0; i < tab_categorie.length; i++) {
      this.url_serie += "categories=" + tab_categorie[i] + "&";

    }
    return this._httpClient.get<Serie>(this.url_serie);
  }


  rechercheAvancee_vo_categories_movies(tab_categorie: Array<any>, tab_vo: Array<any>): Observable<Video> {
    this.url = "https://wtf-api-v1.herokuapp.com/api/films?";

    for (let i = 0; i < tab_categorie.length; i++) {
      this.url += "categories=" + tab_categorie[i] + "&";

    }

    for (let m = 0; m < tab_vo.length; m++) {
      this.url += "vo=" + tab_vo[m] + "&";
    }

    console.log(this.url);

    return this._httpClient.get<Video>(this.url);

  }

  rechercheAvancee_final_1(type: string,tab_categorie: Array<any>, duree: string);
  rechercheAvancee_final_1(type: string,tab_categorie: Array<any>, duree: string, vo: Array<any>);
  rechercheAvancee_final_1(type: string, tab_categorie: Array<any>);
  rechercheAvancee_final_1(type: string, tab_categorie: Array<any>, vo : Array<any>);
  rechercheAvancee_final_1(type: string, tab_categorie: Array<any>, duree?: string | Array<any>, vo?: Array<any> | string) { // an error occurs if we don't specifiate that a type can be changed...
    this.url = "https://wtf-api-v1.herokuapp.com/api/";
    this.url += type;

   // this.url = "https://wtf-api-v1.herokuapp.com/api/films?duree<=" + duree;
    this.url += "?";

    for (let i = 0; i < tab_categorie.length; i++) {
        this.url += "&categories=" + tab_categorie[i] + "";

    }
    if (duree) {
      if (typeof (duree) == 'string') {
        this.url += "&duree<=" + duree;
      }
      if (typeof (duree) == 'object') {
        for (let i = 0; i < duree.length; i++) {
          this.url += "&vo=" + duree[i] + "&";

        }
      }
    }
    if (vo) {
      if (typeof (vo) == 'string') {
        this.url += "&duree<=" + vo;
      }
      if (typeof (vo) == 'object') {
        for (let i = 0; i < vo.length; i++) {
          this.url += "&vo=" + vo[i] + "&";

        }
      }
    }
    console.log(this.url);
    return this.url;
  }
}
