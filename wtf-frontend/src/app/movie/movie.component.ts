import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Video } from '../modeles/video';
import { Utilisateur } from '../modeles/utilisateur';
import {MovieService} from '../services/movie.service';
import { connexionService } from '../services/connexion.service';
import { FavorisService } from '../services/favoris.service';
import { isNull } from '@angular/compiler/src/output/output_ast';

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

  constructor(
    private route: ActivatedRoute,
    private _location: Location,
    private _movieService: MovieService,
    private connexionService: connexionService,
    private FavorisService: FavorisService
  ) {
  }

  ngOnInit(): void {
    this.getMovie();
    this.UtilisateurData = this.connexionService.getUser();
  }

  ngAfterViewInit()	: void{
    if(this.video.trailer !== "null"){
      this.isTrailer = true;
    }
    const id = +this.route.snapshot.paramMap.get('id');
    this.checkIfFav(id);
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
    this.showHide();
  }

  redirectUrl(trailer){
    window.open(trailer);
  }

  checkIfFav(item){
      if(this.FavorisService.checkIfFav(item) == true){
        console.log("passé");
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
}

