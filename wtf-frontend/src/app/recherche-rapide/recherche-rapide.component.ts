import { Component, OnInit, Input} from '@angular/core';
import { SuggestionService } from '../services/suggestion.service';
import { Utilisateur } from '../modeles/utilisateur';
import { Video } from '../modeles/video';
import { FavorisService } from '../services/favoris.service';
import { UtilisateurService } from '../services/utilisateur.service';



@Component({
  selector: 'app-recherche-rapide',
  templateUrl: './recherche-rapide.component.html',
  styleUrls: ['./recherche-rapide.component.css']
})
export class RechercheRapideComponent implements OnInit {

  ratingValue: number = 3;
  tabResultat : Video[];
  tabMesFavoris: Video[];
  UtilisateurData: Utilisateur;

  constructor(private suggestionService: SuggestionService,private UtilisateurService : UtilisateurService, private FavorisService: FavorisService) {

    this.tabResultat = this.suggestionService.rechercheRapide(localStorage.getItem('keyword')); // tabResultat c'est du JSON
    this.tabMesFavoris = this.FavorisService.getFavoris();
  }

  ngOnInit(): void {
    this.UtilisateurData = this.UtilisateurService.getUser();
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
    this.tabResultat.forEach(item => {
      if(this.FavorisService.checkIfFav(item.idVideo) == true){
        console.log("passé");
        let s = "fav_" + item.idVideo;
        document.getElementById(s).style.color = "red";
      }
    });
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
