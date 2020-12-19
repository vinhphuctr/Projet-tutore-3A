import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../modeles/utilisateur';
import { MonprofilService } from '../services/monprofil.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavbarService } from '../services/navbar.service';
import { UtilisateurService } from '../services/utilisateur.service';




@Component({
  selector: 'app-mon-profil',
  templateUrl: './mon-profil.component.html',
  styleUrls: ['./mon-profil.component.css'],
  providers: [MonprofilService]
})

export class MonProfilComponent implements OnInit {
  modifyUserForm: FormGroup;
  UtilisateurData: Utilisateur;

    constructor(private MonprofilService: MonprofilService, private utilisateurService : UtilisateurService,private nav: NavbarService) { }

    ngOnInit(): void {
      this.UtilisateurData = this.utilisateurService.getUser();
      this.modifyUserForm = new FormGroup({
      email: new FormControl(this.UtilisateurData.email, [Validators.required, Validators.email]),
      prenom: new FormControl(this.UtilisateurData.prenom, [Validators.required]),
      nom: new FormControl(this.UtilisateurData.nom, [Validators.required]),
      pays: new FormControl(this.UtilisateurData.pays, [Validators.required]),
      telephone: new FormControl(this.UtilisateurData.telephone, [Validators.required]),
      date_naissance: new FormControl(this.UtilisateurData.date_naissance, [Validators.required]),
    })
  }

  modifyUser() {
    this.UtilisateurData.email = this.modifyUserForm.value["email"];
    this.UtilisateurData.prenom = this.modifyUserForm.value["prenom"];
    this.UtilisateurData.nom = this.modifyUserForm.value["nom"];
    this.UtilisateurData.pays = this.modifyUserForm.value["pays"];
    this.UtilisateurData.telephone = this.modifyUserForm.value["telephone"];
    this.UtilisateurData.date_naissance = this.modifyUserForm.value["date_naissance"];
    this.MonprofilService.modifyUser(this.UtilisateurData);
  }
}

