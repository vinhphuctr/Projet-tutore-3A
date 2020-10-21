import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../modeles/utilisateur';
import { connexionService } from '../services/connexion.service';
@Component({
  selector: 'app-mes-favoris',
  templateUrl: './mes-favoris.component.html',
  styleUrls: ['./mes-favoris.component.css']
})
export class MesFavorisComponent implements OnInit {


  UtilisateurData: Utilisateur;

  constructor(private ConnexionService: connexionService) { }

  ngOnInit(): void {
    this.getUser();
    console.log(this.ConnexionService.isActive())
  }

  getUser(): void {
    this.UtilisateurData = this.ConnexionService.getUser();

  }

}
