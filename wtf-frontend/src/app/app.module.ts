import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProfilComponent } from './profil/profil.component';
import { FooterComponent } from './footer/footer.component';
import { FaqComponent } from './faq/faq.component';
import { QuiSommesNousComponent } from './qui-sommes-nous/qui-sommes-nous.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    ProfilComponent,
    FooterComponent,
    FaqComponent,
    QuiSommesNousComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatExpansionModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
