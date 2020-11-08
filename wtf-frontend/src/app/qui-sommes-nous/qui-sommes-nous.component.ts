import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-qui-sommes-nous',
  templateUrl: './qui-sommes-nous.component.html',
  styleUrls: ['./qui-sommes-nous.component.css']
})
export class QuiSommesNousComponent implements OnInit {


  constructor(private nav: NavbarService) { nav.show() }

  ngOnInit(): void {
  }

}
