import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Serie } from '../modeles/serie';
import { Utilisateur } from '../modeles/utilisateur';
import { SerieService} from '../services/serie.service';
import { FavorisService } from '../services/favoris.service';
import { UtilisateurService } from '../services/utilisateur.service';
import { NoteSerie } from '../modeles/note';
import { RatingService } from '../services/rating-service.service';
import { connexionService } from '../services/connexion.service';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.css']
})
export class SerieComponent implements OnInit {

  serie : Serie;
  UtilisateurData: Utilisateur;
  isTrailer : boolean = false;
  starVisible : boolean = true;
  id : number;
  time: string;
  maNoteTemporaire: number = 3;
  actualRating : Array<NoteSerie> = [];
  nbrEpisodesTotal: number = 0;
  moyenneRatingBySaison: Array<number> = [];
  totalRating: number = 0;
  moyenneRating: number = 0;



  constructor( private route: ActivatedRoute,
    private _location: Location,
    private _serieService: SerieService,
    private FavorisService: FavorisService,
    private utilisateurService: UtilisateurService,
    private _ratingService: RatingService,
    private authService: connexionService) { }

  ngOnInit(): void {


    this.id = +this.route.snapshot.paramMap.get('id');
    this._serieService.getSerie(this.id).subscribe((serie: Serie) => {

      this.serie = serie;
      let i = 0;

      this.UtilisateurData = this.utilisateurService.getUser();
      for(let saison of this.serie.saisons){
        this.nbrEpisodesTotal += Number(saison.nb_episode);
        if (saison.rates.length === 0) {
          this.actualRating[saison.id_saison] = {
            id: null,
            user: this.authService.getCurrentUser().id,
            note: 0,
            saison: saison.id_saison,
          };
        } else {
          this.actualRating[saison.id_saison] = saison.rates[0];
        }
        this.moyenneRatingBySaison[saison.id_saison] = Number((Number(this._serieService.getTotalNotes(saison.id_saison)) / Number(this._serieService.getnbrNotes(saison.id_saison))).toPrecision(2));
        console.log(this.moyenneRatingBySaison[saison.id_saison]);
        if(this.moyenneRatingBySaison[saison.id_saison]){

          this.totalRating += Number(this.moyenneRatingBySaison[saison.id_saison].toPrecision(2));
          i +=1;
        }
      }
      this.moyenneRating = Number((this.totalRating / i).toPrecision(2));
    });
  }

  ngOnChanges() : void{
    if(this.serie.trailer !== "null"){
      this.isTrailer = true;
    }
  }

/*  ngAfterViewChecked(): void{
    this.checkIfFav(this.id);
    this.formatLabel(Number(this.serie.duree));
  }*/


  getSerie():void{
      this._serieService.getSerie(this.id)
        .subscribe(serie => this.serie = serie);
    }

  goBack(): void {
    this._location.back();
  }

  postRate(event, item) {
    let i = 0;
    this.actualRating[item.id_saison].saison = item.id_saison;
    if (this.actualRating[item.id_saison].id == null) {
      this._ratingService.postRatingSerie(this.actualRating[item.id_saison]).subscribe(rate => {
        this.actualRating[item.id_saison] = rate;
        this._serieService.setNbrNotes(item.id_saison);
        this._serieService.setTotalNotes(rate.note, item.id_saison);
        this.moyenneRatingBySaison[item.id_saison] = Number((Number(this._serieService.getTotalNotes(item.id_saison)) / Number(this._serieService.getnbrNotes(item.id_saison))).toPrecision(2));
        let totalRating = 0;
        for(let saison of this.serie.saisons){
          if(this.moyenneRatingBySaison[saison.id_saison]){
            totalRating += Number(this.moyenneRatingBySaison[saison.id_saison]);
            i+= 1;
          }
        }
        this.moyenneRating = Number((totalRating / i).toPrecision(2));
      });
    } else {
      this._ratingService.putRatingSerie(this.actualRating[item.id_saison]).subscribe(rate => {
      });
    }
  }

  /*
   postRate(event, item) {
    let ancienneNote = this._movieService.getAncienneNote();
    this.actualRating.film = this.video.id_video;
    if (this.actualRating.id == null) {
      this._ratingService.postRating(this.actualRating).subscribe(rate => {
        this.actualRating = rate;
        this.video.rates.push(rate);
        this._movieService.setNbrNotes();
        this._movieService.setTotalNotes(rate.note);
        this.moyenneRating = Number((this._movieService.getTotalNotes() / this._movieService.getnbrNotes()).toPrecision(2));
        this._movieService.setAncienneNote(this.actualRating.note);
      });
    } else {
      this._ratingService.putRating(this.actualRating).subscribe(rate => {
        rate.film = this.video.id_video;
        this.video.rates[0] = rate;
        this._movieService.setTotalNotes(-ancienneNote);
        this._movieService.setTotalNotes(this.actualRating.note);
        this.moyenneRating = Number((this._movieService.getTotalNotes() / this._movieService.getnbrNotes()).toPrecision(2));
      })
      this._movieService.setAncienneNote(this.actualRating.note);
    }
  }*/

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
