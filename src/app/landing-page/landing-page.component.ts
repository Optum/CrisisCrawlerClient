import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  // templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  template: `
  
  <app-header-bar1></app-header-bar1>
  <app-nav-content></app-nav-content>
  <router-outlet></router-outlet>
  
  `
})

export class LandingPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
