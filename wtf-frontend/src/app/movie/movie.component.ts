import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Video } from '../modeles/video';
import {MovieService} from '../services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  ratingValue: number = 3;
  video : Video;
  constructor(
    private route: ActivatedRoute,
    private _location: Location,
    private _movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.getMovie();
  }
  getMovie():void{
      const id = +this.route.snapshot.paramMap.get('id');
      this._movieService.getMovie(id)
        .subscribe(video => this.video = video);
    }

  goBack(): void {
    this._location.back();
  }

  postRate(event, item) {
    console.log(event.value);
    console.log(item);
    this.showHide(item.id_video);
  }

  redirectUrl(trailer){
    window.open(trailer);
  }

  showHide(modRef) {

    if (document.getElementById(modRef).style.visibility=="hidden")
      {
        // Contenu caché, le montrer
        document.getElementById(modRef).style.visibility = "visible";
      }
      else
      {
        // Contenu visible, le cacher
        document.getElementById(modRef).style.visibility = "hidden";
      }

}

}
