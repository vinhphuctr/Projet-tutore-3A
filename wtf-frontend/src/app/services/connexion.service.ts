import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilisateurService } from '../services/utilisateur.service';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';


@Injectable()
export class connexionService implements CanActivate {

  non_connecte: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _utilisateurService : UtilisateurService
  ) { }


  connexion(loginForm: any)  {

    let identifiant = loginForm.value["email"];
    let mdp = loginForm.value["password"];

    // Appel API
    //
        // Recupération id, nom, prénom , token
        this._utilisateurService.setUser("1", "Julie", "HUA","julie.hua@gmail.com","France","0695221701","token");

        // On récupère l'url de redirection
        const redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || '/main';

        // On accède à la page souhaitée
        this.router.navigate(['/main']);


        //alert("Connexion échoué : le mot de passe/l'identifiant est incorrect");

  }

  isAuthenticated() {
    if (localStorage.getItem('token') != undefined) {
      return true;
    } else {
      return false
    }
  }


  logout() {
    console.log('Déconnexion');

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
