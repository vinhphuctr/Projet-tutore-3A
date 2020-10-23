import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilisateurService } from '../services/utilisateur.service';
import { Utilisateur } from '../modeles/utilisateur';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';


@Injectable()
export class connexionService implements CanActivate {

  non_connecte: boolean = true;

  tabUsers : Utilisateur[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _utilisateurService : UtilisateurService
  ) { }


  connexion(loginForm: any)  {
    // Recupération des users existants
    this._utilisateurService.getUsers().subscribe(tabUsers => this.tabUsers = tabUsers);


    console.log('Tentative de connexion');

    this.tabUsers.forEach(element => {
      if (element.mail === loginForm.value["email"] && element.mdp == loginForm.value["password"]) {
        console.log('Connexion réussie');

        this.setUser(element);

        // On récupère l'url de redirection
        const redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || '/main';

        // On accède à la page souhaitée
        this.router.navigate([redirectUrl]);

      } else {
        alert("Connexion échoué : le mot de passe/l'identifiant est incorrect");
      }

    });

  }

   isActive() {
    if (localStorage.getItem('user') != undefined) {
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


  setUser(user : any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  clearUser() {
    localStorage.removeItem('user');
  }



  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.isActive() == true) {
      console.log('1');
      return true;
    }
    if(this.isActive() == false)
    {
      console.log('2');
      alert('Veuillez vous identifier pour voir cette page');
      return false;

    }
  }
}
