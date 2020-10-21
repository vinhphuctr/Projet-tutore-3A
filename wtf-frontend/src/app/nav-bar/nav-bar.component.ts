import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { connexionService } from '../services/connexion.service';
import { Utilisateur } from '../modeles/utilisateur';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  providers:[connexionService]
})
export class NavBarComponent implements OnInit {

  UtilisateurData: Utilisateur;
  lettresInitiales : String;

  constructor(public nav: NavbarService, private connexionService: connexionService) { }

  ngOnInit(): void {
    this.getUser();
    this.lettresInitiales =this.UtilisateurData.prenom.substr(0,1) + ' ' + this.UtilisateurData.nom.substr(0,1);
  }

  logout() {
    return this.connexionService.logout();
  }

  getUser(): void {
    this.UtilisateurData = this.connexionService.getUser();
  }
}

