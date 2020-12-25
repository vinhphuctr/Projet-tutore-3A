import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilisateurService } from '../services/utilisateur.service';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as moment from "moment";
import { BehaviorSubject, Observable } from 'rxjs';
import { Utilisateur } from '../modeles/utilisateur';

@Injectable()
export class connexionService implements CanActivate {

  resultatConnexion: any;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private currentTokenSubject: BehaviorSubject<string>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _utilisateurService : UtilisateurService,
    private httpClient: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<Utilisateur>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentTokenSubject = new BehaviorSubject<string>(localStorage.getItem('token'));
  }

  getCurrentUser() {
    return this.currentUserSubject.value;
  }

  getCurrentToken() {
    return this.currentTokenSubject.value;
  }


  connexion(loginForm: any)  {

    let identifiant = loginForm.value["email"];
    let mdp = loginForm.value["password"];

    // Appel API

    this.httpClient.post<any>('https://wtf-api-v1.herokuapp.com/api/api-token-auth/', { 'email': identifiant, 'password' : mdp}).subscribe(res => {
      if(res.token != null){
        this._utilisateurService.setUser(res.user.id,res.user.prenom, res.user.nom,res.user.email,res.user.pays,res.user.telephone, res.date_naissance, res.token);
         // On récupère l'url de redirection
         const redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || '/main';

         // On accède à la page souhaitée
         this.router.navigate(['/main']);
      }
      else {
        alert("Connexion échoué : le mot de passe/l'identifiant est incorrect");
      }
    });
  }

  isAuthenticated() {
    if (localStorage.getItem('token') != undefined) {
      if(this.isLoggedIn()){
        return true;
      }
      else {
        this.refreshToken();
      }
    } else {
      return false
    }
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  refreshToken(){
    this.httpClient.post<any>('https://wtf-api-v1.herokuapp.com/api/api-token-refresh/', { 'token': this._utilisateurService.getToken()}).subscribe(res => {
      this._utilisateurService.updateToken(res.token);
  });
}

  getExpiration() {
    const expiration = localStorage.getItem("expire_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
}

  logout() {
    this._utilisateurService.clearUser();
    this.router.navigate(['/']);
  }



  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.isAuthenticated() == true) {
      return true;
    }
    else {
      this.router.navigate(['/connexion']);
      return false;
    }
  }
}
