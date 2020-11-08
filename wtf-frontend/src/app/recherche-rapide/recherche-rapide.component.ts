import { Component, OnInit, Input} from '@angular/core';
import { SuggestionService } from '../services/suggestion.service';
import { Video } from '../modeles/video';

@Component({
  selector: 'app-recherche-rapide',
  templateUrl: './recherche-rapide.component.html',
  styleUrls: ['./recherche-rapide.component.css']
})
export class RechercheRapideComponent implements OnInit {


  @Input() childMessage: string;

  tabResultat : Video[];


  constructor(private suggestionService: SuggestionService) {
    this.tabResultat = this.suggestionService.rechercheRapide(localStorage.getItem('keyword'));
  }

  ngOnInit(): void {
  }










}
