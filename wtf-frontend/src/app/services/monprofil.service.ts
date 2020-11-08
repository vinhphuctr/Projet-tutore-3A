import { Injectable } from '@angular/core';
import { Utilisateur } from '../modeles/utilisateur';


@Injectable({
  providedIn: 'root'
})
export class MonprofilService {
  public Utilisateur_Model: Utilisateur;
  
  constructor() {

    this.Utilisateur_Model = new Utilisateur();
    this.Utilisateur_Model.mail;
    this.Utilisateur_Model.date_inscription;
    this.Utilisateur_Model.date_naissance;
    this.Utilisateur_Model.genre;
    this.Utilisateur_Model.id_utilisateur;
    this.Utilisateur_Model.mdp;
    this.Utilisateur_Model.nom;
    this.Utilisateur_Model.pays;
    this.Utilisateur_Model.prenom;
    this.Utilisateur_Model.telephone; 
   // this.model.param1 = "your string value here";


  }

  modifyUser(loginForm: any) {
    console.log(loginForm.value["email"]);
    console.log(loginForm.value["prenom"]);
    console.log(loginForm.value["nom"])
    console.log(loginForm.value["pays"]);;
    console.log(loginForm.value["telephone"]);
    this.Utilisateur_Model.mail = loginForm.value["email"];
    this.Utilisateur_Model.prenom = loginForm.value["prenom"];
    this.Utilisateur_Model.nom = loginForm.value["nom"];
    this.Utilisateur_Model.pays = loginForm.value["pays"];
    this.Utilisateur_Model.telephone = loginForm.value["telephone"];
    
    console.log("hey");
    var arr = JSON.parse(localStorage.getItem('user'));

    this.Utilisateur_Model.date_inscription = arr.date_inscription;
    this.Utilisateur_Model.date_naissance = arr.date_naissance;
    this.Utilisateur_Model.genre = arr.genre;
    this.Utilisateur_Model.id_utilisateur = arr.id_utilisateur;
    this.Utilisateur_Model.mdp = arr.mdp;
    
  
  

    //console.log(localStorage.getItem('user').date_inscription);
    localStorage.setItem('user', JSON.stringify(this.Utilisateur_Model));
    alert('Modification prise en compte'); 


   //tilisateur o; 
    //ring monutilisateur = { id_dzadza: localStorage.getItem(id_utilisateur), loginForm.value["email"]) };
    
    
    //localStorage.setItem('user', JSON.stringify());
  
    //id_utilisateur: number;
    //nom: string;
    //prenom: string;
    //date_inscription: string;
    //date_naissance: string;
    //mail: string;
    //mdp: string;
    //genre: string;
    //telephone: string;
    //pays: string;


  }
}



