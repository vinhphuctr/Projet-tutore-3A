import { Component, OnInit, Input} from '@angular/core';
import { MainComponent } from '../main/main.component';
import { SuggestionService } from '../services/suggestion.service';
@Component({
  selector: 'app-recherche-rapide',
  templateUrl: './recherche-rapide.component.html',
  styleUrls: ['./recherche-rapide.component.css']
})
export class RechercheRapideComponent implements OnInit {

  
  @Input() childMessage: string;


  constructor(private suggestionService: SuggestionService) {
    console.log(this.suggestionService.rechercheRapide(localStorage.getItem('keyword')));
   

  }

  ngOnInit(): void {
  }

  

   
   
 


 
  
}
