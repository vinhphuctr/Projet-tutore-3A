import { Injectable } from '@angular/core';
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor() { }

  getUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  setUser(id: string, nomUser : string, prenomUser : string, email : string, pays : string, tel : string, dateNaissance : string, token : string) {

    // Token connexion qui est valable pour 1 hour, après ce temps il faudra se reconnecter.
    const expire_at  = moment().add(1, 'hour');
    localStorage.setItem('currentUser', JSON.stringify({'id':id, 'nom':nomUser, 'prenom':prenomUser, 'email':email, 'pays':pays, 'date_naissance': dateNaissance,'telephone':tel}));
    localStorage.setItem('token', token);
    localStorage.setItem('expire_at', JSON.stringify(expire_at.valueOf()));
  }

  clearUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('expire_at');
    localStorage.removeItem('currentUser');

  }
  getToken(){
    return localStorage.getItem('token');
  }

  updateToken(token: string){
    localStorage.setItem('token', token);
    const expire_at  = moment().add(1, 'hour');
    localStorage.setItem('expire_at', JSON.stringify(expire_at.valueOf()));
  }
}
