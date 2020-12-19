import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavbarService } from '../services/navbar.service';
import { InscriptionService } from '../services/inscription.service';


@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'],
  providers: [InscriptionService]
})
export class InscriptionComponent implements OnInit {

  inscriptionForm: FormGroup;

  constructor(private InscriptionService: InscriptionService ,private nav: NavbarService) { this.nav.hide() }

  ngOnInit(): void {

    this.inscriptionForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
      nom: new FormControl("", [Validators.required]),
      prenom: new FormControl("", [Validators.required]),
      date_naissance: new FormControl(Date, [Validators.required]),
      genre: new FormControl("", [Validators.required]),
      telephone: new FormControl("", [Validators.required]),
      pays: new FormControl("", [Validators.required])
    });

  }

  inscription() {
    this.InscriptionService.inscription(this.inscriptionForm);
  }

}
