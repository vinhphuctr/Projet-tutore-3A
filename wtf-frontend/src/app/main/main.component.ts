import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { SuggestionService} from '../services/suggestion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
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
  @ViewChild('myCategorie') myCategorie: ElementRef;
  @ViewChild('myLanguage') myLanguage: ElementRef;
  tabSuggestion: Object;
  isRechercheRapide: boolean = false;
  isRechercheAvance: boolean = false;
  rechercheRapideForm: FormGroup;
  rechercheAvanceeForm: FormGroup;
  slider_value: number = 180;
  film_value: string = "film";
  shippingForm: FormGroup;
  CategorieForm: FormGroup;
  languageForm: FormGroup;
  tabCategories: Array<Categorie> = [];
  lis: Serie;
  liste: Array<Categorie> = [];
  listeMovie: Array<Categorie> = [];
  Categorie: boolean = false;
  vo: boolean = false;
  language: boolean = false;
  listeVideos: Array<Video> = [];
  listeSeries: Array<Serie> = [];
  liste_after_categories_movies: Video;
  liste_after_categories_series: Serie;
  tab_liste_vo_after_movie: Array<Video> = [];
  tab_liste_vo_after_serie: Array<Serie> = [];
  radioSelected : string = ''; 
  listeCategorieTest: Array<Categorie> = [];
  shipping: FormGroup;
  tab_vo: Array<any> = [] ;
  voForm: FormGroup;
  duree: boolean = false;
  max: number;
  min: number; 
  

  constructor(private nav: NavbarService, private suggestionService: SuggestionService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private face: FormBuilder, private renderer: Renderer2,
    private sanitizer: DomSanitizer, private _httpClient: HttpClient, private movieService: MovieService, private serieService: SerieService) {
    nav.show()
  }

  ngOnInit(): void {

    this.shipping = this.fb.group({
      signature: ['false'],
    })

    this.shippingForm = this.fb.group({
      signatureReq: ['film'],
    })
    this.languageForm = this.fb.group({
      julie: ['film'],
    })
    this.CategorieForm = this.fb.group({
      checkArray: this.fb.array([], [Validators.required])
    })
    this.voForm = this.fb.group({
      check: this.fb.array([], [Validators.required])
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

  onCheckboxChange(e) {
    const checkArray: FormArray = this.CategorieForm.get('checkArray') as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
     
    }
  }



  onCheckbox2Change(e) {
  

    const check: FormArray = this.voForm.get('check') as FormArray;

    if (e.target.checked) {
    

      check.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      
      check.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          check.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  afficherRapide() {
    this.isRechercheRapide = true;
    this.isRechercheAvance = false;
    this.Categorie = false;
    this.language = false;
    this.vo = false;
    this.duree = false;
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
    this.language = false;
    this.Categorie = false;
    this.vo = false;
    this.duree = false; 
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

  changeRadioValue(): void {
    this.isRechercheRapide = false;
    console.log(this.shippingForm.get('signatureReq'));
    console.log(this.shippingForm.get('signatureReq').value); // value : movie, series, both


    if (this.shippingForm.get('signatureReq').value == 'movie') {

      localStorage.setItem('choix', 'movie'); 
    }
    if (this.shippingForm.get('signatureReq').value == 'series') {

      localStorage.setItem('choix', 'serie');

      // WARNING !!!! can you guys keep this part ? I'd appreciate it, thanks dude 
      //this.serieService.getAllSeries().subscribe((serie: Serie) => {
      //  for (let i = 0; i < serie.length; i++) {

      //    this.listeSeries.push(serie[i]);
      //    for (let m = 0; m < serie[i].categories.length; m++) {
      //      console.log(serie[i].categories[m].libelle);
      //      this.liste.push(serie[i].categories[m]);
      //    }
      //  }
      //  let result: Array<Categorie> = [];
      //  result = this.liste.reduce((unique, o) => {
      //    if (!unique.some(obj => obj.id_categ === o.id_categ)) {
      //      unique.push(o);
      //    }
      //    return unique;
      //  }, []);
      
    //  });
    }

    // BOTH
    if (this.shippingForm.get('signatureReq').value == 'both') {

      localStorage.setItem('choix', 'both');
    }
    this.Categorie = true;
    this.suggestionService.getAllCategories().subscribe((categorie: Categorie) => {
      this.listeCategorieTest = categorie.results;
      console.log(this.listeCategorieTest);
      return this.listeCategorieTest; 
    });
    var sentence_type = ``;
    this.renderer.setProperty(this.myButton.nativeElement, 'innerHTML', sentence_type);
    
  }

  SubmitCategorie(): void {

    console.log(localStorage.getItem('choix'));
    console.log(this.CategorieForm.value);
    console.log(this.CategorieForm.value.checkArray);
    let array = []; 
    array  = Array.from(this.CategorieForm.value.checkArray);
    localStorage.setItem('categorie', JSON.stringify(array));
    if (localStorage.getItem('choix') == 'movie') {
      this.suggestionService.rechercheAvancee_Categorie_movies(this.CategorieForm.value.checkArray).subscribe((video: Video) => {
        this.liste_after_categories_movies = video;
        console.log(this.liste_after_categories_movies); 
        return this.liste_after_categories_movies;
      });
    }
    if (localStorage.getItem('choix') == 'serie') {
      this.suggestionService.rechercheAvancee_Categorie_series(this.CategorieForm.value.checkArray).subscribe((serie: Serie) => {
        this.liste_after_categories_series = serie;
        console.log(this.liste_after_categories_series);
        return this.liste_after_categories_series;
      });
    }
    if (localStorage.getItem('choix') == 'both') {
      this.suggestionService.rechercheAvancee_Categorie_movies(this.CategorieForm.value.checkArray).subscribe((video: Video) => {
        this.liste_after_categories_movies = video;
        console.log(this.liste_after_categories_movies);
        return this.liste_after_categories_movies;
      });
      this.suggestionService.rechercheAvancee_Categorie_series(this.CategorieForm.value.checkArray).subscribe((serie: Serie) => {
        this.liste_after_categories_series = serie;
        console.log(this.liste_after_categories_series);
        return this.liste_after_categories_series;
      });
    }




    //if (localStorage.getItem('choix') == 'serie') {
    //  for (let i = 0; i < this.listeSeries.length; i++) {
    //    for (let m = 0; m < this.listeSeries[i].categories.length; m++) {
    //      for (let n = 0; n < this.CategorieForm.value.checkArray.length; n++) {

    //        console.log(this.CategorieForm.value.checkArray.length);

    //        if (this.CategorieForm.value.checkArray[n] == this.listeSeries[i].categories[m].id_categ) {
    //          this.liste_after_categories_series.push(this.listeSeries[i]);
    //        }

    //      }

    //    }
    //  }
    //  let result: Array<Serie> = [];
    //  result = this.liste_after_categories_series.reduce((unique, o) => {
    //    if (!unique.some(obj => obj.titre === o.titre)) {
    //      unique.push(o);
    //    }
    //    return unique;
    //  }, []);
    //  console.log(result);
    //  console.log(this.listeSeries);
    //}

  
    this.language = true; 
    var sentence_type = ``;
    this.renderer.setProperty(this.myCategorie.nativeElement, 'innerHTML', sentence_type);
  }
  OnChangeduree() {
    console.log(this.slider_value);
    localStorage.setItem('duree', JSON.stringify(this.slider_value));
    //rechercheAvancee_final_1
    this.suggestionService.rechercheAvancee_final_1(JSON.parse(localStorage.getItem('categorie')), localStorage.getItem('duree')).subscribe((video: Video) => {
      //this.liste_after_categories_series = serie;
      //console.log(this.liste_after_categories_series);
      //return this.liste_after_categories_series;
    });

  }
  changeLanguageValue() {
    
    console.log(this.shipping.get('signature').value);
    console.log(localStorage.getItem('choix'));

    if (this.shipping.get('signature').value == 'v' || this.shipping.get('signature').value == 'both' && localStorage.getItem('choix')=='movie' ) {

    
      let liste_duree=[];
      for (let i = 0; i < this.liste_after_categories_movies.results.length; i++) {

        liste_duree.push(this.liste_after_categories_movies.results[i].duree);
        console.log(this.liste_after_categories_movies.results[i].duree);
        
      }

      this.max = liste_duree.reduce((a, b) => Math.max(a, b));
      this.min = liste_duree.reduce((a, b) => Math.min(a, b));
      this.duree = true;
      this.language = false; 
      console.log(this.min+'hey'); 
    }

    

    if (this.shipping.get('signature').value == 'vo') {
      if (localStorage.getItem('choix') == 'movie') {
        for (let i = 0; i < this.liste_after_categories_movies.results.length; i++) {

          this.tab_vo.push(this.liste_after_categories_movies.results[i].vo); 
          console.log(this.liste_after_categories_movies.results[i].vo);
        }
      }

      // film le vo ça marche
      if (localStorage.getItem('choix') == 'serie') {
        for (let i = 0; i < this.liste_after_categories_series.results.length; i++) {
            this.tab_vo.push(this.liste_after_categories_series.results[i].vo);
        }

        }
      if (localStorage.getItem('choix') == 'both') {
        for (let i = 0; i < this.liste_after_categories_movies.length; i++) {
          this.tab_vo.push(this.liste_after_categories_movies[i].vo);
        }

        for (let i = 0; i < this.liste_after_categories_series.length; i++) {
          this.tab_vo.push(this.liste_after_categories_series[i].vo);
        }

       
      }
      console.log(this.tab_vo); 
    
      this.tab_vo = this.tab_vo.reduce((unique, o) => {
        if (!unique.some(obj => obj === o)) {
          unique.push(o);
        }
        return unique;
      }, []);
      console.log(this.tab_vo); 

        this.vo = true;
        var sentence_type = ``;
        this.renderer.setProperty(this.myLanguage.nativeElement, 'innerHTML', sentence_type);




      }
  }



  SubmitVo(): void {
    console.log(this.voForm.value.check);
    let array = []; 
    array = Array.from(this.voForm.value.check);
    localStorage.setItem('vo', JSON.stringify(array));
    if (localStorage.getItem('choix') == 'movie') {
      this.suggestionService.rechercheAvancee_vo_categories_movies(this.CategorieForm.value.checkArray, JSON.parse(localStorage.getItem("vo"))).subscribe((video: Video) => {
        this.liste_after_categories_movies = video;
        let liste_duree = [];
        for (let i = 0; i < this.liste_after_categories_movies.results.length; i++) {

          liste_duree.push(this.liste_after_categories_movies.results[i].duree);
          console.log(this.liste_after_categories_movies.results[i].duree);

        }

        this.max = liste_duree.reduce((a, b) => Math.max(a, b));
        this.min = liste_duree.reduce((a, b) => Math.min(a, b));
        this.duree = true;
        this.language = false; 
        console.log(this.min + 'hey'); 
      });

    }

   

    //this.language = true;
    //var sentence_type = ``;
    //this.renderer.setProperty(this.myCategorie.nativeElement, 'innerHTML', sentence_type);
  }


  }

