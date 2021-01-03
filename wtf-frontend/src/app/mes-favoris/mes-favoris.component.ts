import { Component, OnInit} from '@angular/core';
import { Utilisateur } from '../modeles/utilisateur';
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

  UtilisateurData: Utilisateur;
  tabMesFavorisFilm: any[];
  ratingValue: number = 3;
  data$ = interval(10);

  constructor(private FavorisService: FavorisService, private utilisateurService : UtilisateurService) {
  }

  ngOnInit(): void {
    this.UtilisateurData = this.utilisateurService.getUser();
    this.tabMesFavorisFilm = this.FavorisService.getFavorisFilm();
    this.data$.subscribe(val => this.tabMesFavorisFilm = this.FavorisService.getFavorisFilm());
  }

  ngAfterViewInit()	: void{
    this.checkIfFav();
  }

  checkIfFav(){
    this.tabMesFavorisFilm.forEach(item => {
      if(this.FavorisService.checkIfFavFilm(item.id_video) == true){
        let s = "fav_" + item.id_video;
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
      this.FavorisService.deleteFavorisFilm(item);
    }
    else {
      document.getElementById(s).style.color = "red";
      this.FavorisService.addFavorisFilm(item);
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
