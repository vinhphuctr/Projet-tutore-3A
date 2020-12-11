import { Injectable } from '@angular/core';
import { UtilisateurService } from '../services/utilisateur.service';


@Injectable({
  providedIn: 'root'
})
export class MonprofilService {

  constructor(private UtilisateurService : UtilisateurService) {
  }

  modifyUser(loginForm: any) {
    // Modifier back avec appel api pour modifier les informations de l'user
    console.log(loginForm.value["telephone"]);
    // Modification localstorage user
    this.UtilisateurService.setUser(
      this.UtilisateurService.getId(),
      loginForm.value["nom"],
      loginForm.value["prenom"],
      loginForm.value["email"],
      loginForm.value["pays"],
      loginForm.value["telephone"],
      this.UtilisateurService.getToken())
  }
}



