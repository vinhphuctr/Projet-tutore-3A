import { Component, OnInit} from '@angular/core';
import { Utilisateur } from '../modeles/utilisateur';
import { connexionService } from '../services/connexion.service';
import { FavorisService } from '../services/favoris.service';
import { Video } from '../modeles/video';
import { interval } from 'rxjs';
import { UtilisateurService } from '../services/utilisateur.service';



@Component({
  selector: 'app-mes-favoris',
  templateUrl: './mes-favoris.component.html',
  styleUrls: ['./mes-favoris.component.css']
})
export class MesFavorisComponent implements OnInit {

  name = 'Angular 5';
  UtilisateurData: Utilisateur;
  tabMesFavoris: Video[];
  ratingValue: number = 3;
  data$ = interval(10);

  constructor(private connexionService: connexionService, private FavorisService: FavorisService, private utilisateurService : UtilisateurService) {
  }

  ngOnInit(): void {
    this.UtilisateurData = this.utilisateurService.getUser();
    this.tabMesFavoris = this.FavorisService.getFavoris();
    this.data$.subscribe(val => this.tabMesFavoris = this.FavorisService.getFavoris());
  }

  ngAfterViewInit()	: void{
    this.checkIfFav();
  }

  checkIfFav(){
    this.tabMesFavoris.forEach(item => {
      if(this.FavorisService.checkIfFav(item.idVideo) == true){
        let s = "fav_" + item.idVideo;
        document.getElementById(s).style.color = "red";
      }
    });
  }

  addFav(item){
    console.log(item);
    let s = "fav_" + item;
    if(document.getElementById(s).style.color == "red") {
      document.getElementById(s).style.color = "white";
      this.FavorisService.deleteEnAttendant(item);
      this.FavorisService.deleteFavoris(item, this.UtilisateurData);
    }
    else {
      document.getElementById(s).style.color = "red";
      this.FavorisService.addFavoris(item, this.UtilisateurData);
      // On ajoute cette video de la BD Favoris
    }
  }

  postRate(event, item) {
    console.log(event.value);
    console.log(item);
    this.showHide(item.id_video);
  }




  toggleShowHide : string = "hidden";


 // showMyContainer1 : boolean ;
  showUndoBtn(item) {
    console.log(item);

    this.toggleShowHide="visible";

    // show btn with id btnId in DOM

    //this.item=false;

   // this.showMyContainer=true;
    //item.showButton = true;
}
status: boolean = false;
max : number =5;
showHide(modRef) {
    // hide the <div> with id == modRef

    // this.status = !this.status;
    // // if(this.status ) {

    // //   document.getElementById(modRef).style.display = 'none';
    // // } else {
    //   document.getElementById(modRef).style.display = 'block';
    // //}
    ;

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

reply_click(id)
{
    console.log(id);
}







}
