import { Component, OnInit, Input} from '@angular/core';
import { SuggestionService } from '../services/suggestion.service';
import { Video } from '../modeles/video';

@Component({
  selector: 'app-recherche-rapide',
  templateUrl: './recherche-rapide.component.html',
  styleUrls: ['./recherche-rapide.component.css']
})
export class RechercheRapideComponent implements OnInit {

  ratingValue: number = 3;
  tabResultat : Video[];


  constructor(private suggestionService: SuggestionService) {
    this.tabResultat = this.suggestionService.rechercheRapide(localStorage.getItem('keyword'));
  }

  ngOnInit(): void {
  }

  postRate(event, item) {
    console.log(event.value);
    console.log(item);
    this.showHide(item.id_video);
  }

  showHide(modRef) {

    if (document.getElementById(modRef).style.visibility=="hidden")
      {
        // Contenu caché, le montrer
        document.getElementById(modRef).style.visibility = "visible";
      }
      else
      {
        // Contenu visible, le cacher
        document.getElementById(modRef).style.visibility = "hidden";
      }
}









}
