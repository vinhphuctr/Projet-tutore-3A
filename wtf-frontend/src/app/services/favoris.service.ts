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

 
}
