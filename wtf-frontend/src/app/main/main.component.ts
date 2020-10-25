import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { SuggestionService} from '../services/suggestion.service';
import { Video } from '../modeles/video';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  parentMessage = "message from parent"; 

  tabSuggestion : Video[];
  isRechercheRapide: boolean = false ;
  isRechercheAvance: boolean = false ;
  rechercheRapideForm: FormGroup;


  constructor(private nav: NavbarService, private suggestionService: SuggestionService, private router: Router, private route: ActivatedRoute,) {
    nav.show()
  }

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
    localStorage.setItem('keyword', this.rechercheRapideForm.value['recherche']); 
    const redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || '/rapiderecherche';
    this.router.navigate([redirectUrl]);
   
  
   

   

 
  }
}

