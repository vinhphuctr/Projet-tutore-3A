import { Injectable } from '@angular/core';
import { SUGGESTION } from '../mockSuggestion';
import { HttpClient,HttpHeaders, HttpClientModule } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SuggestionService {


  constructor(private _httpClient : HttpClient) { }

  getSuggestions(){
    /*
    let url = "http://wtfilm-api.herokuapp.com/api/video/get/all/";
    let result = this._httpClient.get<any>(url);
    console.log(result);
    */
  }


 

  rechercheRapide(keyword: string) {
    // this.getSuggestions();
    var Films = [];

   let url =  "http://wtfilm-api.herokuapp.com/api/video/search/?titre=%"+keyword+"%"; 
   
   fetch(url)
   .then(res => res.json())
   .then((out) => {
     console.log('Checkout this JSON! ', out);
    

     Films.push(out); 

     
   
   

   })
    
   .catch(err => { throw err });
   return Films; 



  /*  for (var unFilm of SUGGESTION) {
      var i = 0;
      var tab = unFilm.titre.split('');
      for (var caract of tab) {
        var nomExtrait = unFilm.titre.substr(i, keyword.length)
        if (nomExtrait.toLowerCase() == keyword.toLowerCase()) {
          Films.push(unFilm);
          break;
        }
        i = i + 1;
      }
    }*/
    //return Films;
  }
}
