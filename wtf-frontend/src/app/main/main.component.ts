import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { SuggestionService} from '../services/suggestion.service';
import { Video } from '../modeles/video';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  tabSuggestion : Video[];

  constructor(private nav: NavbarService, private suggestionService: SuggestionService) { nav.show() }

  ngOnInit(): void {
    this.tabSuggestion = JSON.parse(this.suggestionService.getSuggestions());
    console.log(this.tabSuggestion);
  }
}


