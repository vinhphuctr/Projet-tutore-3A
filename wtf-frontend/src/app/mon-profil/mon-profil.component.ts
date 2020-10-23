import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../modeles/utilisateur';
import { connexionService } from '../services/connexion.service';
import { NavbarService } from '../services/navbar.service';


@Component({
  selector: 'app-mon-profil',
  templateUrl: './mon-profil.component.html',
  styleUrls: ['./mon-profil.component.css']
})

export class MonProfilComponent implements OnInit {

  UtilisateurData: Utilisateur;

  constructor(private connexionService: connexionService, private nav: NavbarService) { nav.show}

  ngOnInit(): void {
    this.UtilisateurData = this.connexionService.getUser();
  }

  // UPDATE
  // Modifier local storage + modifier BD

}

