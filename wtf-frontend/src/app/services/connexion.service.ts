import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class connexionService {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  connexion(loginForm: any) {
    console.log('Tentative de connexion');
    var abc = 1;
    if(abc == 1){
      console.log('Connexion réussie');
      this.setUser({login : loginForm.username});

      // On récupère l'url de redirection
      const redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || '/faq';

      // On accède à la page souhaitée
      this.router.navigate([redirectUrl]);
    }
    else {
      console.log('Echec de connexion')
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

  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  clearUser() {
    localStorage.removeItem('user');
  }
}
