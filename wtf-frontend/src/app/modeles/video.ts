import { Plateforme } from './plateforme';
import { Production } from './production';
import { Personne } from './personne';

export class Video {

    idVideo: number;
    type: string;
    titre: string;
    dateSortie: {
      date: String;
      timezone_type: any;
      timezone: String
    };
    poster: string;
    plot: string;
    trailer: string;
    vo: string;
    production:Production;
    personnes : Array<Personne>;
    plateformes : Array<Plateforme>;
    categories : null;
}
