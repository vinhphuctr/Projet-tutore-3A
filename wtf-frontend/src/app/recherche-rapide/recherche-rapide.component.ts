import { Component, OnInit, Input} from '@angular/core';
import { SuggestionService } from '../services/suggestion.service';
import { Utilisateur } from '../modeles/utilisateur';
import { Video } from '../modeles/video';
import { Serie } from '../modeles/serie';
import { FavorisService } from '../services/favoris.service';
import { UtilisateurService } from '../services/utilisateur.service';
import { rechercheFilm } from '../modeles/rechercheFIlm';
import { rechercheSerie } from '../modeles/rechercheSerie';



@Component({
  selector: 'app-recherche-rapide',
  templateUrl: './recherche-rapide.component.html',
  styleUrls: ['./recherche-rapide.component.css']
})
export class RechercheRapideComponent implements OnInit {

  ratingValue: number = 3;
  tabFilm : Video[];
  tabSerie : Serie[];
  tabMesFavoris: Video[];
  UtilisateurData: Utilisateur;
  previous : string;
  next : string;
  nbrResultats : Number = 0;
  url : string;
  film: Boolean;

  constructor(private _suggestionService: SuggestionService,private UtilisateurService : UtilisateurService, private FavorisService: FavorisService) {
    this.tabMesFavoris = this.FavorisService.getFavorisFilm();
  }

  ngOnInit(): void {
    this.UtilisateurData = this.UtilisateurService.getUser();
    if(localStorage.getItem('typeDeRecherche') == "rechercheRapide"){
      if(localStorage.getItem('filmOuSerie') == "film"){
        this.film = true;
        this.url = "/film/";
        this._suggestionService.rechercheRapide(localStorage.getItem('rechercheRapide')).subscribe((res: rechercheFilm) => {
          this.tabFilm = res.results;
          this.previous = res.previous;
          this.next = res.next;
          this.nbrResultats = res.count;
        });
      }
      else {
        this.url = "/serie/";
        this.film = false;
        this._suggestionService.rechercheRapideSerie(localStorage.getItem('rechercheRapide')).subscribe((res: rechercheSerie) => {
          this.tabSerie = res.results;
          this.previous = res.previous;
          this.next = res.next;
          this.nbrResultats = res.count;
        });
      }
    }
    else {
      if(JSON.parse(localStorage.getItem('rechercheAvance')).filmOuSerie == "film"){
        this.url = "/film/";
        this._suggestionService.rechercheAvancee(JSON.parse(localStorage.getItem('rechercheAvance'))).subscribe((video: Video[]) => {
          this.tabFilm = video;
        });
      }
      else {
        this.url = "/serie/";
      }
    }
  }

  ngAfterViewInit()	: void{
    this.checkIfFav();
  }


  postRate(event, item) {
    console.log(event.value);
    console.log(item);
    this.showHide(item.id_video);
  }

  checkIfFav(){
    this.tabFilm.forEach(item => {
      if(this.FavorisService.checkIfFavFilm(item.id_video) == true){
        console.log("passé");
        let s = "fav_" + item.id_video;
        document.getElementById(s).style.color = "red";
      }
    });
  }

  nextPage(){
    if(localStorage.getItem('typeDeRecherche') == "rechercheRapide"){
      localStorage.setItem('rechercheRapide', this.next);
    }
    this.ngOnInit();
  }

  previousPage(){
    if(localStorage.getItem('typeDeRecherche') == "rechercheRapide"){
      localStorage.setItem('rechercheRapide', this.previous);
    }
    this.ngOnInit();
  }

  addFav(item){
    console.log(item);
    let s = "fav_" + item;
    console.log(s);
    if(document.getElementById(s).style.color == "red") {
      document.getElementById(s).style.color = "white";
      this.FavorisService.deleteFavorisFilm(item);
    }
    else {
      document.getElementById(s).style.color = "red";
      this.FavorisService.addFavorisFilm(item);
      // On ajoute cette video de la BD Favoris
    }
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
