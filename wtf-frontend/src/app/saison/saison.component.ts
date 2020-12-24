import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Serie } from '../modeles/serie';
import { Utilisateur } from '../modeles/utilisateur';
import { SerieService } from '../services/serie.service';
import { FavorisService } from '../services/favoris.service';
import { UtilisateurService } from '../services/utilisateur.service';
import { Note } from '../modeles/note';
import { MinuteSecondsPipe } from '../helpers/MinuteSecondsPipe';
import { RatingService } from '../services/rating-service.service';

import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-saison',
  templateUrl: './saison.component.html',
  styleUrls: ['./saison.component.css']
})
export class SaisonComponent implements OnInit {

  ratingValue: number = 3;
  serie: Serie;
  UtilisateurData: Utilisateur;
  isTrailer: boolean = false;
  starVisible: boolean = true;
  id: number;
  time: string;
  actualRating: Note;
  saison: number; 

  constructor(private route: ActivatedRoute,
    private _location: Location,
    private _serieService: SerieService,
    private FavorisService: FavorisService,
    private utilisateurService: UtilisateurService, private _ratingService: RatingService) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.saison = +this.route.snapshot.paramMap.get('saison');
  this._serieService.getSerie(this.id).subscribe((serie: Serie) => {
  this.getSerie();

      this.serie = serie;

      this.UtilisateurData = this.utilisateurService.getUser();

      if (this.serie.rates.length === 0) {

        this.actualRating = {

          id: null,

          user: 1,

          note: 0,

          film: this.serie.id_serie // voir avec alexis, pas encore implémenter
        }

      } else {

        this.actualRating = this.serie.rates[0];

  }

  });

  

   

    console.log("wang yi bo" + this.getSerie()); 





  }

  ngOnChanges(): void {
    if (this.serie.trailer !== "null") {
      this.isTrailer = true;
    }
  }


 /* ngAfterViewChecked(): void {
    this.checkIfFav(this.id);
    this.formatLabel(Number(this.serie.duree));
  }*/


  getSerie(): void {
    this._serieService.getSerie(this.id)
      .subscribe(serie => this.serie = serie);
  }

  goBack(): void {
    this._location.back();
  }

  postRate(event, item) {
    this.actualRating.film = this.serie.id_serie;
    console.log(item);
    if (this.actualRating.id == null) {
      this.showHide();
      this._ratingService.postRating(this.actualRating).subscribe(rate => {
      });
    } else {
      this._ratingService.putRating(this.actualRating).subscribe(rate => {
        rate.film = this.serie.id_serie;
      })
    }
  }

  redirectUrl(trailer) {
    window.open(trailer);
  }

  checkIfFav(item) {
    if (this.FavorisService.checkIfFav(item) == true) {
      let s = "fav_" + item;
      document.getElementById(s).style.color = "red";
    }
  }

  addFav(item) {
    console.log(item);
    let s = "fav_" + item;
    console.log(s);
    if (document.getElementById(s).style.color == "red") {
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
    if (value < 60) {
      this.time = value + "min"
    }
    if (value % 60 == 0) {
      this.time = value / 60 + "h"
    }
    this.time = (value / 60).toFixed(1).slice(0, 1) + "h" + value % 60 + "min"
  }

}
