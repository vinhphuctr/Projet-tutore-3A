import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Video } from '../modeles/video';
import { Utilisateur } from '../modeles/utilisateur';
import {MovieService} from '../services/movie.service';
import { FavorisService } from '../services/favoris.service';
import { NoteFilm } from '../modeles/note';
import { RatingService } from '../services/rating-service.service';
import { connexionService } from '../services/connexion.service';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit {

  video : Video;
  isTrailer : boolean = false;
  starVisible : boolean = true;
  id : number;
  time: string;
  actualRating: NoteFilm;
  UtilisateurData: Utilisateur;
  moyenneRating : number;

  constructor(
    private route: ActivatedRoute,
    private _location: Location,
    private _movieService: MovieService,
    private FavorisService: FavorisService,
    private _ratingService: RatingService,
    private authService: connexionService
  ) {
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this._movieService.getMovie(this.id).subscribe((video: Video) => {
      this.video = video;
      if (this.video.rates.length === 0) {
        this.actualRating = {
          id: null,
          user: this.authService.getCurrentUser().id,
          note: 0,
          film: this.video.id_video
        }
      } else {
        this.actualRating = this.video.rates[0];
      }
      this.moyenneRating = this._movieService.getTotalNotes() / this._movieService.getnbrNotes();
    });
  }

  ngOnChanges() : void{
    if(this.video.trailer !== "null"){
      this.isTrailer = true;
    }
  }


  /*ngAfterViewChecked(): void{
    this.checkIfFav(this.id);
    this.formatLabel(Number(this.video.duree));
  }*/


  /*getMovie():void{
      this._movieService.getMovie(this.id)
        .subscribe(video => this.video = video);
    }*/

  goBack(): void {
    this._location.back();
  }

  postRate(event, item) {
    this.actualRating.film = this.video.id_video;
    if (this.actualRating.id == null) {
      this._ratingService.postRating(this.actualRating).subscribe(rate => {
      });
    } else {
      this._ratingService.putRating(this.actualRating).subscribe(rate => {
        rate.film = this.video.id_video;
      })
    }
  }

  redirectUrl(trailer){
    window.open(trailer);
  }

  checkIfFav(item){
      if(this.FavorisService.checkIfFav(item) == true){
        let s = "fav_" + item;
        document.getElementById(s).style.color = "red";
      }
  }

  addFav(item){
    console.log(item);
    let s = "fav_" + item;
    console.log(s);
    if(document.getElementById(s).style.color == "red") {
      document.getElementById(s).style.color = "white";
      this.FavorisService.deleteFavoris(item, this.UtilisateurData);
    }
    else {
      document.getElementById(s).style.color = "red";
      this.FavorisService.addFavoris(item, this.UtilisateurData);
      // On ajoute cette video de la BD Favoris
    }
  }

  showHide() {
    this.starVisible = !this.starVisible;
  }

  formatLabel(value: number) {
    if (value < 60){
      this.time = value + "min"
    }
    if(value % 60 == 0){
    this.time = value / 60 + "h"
    }
    this.time = (value / 60).toFixed(1).slice(0,1)+ "h" + value % 60 + "min"
  }
}

