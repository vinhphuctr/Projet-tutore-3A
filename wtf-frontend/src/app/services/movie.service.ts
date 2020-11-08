import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Video } from '../modeles/video';
import { SUGGESTION } from '../mockSuggestion';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor() { }

  getMovie(id: number): Observable<Video> {
    // TODO: send the message _after_ fetching the hero
    return of(SUGGESTION.find(video => video.id_video === id));
  }
}
