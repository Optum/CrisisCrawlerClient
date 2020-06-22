import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'results-page',
  styleUrls: ['./results-page.component.css'],
  template: 
  `
  <div id='results-page'>
    <filters-area></filters-area>
    <results-filter-bar></results-filter-bar> 
    <results-area></results-area>     
  </div>
  `
})
export class ResultsPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
