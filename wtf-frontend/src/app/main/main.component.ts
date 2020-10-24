import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { SuggestionService} from '../services/suggestion.service';
import { Video } from '../modeles/video';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  tabSuggestion : Video[];
  isRechercheRapide: boolean = false ;
  isRechercheAvance: boolean = false ;
  rechercheRapideForm: FormGroup;


  constructor(private nav: NavbarService, private suggestionService: SuggestionService) { nav.show() }

  ngOnInit(): void {
    this.tabSuggestion = JSON.parse(this.suggestionService.getSuggestions());
    this.rechercheRapideForm = new FormGroup({
      recherche: new FormControl("", [Validators.required])
    })
  }

  afficherRapide(){
    this.isRechercheRapide = true;
    this.isRechercheAvance = false;
  }

  afficherAvance(){
    this.isRechercheAvance = true;
    this.isRechercheRapide = false;
  }

 rechercheRapide() {
   console.log(this.rechercheRapideForm.value['recherche']);
  }
}


