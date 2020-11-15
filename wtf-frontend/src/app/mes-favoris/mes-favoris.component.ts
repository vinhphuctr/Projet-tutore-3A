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


  UtilisateurData: Utilisateur;

  tabMesFavoris: Video[];

  constructor(private connexionService: connexionService, private FavorisService: FavorisService) {

    this.tabMesFavoris = this.FavorisService.getFavoris();

    }

  ngOnInit(): void {


    console.log(this.connexionService.isActive())
    this.UtilisateurData = this.connexionService.getUser();

  }
}








