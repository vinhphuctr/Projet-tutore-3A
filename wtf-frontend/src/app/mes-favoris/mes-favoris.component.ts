import { Component, OnInit} from '@angular/core';
import { Utilisateur } from '../modeles/utilisateur';
import { connexionService } from '../services/connexion.service';
import { FavorisService } from '../services/favoris.service';
import { Video } from '../modeles/video';

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

  constructor(private connexionService: connexionService, private FavorisService: FavorisService) {

    this.tabMesFavoris = this.FavorisService.getFavoris();

    }

  ngOnInit(): void {


    console.log(this.connexionService.isActive())
    this.UtilisateurData = this.connexionService.getUser();

  }

  postRate(event, item) {
    console.log(event.value);
    console.log(item);
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
