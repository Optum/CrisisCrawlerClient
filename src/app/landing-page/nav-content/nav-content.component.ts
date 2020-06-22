import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-content',
  templateUrl: './nav-content.component.html',
  styleUrls: ['./nav-content.component.css']
})
export class NavContentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public Clicked(url: string){
    window.open(url, "_blank");
  }

}
