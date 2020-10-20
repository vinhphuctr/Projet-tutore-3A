import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NavbarService } from '../services/navbar.service';
import { Utilisateur } from '../modeles/utilisateur';
import { userInfo } from 'os';
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

  constructor(private nav: NavbarService, private formBuilder: FormBuilder, private _utilisateurService : UtilisateurService) { nav.hide() }

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
          console.log('OK');
          // Creation de l'user
          // Affichage de l'user
        }
        else {
          console.log("pas ok");
        }
      });
    }
  }
