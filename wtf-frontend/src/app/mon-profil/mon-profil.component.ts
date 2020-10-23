import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../modeles/utilisateur';
import { MonprofilService } from '../services/monprofil.service';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NavbarService } from '../services/navbar.service';
import { connexionService } from '../services/connexion.service';



@Component({
  selector: 'app-mon-profil',
  templateUrl: './mon-profil.component.html',
  styleUrls: ['./mon-profil.component.css'],
  providers: [MonprofilService]
})

export class MonProfilComponent implements OnInit {
  modifyUserForm: FormGroup;
  UtilisateurData: Utilisateur;

    constructor(private MonprofilService: MonprofilService, private nav: NavbarService, private formBuilder: FormBuilder,private connexionService: connexionService) { }

    ngOnInit(): void {
       // this.UtilisateurData = this.MonprofilService.getUser();
        this.UtilisateurData = this.connexionService.getUser();
    this.modifyUserForm = new FormGroup({
        email: new FormControl(this.UtilisateurData.mail, [Validators.required, Validators.email]),
        prenom: new FormControl(this.UtilisateurData.prenom, [Validators.required]),
        nom: new FormControl(this.UtilisateurData.nom, [Validators.required]),
        pays: new FormControl(this.UtilisateurData.pays, [Validators.required]),
        telephone: new FormControl(this.UtilisateurData.telephone, [Validators.required]),
        
     // password: new FormControl("", [Validators.required])
    })
        

  }

  modifyUser() {
    //this.connexionService.connexion(this.connexionForm);
      console.log('il va modifier les valeurs');


      this.MonprofilService.modifyUser(this.modifyUserForm);
    //console.log(modifyForm.value["email"]); 
   

 // constructor(private connexionService: connexionService, private nav: NavbarService) { nav.show} , à voir avec Julien


  }



  onSubmit(event: any) {
    return event.target.player.value;
  }

  // UPDATE
  // Modifier local storage + modifier BD

}

