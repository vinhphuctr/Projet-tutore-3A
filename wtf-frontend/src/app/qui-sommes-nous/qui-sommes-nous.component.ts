import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qui-sommes-nous',
  templateUrl: './qui-sommes-nous.component.html',
  styleUrls: ['./qui-sommes-nous.component.css']
})
export class QuiSommesNousComponent implements OnInit {



  members: { title: string, subtitle: string, content: string, url: string }[] = [
    { title: 'Alexis PETRAZ', subtitle: 'Subtitle', content: 'Content here', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg' },
    { title: 'Vinh Phuc TRUONG', subtitle: 'Subtitle', content: 'Content here', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg' },
    { title: 'Julien GODEST', subtitle: 'Subtitle', content: 'Content here', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg' },
    { title: 'Julie HUA ', subtitle: 'Subtitle', content: 'Content here', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg' },
    { title: 'Baptiste AUBERT', subtitle: 'Subtitle', content: 'Content here', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg' },
    { title: 'Rémi MARTINEZ', subtitle: 'Subtitle', content: 'Content here', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg' },
   
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
