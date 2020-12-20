import { Plateforme } from './plateforme';
import { Production } from './production';
import { Personne } from './personne';
import { Categorie } from './categorie';

export class Video {

    id_video: number;
    titre: string;
    date_sortie: Date;
    poster: string;
    plot: string;
    vo: string;
    scores: [];
    duree: String;
    production:Array<Production>;
    acteurs : Array<Personne>;
    plateformes : Array<Plateforme>;
    categories : Array<Categorie>;
    trailer : String;
}

