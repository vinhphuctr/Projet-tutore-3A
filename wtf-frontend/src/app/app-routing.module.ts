import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {ProfilComponent} from './profil/profil.component';
import {QuiSommesNousComponent} from './qui-sommes-nous/qui-sommes-nous.component';
import {FaqComponent} from './faq/faq.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { MonProfilComponent } from './mon-profil/mon-profil.component';
import { MesHistoriquesComponent } from './mes-historiques/mes-historiques.component';
import { MesFavorisComponent } from './mes-favoris/mes-favoris.component';
import { connexionService } from './services/connexion.service'; 



const routes: Routes = [
  { path: "",  component: HomeComponent },
  { path: "profil",  component: ProfilComponent },
  { path:"connexion", component: ConnexionComponent },
  { path: "inscription", component: InscriptionComponent },
  { path: "quisommesnous",  component: QuiSommesNousComponent },
  { path: "faq", component: FaqComponent },
  { path: "monprofil", component: MonProfilComponent, canActivate:[connexionService] },
  { path: "meshistoriques", component: MesHistoriquesComponent, canActivate: [connexionService] },
  { path: "mesfavoris", component: MesFavorisComponent, canActivate: [connexionService] },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [connexionService]
})
export class AppRoutingModule { }
