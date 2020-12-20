import { Injectable } from '@angular/core';
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor() { }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  setUser(id: string, nomUser : string, prenomUser : string, email : string, pays : string, tel : string, dateNaissance : string, token : string) {

    // Token connexion qui est valable pour 1 hour, après ce temps il faudra se reconnecter.
    const expire_at  = moment().add(1, 'hour');
    localStorage.setItem('user', JSON.stringify({'nom':nomUser, 'prenom':prenomUser, 'email':email, 'pays':pays, 'date_naissance': dateNaissance,'telephone':tel}));
    localStorage.setItem('token', token);
    localStorage.setItem('expire_at', JSON.stringify(expire_at.valueOf()));
    localStorage.setItem('id', id);
  }


  getId(){
    return localStorage.getItem('id');
  }

  clearUser() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('expire_at');
    localStorage.removeItem('id');

  }
  getToken(){
    return localStorage.getItem('token');
  }

  updateToken(token: string){
    localStorage.setItem('token', token);
  }
}
