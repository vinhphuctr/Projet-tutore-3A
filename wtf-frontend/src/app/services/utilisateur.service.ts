import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor() { }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  setUser(idUser : string, nomUser : string, prenomUser : string, email : string, pays : string, tel : string, token : string) {

    localStorage.setItem('id', idUser);
    localStorage.setItem('user', JSON.stringify({'id' : idUser, 'nom':nomUser, 'prenom':prenomUser, 'email':email, 'pays':pays, 'telephone':tel}));
    localStorage.setItem('token', token);
  }

  clearUser() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
  getToken(){
    return localStorage.getItem('token');
  }
  getId(){
    return localStorage.getItem('id');
  }
}
