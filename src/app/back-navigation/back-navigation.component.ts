import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'back-navigation',
  styleUrls: ['./back-navigation.component.css'],
  template: 
  `
  <div id='back-navigation' (click)='gotoRoute(url)'>
    {{ text }}    
  </div>
  `
})

export class BackNavigationComponent implements OnInit {
  @Input() text = "";  
  @Input() url = "/";

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  gotoRoute(url: string){
    this.router.navigateByUrl(url);
  }
}
