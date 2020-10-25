import { Injectable } from '@angular/core';
import { SUGGESTION } from '../mockSuggestion';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

  constructor() { }
  getSuggestions()
  {
    return JSON.stringify(SUGGESTION);
  }

  rechercheRapide(keyword: string) {
    // this.getSuggestions();
    var Films = [];
    for (var unFilm of SUGGESTION) {
      var i = 0;
      var tab = unFilm.titre.split('');
      for (var caract of tab) {
        var nomExtrait = unFilm.titre.substr(i, keyword.length)
        if (nomExtrait.toLowerCase() == keyword.toLowerCase()) {
          Films.push(unFilm);
          break;
        }
        i = i + 1;
      }
    }
    return Films;
  }
}
