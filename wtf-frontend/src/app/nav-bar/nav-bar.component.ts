import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { connexionService } from '../services/connexion.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  providers:[connexionService]
})
export class NavBarComponent implements OnInit {

  constructor(public nav: NavbarService, private connexionService: connexionService) { }

  ngOnInit(): void {
  }

  logout() {
    return this.connexionService.logout();
  }

}
