
import { Plateforme } from './plateforme';
import { Production } from './production';
import { Personne } from './personne';
import { Categorie } from './categorie';
import { Note } from './note';
import { Saison } from './saison';

export class Serie {

  id_serie: number;
  titre: string;
  nb_saison: string; 
  date_sortie: Date;
  poster: string;
  plot: string;
  vo: string;
  rates: Array<Note>;
  duree: String;
  productions:Array<Production>;
  acteurs : Array<Personne>;
  plateformes : Array<Plateforme>;
  categories : Array<Categorie>;
  trailer: String;
  saisons: Array<Saison>; 

}
