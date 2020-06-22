import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  template:
  `
  <div id='app-area'>
    <header-bar></header-bar>
    <router-outlet></router-outlet>
  </div>
  `
})

export class AppComponent {
  title = 'CrisisCrawler';
  
}
