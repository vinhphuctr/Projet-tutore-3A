import { Injectable } from '@angular/core';
import { Video } from '../modeles/video';
import { Serie } from '../modeles/serie';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FavorisService {

  tabMesFavorisFilm: any[] = [];
  tabMesFavorisSerie: any[]= [];
  urlFilm: string = "https://wtf-api-v1.herokuapp.com/api/favoris/film"
  urlSerie: string = "https://wtf-api-v1.herokuapp.com/api/favoris/serie"
  constructor(private _http: HttpClient) {
    this.setFavorisFilm();
    this.setFavorisSerie();
   }

  getFavorisFilm() {
    return this.tabMesFavorisFilm;
  }

  setFavorisFilm(){
    this.tabMesFavorisFilm = JSON.parse(localStorage.getItem('films_favoris'));
  }

  getFavorisSerie() {
    return this.tabMesFavorisSerie;
  }

  setFavorisSerie(){
    this.tabMesFavorisSerie = JSON.parse(localStorage.getItem('series_favoris'));
  }

  deleteEnAttendant(item : any){
    let i = 0;
    for(i; i < this.tabMesFavorisFilm.length; i++){
      console.log(i);
      if(this.tabMesFavorisFilm[i].id_video==item){
          this.tabMesFavorisFilm.splice(i,1);
          break;
      }
  }

}
  deleteFavorisFilm(item : any){
    // Delete to database
  }

  addFavorisFilm(item : any){
    console.log(this.getFavorisFilm());
    return this._http.post<Video>(this.urlFilm, {"film" : item}).subscribe(res => {
      console.log(this.tabMesFavorisFilm);
      this.tabMesFavorisFilm.push(res);
      console.log(this.tabMesFavorisFilm);
      localStorage.setItem('films_favoris', JSON.stringify(this.tabMesFavorisFilm));
    });
  }

  addFavorisSerie(item : any){
    return this._http.post<Video>(this.urlSerie, {"serie" : item}).subscribe(res => {
      console.log(res);
    });
  }

  checkIfFavFilm(item : any) : boolean{
    let i = 0;
    this.tabMesFavorisFilm.forEach(element => {
      if(element.film.id_video == item){
        i++;
      }
    });
    if(i > 0) return true; else return false;
  }

  checkIfFavSerie(item : any) : boolean{
    let i = 0;
    this.tabMesFavorisSerie.forEach(element => {
      if(element.serie.id_video == item){
        i++;
      }
    });
    if(i > 0) return true; else return false;
  }
}
