import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private nav: NavbarService) { nav.show() }

  ngOnInit(): void {
  }

}
