import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ResultModel } from 'src/app/models/result.model';
import { TwitterModel } from 'src/app/models/twitter.model';
import { FilterBarModel } from '../../models/filter-bar.model';
import { MessagingService } from 'src/app/services/messaging.service';

@Component({
  selector: 'results-area',
  styleUrls: ['./results-area.component.css'],
  template:
  `
  <div id='results-area-in'>
    <div class='spacer'></div>    
    <mat-spinner id='spinner' 
                 *ngIf='showSpinner'
                 mode="indeterminate"
                 diameter="120"
                ></mat-spinner>
    <result *ngFor="let result of results" [result] = "result"></result>
    <tweet *ngFor="let tweet of tweets" [tweet] = "tweet"></tweet>
    <div id='no-results' *ngIf='!(hasResults() || showSpinner)'>
      No Results Found
  </div>
  <div>
  <div id="pagination-bar" *ngIf="tot_pages>1">
    <a id="previous" *ngIf="i > 0" (click)= "prevPage()"><img src="../../../assets/left-arrow.png"/> Previous</a>
    <div id="pages">
      <div id="page" *ngFor="let n of numbers">
        <a (click)="goto(n)" [class.active]="n==selectedPage"> {{n}} </a>
      </div>
    </div>
    <a id="ellipsis" *ngIf="tot_pages > 10">...</a>
    <a id="last" *ngIf="tot_pages > 10" (click)="goto(tot_pages)"  [class.active]="selectedPage==tot_pages">Last </a>
    <a id="next" *ngIf="i < tot_pages - 1" (click)= "nextPage()">Next <img src="../../../assets/left-arrow.png"/></a>
  </div>
  `
})

// [routerLink]="" [routerLinkActive]="['active']"
// 

export class ResultsAreaComponent implements OnInit {
  posts: any;
  count: number;
  selectedPage: number=1;
  i: number ;
  tot_pages: number;
  numbers: number[];
  color: string = "black";
  showSpinner: boolean = false;
  results: ResultModel[];
  tweets: TwitterModel[];
  facebooks: TwitterModel[];  

  constructor(private service: DataService, private filterBarModel: FilterBarModel, private messageService: MessagingService) { 

  }

  ngOnInit(): void {
    this.messageService.filterMessage.subscribe(()=> 
      { 
        this.clearResults();
        this.i=0;
        this.filterBarModel.index=this.i;
        this.selectedPage= 1;
        if((!this.filterBarModel.useChannel['URL'] && !this.filterBarModel.useChannel['Twitter'] && !this.filterBarModel.useChannel['Facebook']))
          this.getResults(0);
        if(this.filterBarModel.useChannel['URL'] )
          this.getResults(0);
        if( this.filterBarModel.useChannel['Twitter'] || this.filterBarModel.useChannel['Facebook'])
          this.getTwitters(0);
      });
  }

  hasResults(): boolean {
    return (this.tweets.length > 0) || (this.results.length > 0);
  }

  private clearResults(){
    this.showSpinner = true;
    this.tweets = [];
    this.results = [];
  }

  private getTwitters(index: number) {
    this.service.getTwitters( this.filterBarModel.getTwitterQuery() )
      .subscribe( response =>  {
          this.count= response["hits"]["total"]["value"];
          this.showSpinner = false;
          console.log(this.count);
          this.filterBarModel.total_count=this.count;
          // this.filterBarModel.index=index;
          this.tot_pages= Math.ceil(this.count / this.filterBarModel.pageSize);
          this.numbers= Array(this.tot_pages).fill(1).map((x, i) => i + 1);
          this.tweets = response["hits"]["hits"];

          this.filterBarModel.max_score= response["hits"]["max_score"];
      });
  }

  private getResults(index: number) {    
    this.service.getResults( this.filterBarModel.getURLQuery() )
      .subscribe( response =>  {
          this.count= response["hits"]["total"]["value"];
          console.log(this.count);
          this.filterBarModel.total_count=this.count;
          // this.filterBarModel.index=index;
          this.tot_pages= Math.ceil(this.count / this.filterBarModel.pageSize);
          this.numbers= Array(this.tot_pages).fill(1).map((x, i) => i + 1);
          this.results = response["hits"]["hits"];
          this.showSpinner = false;
          
          this.filterBarModel.max_score= response["hits"]["max_score"];
      } );
  } 
  
  private getAll(){
    this.service.getResults(this.filterBarModel.getURLQuery())
        .subscribe(response => {
          this.count= response["hits"]["total"]["value"];
          this.results = response["hits"]["hits"];
        });
    this.service.getTwitters( this.filterBarModel.getTwitterQuery() )
        .subscribe( response =>  {
          // this.count= response["hits"].total.value;
          this.tweets = response["hits"]["hits"];
    });
    this.showSpinner = false;
    // console.log(this.count);
    console.log(this.count);
    this.filterBarModel.total_count=this.count;
  }

  public nextPage(){
    console.log(this.i);
    this.i = this.i + 1;
    this.selectedPage= this.i + 1;
    console.log(this.selectedPage);
    this.filterBarModel.index=this.i;
    this.clearResults();
    if((!this.filterBarModel.useChannel['URL'] && !this.filterBarModel.useChannel['Twitter'] && !this.filterBarModel.useChannel['Facebook']))
          this.getResults(this.i);
    if(this.filterBarModel.useChannel['URL'] )
          this.getResults(this.i);
    if( this.filterBarModel.useChannel['Twitter'] || this.filterBarModel.useChannel['Facebook'])
          this.getTwitters(this.i);
  }

  public prevPage(){
    this.i = this.i - 1;
    this.selectedPage= this.i + 1;
    this.filterBarModel.index=this.i;
    this.clearResults();
    if((!this.filterBarModel.useChannel['URL'] && !this.filterBarModel.useChannel['Twitter'] && !this.filterBarModel.useChannel['Facebook']))
          this.getResults(this.i);
    if(this.filterBarModel.useChannel['URL'] )
          this.getResults(this.i);
    if( this.filterBarModel.useChannel['Twitter'] || this.filterBarModel.useChannel['Facebook'])
          this.getTwitters(this.i);
  }

  public goto(n: number){
    this.selectedPage= n;
    this.i=n-1;
    this.filterBarModel.index=this.i;
    this.clearResults();
    if((!this.filterBarModel.useChannel['URL'] && !this.filterBarModel.useChannel['Twitter'] && !this.filterBarModel.useChannel['Facebook']))
          this.getResults(this.i);
    if(this.filterBarModel.useChannel['URL'] )
          this.getResults(this.i);
    if( this.filterBarModel.useChannel['Twitter'] || this.filterBarModel.useChannel['Facebook'])
          this.getTwitters(this.i);
  }
}
