import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { USERS } from '../mockUtilisateur';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor() { }

  getUsers()
  {
    return of(USERS);
  }
}
