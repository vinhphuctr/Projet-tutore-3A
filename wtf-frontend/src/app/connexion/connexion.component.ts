/*

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NavbarService } from '../services/navbar.service';
import { Utilisateur } from '../modeles/utilisateur';
import { userInfo } from 'os';
import { Router } from '@angular/router';
import { UtilisateurService } from '../services/utilisateur.service';
import { TransferWithinAStationOutlined } from '@material-ui/icons';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  connexionForm: FormGroup;
  tabUsers : Utilisateur[];

  constructor(private nav: NavbarService, private formBuilder: FormBuilder, private _utilisateurService : UtilisateurService) {
    nav.hide()
  }

  ngOnInit(): void {
    this.connexionForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required])
    })
  }

  testerConnexion() : void{

      this._utilisateurService.getUsers().subscribe(tabUsers => this.tabUsers = tabUsers);

      this.tabUsers.forEach(element => {
        if(element.mail === this.connexionForm.value["email"] && element.mdp == this.connexionForm.value["password"]){
          localStorage.setItem('user', JSON.stringify({email : element.mail}));
          this.router.navigate(['/home']);
        }
        else {
          console.log("pas ok");
        }
      });
    }
  }

*/

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { connexionService } from '../services/connexion.service';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
  providers: [connexionService]
})
export class ConnexionComponent implements OnInit {

  connexionForm: FormGroup;

  constructor(private connexionService: connexionService,private nav: NavbarService, private formBuilder: FormBuilder) {
    nav.hide()
  }

  ngOnInit() {
    this.connexionForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required])
    })
  }

  connexion() {
    this.connexionService.connexion(this.connexionForm);
  }
}
