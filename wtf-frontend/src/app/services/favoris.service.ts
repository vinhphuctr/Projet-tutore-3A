import { Injectable } from '@angular/core';
import { FAVORIS } from '../mockFavoris';

@Injectable({
  providedIn: 'root'
})
export class FavorisService {

  constructor() { }


  getFavoris() {
    return FAVORIS;
  }

  deleteFavoris(item : any, utilisateur : any){
    // Delete to database
  }

  addFavoris(item : any, utilisateur : any){
    // Add to database
  }

  checkIfFav(item : any) : boolean{
    let i = 0;
    FAVORIS.forEach(element => {
      if(element.id_video == item){
        i++;
      }
    });
    if(i > 0) return true; else return false;
  }
}
