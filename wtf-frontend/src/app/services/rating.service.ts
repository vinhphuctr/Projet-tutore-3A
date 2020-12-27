import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Video } from '../modeles/video';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { filter } from 'rxjs/operators';
import { Note } from '../modeles/note';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private _httpClient: HttpClient) { }


  getUserRating(video: Video){
    var id_user = localStorage.getItem('id');
    var num = Number(id_user);
    var julie = [];

    video.rates.filter(rate => {
      if (rate.user == num) {
       julie.push(rate);
        console.log(rate);
      // return rate;
      }
    })
  //  console.log('julie');
    return julie;

  }

  getFilm(id: number): Observable<Video> {

    var id_user = localStorage.getItem('id'); // get the id_user from the localStorage

    let url = "https://wtf-api-v1.herokuapp.com/api/films/" + id;

    this._httpClient.get<Video>(url)
      .pipe(
        map(res => res), // Don't forget to add this!
        filter(res => res.rates['user'] === id_user)

    )
    return this._httpClient.get<Video>(url);
 }
}


/*this.data.getArticles().pipe(
  map(
    (articles: Article[]) => articles.filter(
      (article: Article) => article.author === 'John Doe'
    )
  )
).subscribe(
  (articles: Article[]) => {
    this.articles = articles;
  }
);*/
