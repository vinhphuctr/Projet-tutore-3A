// Service MonProfil
// par HUA Julie
// Modifie les informations de l'utilisateur dans le Store


import { Injectable } from '@angular/core';
import { UtilisateurService } from '../services/utilisateur.service';
import { HttpClient } from '@angular/common/http';
import { Utilisateur } from '../modeles/utilisateur';
import { connexionService } from './connexion.service';


@Injectable({
  providedIn: 'root'
})
export class MonprofilService {

  constructor(private UtilisateurService : UtilisateurService, private _connexionService : connexionService,  private httpClient: HttpClient) {
  }

  modifyUser(user : Utilisateur) {
    //Appel API, modification données serveur

    this.httpClient.put<any>('https://wtf-api-v1.herokuapp.com/api/profil/'+this._connexionService.getCurrentUser().id, { 'email': user.email, 'nom': user.nom, 'prenom':user.prenom, 'telephone':user.telephone, 'pays':user.pays})
    // Modification localstorage user
    .subscribe(res => {
      console.log(res);
  });


    this.UtilisateurService.setUser(
      this._connexionService.getCurrentUser().id,
      user.nom,
      user.prenom,
      user.email,
      user.pays,
      user.telephone,
      user.date_naissance,
      this.UtilisateurService.getToken(),
      this.UtilisateurService.getFavFilms(),
      this.UtilisateurService.getFavSeries())
  }



}



