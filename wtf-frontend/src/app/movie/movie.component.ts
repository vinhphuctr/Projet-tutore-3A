import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Video } from '../modeles/video';
import { Utilisateur } from '../modeles/utilisateur';
import {MovieService} from '../services/movie.service';
import { FavorisService } from '../services/favoris.service';
import { UtilisateurService } from '../services/utilisateur.service';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  ratingValue: number = 3;
  video : Video;
  UtilisateurData: Utilisateur;
  isTrailer : boolean = false;
  starVisible : boolean = true;
  id : number;
  time : string;

  constructor(
    private route: ActivatedRoute,
    private _location: Location,
    private _movieService: MovieService,
    private FavorisService: FavorisService,
    private utilisateurService : UtilisateurService,
  ) {
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.getMovie();
    this.UtilisateurData = this.utilisateurService.getUser();
  }

  ngOnChanges() : void{
    if(this.video.trailer !== "null"){
      this.isTrailer = true;
    }
  }


  ngAfterViewChecked(): void{
    this.checkIfFav(this.id);
    this.formatLabel(Number(this.video.duree));
  }


  getMovie():void{
      this._movieService.getMovie(this.id)
        .subscribe(video => this.video = video);
    }

  goBack(): void {
    this._location.back();
  }

  postRate(event, item) {
    console.log(event.value);
    console.log(item);
    this.showHide();
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

