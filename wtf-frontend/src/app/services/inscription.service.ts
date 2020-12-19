import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilisateurService } from '../services/utilisateur.service';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { connexionService } from '../services/connexion.service';
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  constructor(
    private connexionService: connexionService,
    private router: Router,
    private route: ActivatedRoute,
    private _utilisateurService : UtilisateurService,
    private httpClient: HttpClient) { }

  inscription(loginForm: any)  {

    // Appel API
    this.httpClient.post<any>('https://wtf-api-v1.herokuapp.com/api/inscription', { 'email': loginForm.value["email"], 'password' : loginForm.value["password"], 'nom': loginForm.value["nom"], 'prenom':loginForm.value["prenom"], 'telephone':loginForm.value["telephone"], 'pays':loginForm.value["pays"], 'genre' : loginForm.value["genre"], 'date_naissance':loginForm.value["date_naissance"]}).subscribe(res => {
      if(res.email == loginForm.value["email"] && res.password == loginForm.value["password"]){
        // Inscription réussi
        let connexionForm = new FormGroup({
          email: new FormControl(loginForm.value["email"]),
          password: new FormControl(loginForm.value["password"])
        })
        this.connexionService.connexion(connexionForm);
      }
    });
  }
}
