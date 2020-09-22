import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {ProfilComponent} from './profil/profil.component';
import {QuiSommesNousComponent} from './qui-sommes-nous/qui-sommes-nous.component';
import {FaqComponent} from './faq/faq.component';


const routes: Routes = [
  { path: "",  component: HomeComponent },
  { path: "profil",  component: ProfilComponent },
  { path: "quisommesnous",  component: QuiSommesNousComponent },
  { path: "faq",  component: FaqComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
