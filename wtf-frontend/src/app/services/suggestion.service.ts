import { Injectable } from '@angular/core';
import { SUGGESTION } from '../mockSuggestion';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

  constructor() { }
  getSuggestions()
  {
    return JSON.stringify(SUGGESTION);
  }
}
