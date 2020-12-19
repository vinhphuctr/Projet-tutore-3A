import { Injectable } from '@angular/core';
import { UtilisateurService } from '../services/utilisateur.service';
import { HttpClient } from '@angular/common/http';
import { Utilisateur } from '../modeles/utilisateur';


@Injectable({
  providedIn: 'root'
})
export class MonprofilService {

  constructor(private UtilisateurService : UtilisateurService,  private httpClient: HttpClient) {
  }

  modifyUser(user : Utilisateur) {
    //Appel API, modification données serveur

    //this.httpClient.post<any>('https://wtf-api-v1.herokuapp.com/api/inscription', { 'email': mail, 'password' : mdp, 'nom': nom, 'prenom':prenom, 'telephone':telephone, 'pays':pays, 'genre' : genre, 'date_naissance':date_naissance});

    // Modification localstorage user
    this.UtilisateurService.setUser(
      this.UtilisateurService.getId(),
      user.nom,
      user.prenom,
      user.email,
      user.pays,
      user.telephone,
      user.date_naissance,
      this.UtilisateurService.getToken())
  }
}



