import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilisateurService } from '../services/utilisateur.service';
import { Utilisateur } from '../modeles/utilisateur';
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

    console.log('Tentative de connexion');
    let identifiant = loginForm.value["email"];
    let mdp = loginForm.value["password"];

    // Appel API
    //
        console.log('Connexion réussie');

        // Recupération id, nom, prénom , token
        this.setUser("1", "Julie", "HUA","token");

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

    this.clearUser();
    this.router.navigate(['/']);
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }


  setUser(idUser : string, nomUser : string, prenomUser : string, token : string) {

    localStorage.setItem('user', JSON.stringify({'id' : idUser, 'nom':nomUser, 'prenom':prenomUser}));
    localStorage.setItem('token', token);
  }

  clearUser() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
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
