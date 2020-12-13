import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { SuggestionService} from '../services/suggestion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  parentMessage = "message from parent";

  tabSuggestion : Object;
  isRechercheRapide: boolean = false ;
  isRechercheAvance: boolean = false ;
  rechercheRapideForm: FormGroup;
  slider_value : number = 180;
  film_value : string = "both";


  constructor(private nav: NavbarService, private suggestionService: SuggestionService, private router: Router, private route: ActivatedRoute,) {
    nav.show()
  }

  ngOnInit(): void {
   // this.tabSuggestion = this.suggestionService.getSuggestions();
    this.rechercheRapideForm = new FormGroup({
      recherche: new FormControl("", [Validators.required])
    })
  }

  afficherRapide(){
    this.isRechercheRapide = true;
    this.isRechercheAvance = false;
  }

  formatLabel(value: number) {
    if (value < 60){
      return value + "min"
    }
    if(value % 60 == 0){
    return value / 60 + "h"
    }
    return (value / 60).toFixed(1).slice(0,1)+ "h" + value % 60 + "min"
  }


  afficherAvance(){
    this.isRechercheAvance = true;
    this.isRechercheRapide = false;
  }

  rechercheRapide() {
    localStorage.setItem('keyword', this.rechercheRapideForm.value['recherche']);
    const redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || '/rechercherapide';
    this.router.navigate([redirectUrl]);
  }

  rechercheAvancee(){
    console.log(this.film_value, this.slider_value);
  }
}


