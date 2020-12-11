import { Injectable } from '@angular/core';
import { FAVORIS } from '../mockFavoris';
import { Video } from '../modeles/video';


@Injectable({
  providedIn: 'root'
})
export class FavorisService {

  tabMesFavoris: Video[];
  constructor() {
    this.tabMesFavoris = FAVORIS;
   }


  getFavoris() {
    return this.tabMesFavoris;
  }

  deleteEnAttendant(item : any){
    let i = 0;
    for(i; i < this.tabMesFavoris.length; i++){
      console.log(i);
      if(this.tabMesFavoris[i].idVideo==item){
          this.tabMesFavoris.splice(i,1);
          break;
      }
  }

}
  deleteFavoris(item : any, utilisateur : any){
    // Delete to database
  }

  addFavoris(item : any, utilisateur : any){
    // Add to database
  }

  checkIfFav(item : any) : boolean{
    let i = 0;
    this.tabMesFavoris.forEach(element => {
      if(element.idVideo == item){
        i++;
      }
    });
    if(i > 0) return true; else return false;
  }
}
