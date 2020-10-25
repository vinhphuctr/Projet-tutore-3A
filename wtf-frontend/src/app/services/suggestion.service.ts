import { Injectable } from '@angular/core';
import { SUGGESTION } from '../mockSuggestion';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

  constructor() { }
  getSuggestions()
  {
    return JSON.stringify(SUGGESTION);
  }

  rechercheRapide(keyword: string) {
    // this.getSuggestions();
    var Films = []; 
    for (var unFilm of SUGGESTION) {
      var i = 0;
      var tab = unFilm.titre.split('');
      for (var caract of tab) {
        var nomExtrait = unFilm.titre.substr(i, keyword.length)
        if (nomExtrait.toLowerCase() == keyword.toLowerCase()) {
          Films.push(unFilm);
          break; 
        }
        i = i + 1; 
      }
      //console.log(unFilm.titre); 
    }
   // console.log(JSON.stringify(Films) + "lesfilms"); 
    return JSON.stringify(Films); 
   // console.log(this.getSuggestions());

  }


    //getMedicamentBySearch(array, keyword, callback){
   //  var Medicaments = [];
   //  for (var unMedicament of array) {
   //    var i = 0;
   //    var tab = unMedicament['nom'].split('');
   //    for (var caract of tab) {
   //      var nomExtrait = unMedicament['nom'].substr(i, keyword.length)
   //      if (nomExtrait.toLowerCase() == keyword.toLowerCase()) {
   //        Medicaments.push(unMedicament);
   //        break;
   //      }
   //      i = i + 1;
   //    }

   //  }
   //  return callback(null, Medicaments);


   //}


  //connexion(loginForm: any) {
  //  // Recupération des users existants
  //  this._utilisateurService.getUsers().subscribe(tabUsers => this.tabUsers = tabUsers);


  //  console.log('Tentative de connexion');

  //  this.tabUsers.forEach(element => {
  //    if (element.mail === loginForm.value["email"] && element.mdp == loginForm.value["password"]) {
  //      console.log('Connexion réussie');

  //      this.setUser(element);

  //      // On récupère l'url de redirection
  //      const redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || '/main';

  //      // On accède à la page souhaitée
  //      this.router.navigate([redirectUrl]);

  //    } else {
  //      alert("Connexion échoué : le mot de passe/l'identifiant est incorrect");
  //    }

  //  });

  //}
}
