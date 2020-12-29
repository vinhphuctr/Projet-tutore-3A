import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { SuggestionService} from '../services/suggestion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { rechercheAvancee } from '../modeles/rechercheAvancee';
import { ViewChild, ViewChildren, Renderer2, ElementRef, QueryList } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MovieService } from '../services/movie.service';
import { SerieService } from '../services/serie.service';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { Video } from '../modeles/video';
import { map } from 'rxjs/operators';
import { Serie } from '../modeles/serie';
import { Categorie } from '../modeles/categorie';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @ViewChild('myButton') myButton: ElementRef;
  parentMessage = "message from parent";

  tabSuggestion: Object;
  isRechercheRapide: boolean = false;
  isRechercheAvance: boolean = false;
  rechercheRapideForm: FormGroup;
  rechercheAvanceeForm: FormGroup;
  slider_value: number = 180;
  film_value: string = "film";


  constructor(private nav: NavbarService, private suggestionService: SuggestionService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private renderer: Renderer2,
    private sanitizer: DomSanitizer, private _httpClient: HttpClient, private movieService: MovieService, private serieService: SerieService) {
    nav.show()
  }

  ngOnInit(): void {

    this.shippingForm = this.fb.group({
      signatureReq: ['film'],
    })
    // this.tabSuggestion = this.suggestionService.getSuggestions();
    this.rechercheRapideForm = new FormGroup({
      recherche: new FormControl("", [Validators.required])
    })
    this.rechercheAvanceeForm = new FormGroup({
      film_value: new FormControl("", [Validators.required]),
      slider_value: new FormControl("", [Validators.required]),
      recherche: new FormControl("", [Validators.required])
    })
  }

  afficherRapide() {
    this.isRechercheRapide = true;
    this.isRechercheAvance = false;
  }

  formatLabel(value: number) {
    if (value < 60) {
      return value + "min"
    }
    if (value % 60 == 0) {
      return value / 60 + "h"
    }
    return (value / 60).toFixed(1).slice(0, 1) + "h" + value % 60 + "min"
  }


  afficherAvance() {
    this.isRechercheAvance = true;
    this.isRechercheRapide = false;
  }

  rechercheRapide() {
    localStorage.setItem('typeDeRecherche', "rechercheRapide");
    localStorage.setItem('rechercheRapide', this.rechercheRapideForm.value['recherche']);
    const redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || '/recherche';
    this.router.navigate([redirectUrl]);
  }

  rechercheAvancee() {
    let recherche = new rechercheAvancee();
    recherche.filmOuSerie = this.rechercheAvanceeForm.value['film_value'];
    recherche.duree = this.rechercheAvanceeForm.value['slider_value'];
    recherche.categories = null;
    recherche.vo = "en";
    localStorage.setItem('typeDeRecherche', "rechercheAvance");
    localStorage.setItem('rechercheAvance', JSON.stringify(recherche));
    const redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || '/recherche';
    this.router.navigate([redirectUrl]);
  }

  selected: string;
  filter: any;

  radioChange() {

    this.filter['property'] = this.selected;
    console.log(this.filter);

  }


  shippingForm: FormGroup;



  lis: Serie;

  liste: Array<Categorie> = [];

  listeMovie: Array<Categorie> = [];

  changeRadioValue(): void {
    console.log(this.shippingForm.get('signatureReq'));
    console.log(this.shippingForm.get('signatureReq').value); // value : movie, series, both
    if (this.shippingForm.get('signatureReq').value == 'movie') {


      this.movieService.getAllMovies().subscribe((video: Video) => {




        for (let i = 0; i < video.length; i++) {


          for (let m = 0; m < video[i].categories.length; m++) {
            console.log(video[i].categories[m].libelle);


            this.listeMovie.push(video[i].categories[m]);



            // this.liste.push(serie[i].categories[m]);

            //  this.liste = this.liste.filter(liste => liste[serie[i].categories[m].id_categ] != liste[serie[i+1].categories[m].id_categ]);

            // this.liste[serie[i].categories[m].id_categ] += serie[i].categories[m].libelle; 

            //this.liste[serie[i].categories[m].id_categ] += serie[i].categories[m].libelle;

          }
        }


        let result: Array<Categorie> = [];

        result = this.listeMovie.reduce((unique, o) => {
          if (!unique.some(obj => obj.id_categ === o.id_categ)) {
            unique.push(o);
          }
          return unique;
        }, []);
        console.log(result.length);

        var sentence_type = ` <div id="myid" style="color: rgb(93,84,164);  font-size: 22px;"> Quels catégories ? </div>  <form action="/action_page.php" > `;
        var newContent;

        for (let i = 0; i < result.length; i++) {



          newContent += `
            <input type="checkbox" id = "vehicle1" name = "vehicle1" value = "Bike" >
               ` + result[i].libelle + ` <br>`





        }

        newContent += `<input type = "submit" value = "Valider" > </form>`;
        var final = sentence_type + newContent;




        this.renderer.setProperty(this.myButton.nativeElement, 'innerHTML', final);

      });



    }



    if (this.shippingForm.get('signatureReq').value == 'series') {

      this.serieService.getAllSeries().subscribe((serie: Serie) => {


        for (let i = 0; i < serie.length; i++) {


          for (let m = 0; m < serie[i].categories.length; m++) {
            console.log(serie[i].categories[m].libelle);


            this.liste.push(serie[i].categories[m]);



            // this.liste.push(serie[i].categories[m]);

            //  this.liste = this.liste.filter(liste => liste[serie[i].categories[m].id_categ] != liste[serie[i+1].categories[m].id_categ]);

            // this.liste[serie[i].categories[m].id_categ] += serie[i].categories[m].libelle; 

            //this.liste[serie[i].categories[m].id_categ] += serie[i].categories[m].libelle;

          }
        }


        let result: Array<Categorie> = [];

        result = this.liste.reduce((unique, o) => {
          if (!unique.some(obj => obj.id_categ === o.id_categ)) {
            unique.push(o);
          }
          return unique;
        }, []);
        console.log(result.length);

        var sentence_type = ` <div id="myid" style="color: rgb(93,84,164);  font-size: 22px;"> Quels catégories ? </div>  <form action="/action_page.php" > `;
        var newContent;

        for (let i = 0; i < result.length; i++) {



          newContent += `
            <input type="checkbox" id = "vehicle1" name = "vehicle1" value = "Bike" >
               ` + result[i].libelle + ` <br>`





        }

        newContent += `<input type = "submit" value = "Valider" > </form>`;
        var final = sentence_type + newContent;




        this.renderer.setProperty(this.myButton.nativeElement, 'innerHTML', final);

      });
    }

      // BOTH 
      if (this.shippingForm.get('signatureReq').value == 'both') {

        this.serieService.getAllSeries().subscribe((serie: Serie) => {


          for (let i = 0; i < serie.length; i++) {


            for (let m = 0; m < serie[i].categories.length; m++) {
              console.log(serie[i].categories[m].libelle);


              this.liste.push(serie[i].categories[m]);

            }
          }
        this.movieService.getAllMovies().subscribe((video: Video) => {




          for (let i = 0; i < video.length; i++) {


            for (let m = 0; m < video[i].categories.length; m++) {
              console.log(video[i].categories[m].libelle);


              this.listeMovie.push(video[i].categories[m]);

            }
          }



          let result: Array<Categorie> = [];
          let resultat2: Array<Categorie> = [];
         


           

       

          result = this.liste.concat(this.listeMovie);
          resultat2 = result.reduce((unique, o) => {
            if (!unique.some(obj => obj.id_categ === o.id_categ)) {
              unique.push(o);
            }
            return unique;
          }, []);

         

            var sentence_type = ` <div id="myid" style="color: rgb(93,84,164);  font-size: 22px;"> Quels catégories ? </div>  <form action="/action_page.php" > `;
            var newContent;

            for (let i = 0; i < resultat2.length; i++) {



              newContent += `
            <input type="checkbox" id = "vehicle1" name = "vehicle1" value = "Bike" >
               ` + resultat2[i].libelle + ` <br>`





            }

            newContent += `<input type = "submit" value = "Valider" > </form>`;
            var final = sentence_type + newContent;




            this.renderer.setProperty(this.myButton.nativeElement, 'innerHTML', final);

          });

        });






      }



    }
  }


