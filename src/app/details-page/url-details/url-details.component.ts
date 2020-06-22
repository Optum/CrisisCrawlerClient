import { Component, OnInit, Input, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ResultModel } from 'src/app/models/result.model';
import { FilterBarModel } from '../../models/filter-bar.model';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'url-details',
  styleUrls: ['./url-details.component.css'],
  encapsulation: ViewEncapsulation.None,
  template:
  `
  <div #widgetsContent id="scroll-history">
  <mat-spinner id='spinner' 
                 *ngIf='showHistorySpinner'
                 mode="indeterminate"
                 diameter="120"
                ></mat-spinner>
  <div id="delta-table" *ngFor="let member of results;let x = index">
  <div id="dt"><b>Updated On :</b>  {{this.datepipe.transform( toLocalTime(member._source.createdatetime), 'MM-dd-yyyy @ h:mm a')}} <div id="index"> <b> {{i*20 + x + 1}} </b> of <b>{{count}}</b></div></div>
  <div [innerHTML]=extractTable(member._source.htmldiff) ></div>
  
  </div>
  </div> 
  <div id="scroll-bar">
  <a id="next" *ngIf="i*20 + counter < count - 1" (click)= "scrollRight()">Next > </a> 
  <a id="previous" *ngIf="i*20 + counter > 0" (click)= "scrollLeft()">< Previous</a>
  </div> 
  `
})

// <div id="delta-table" [innerHTML]="delta">
//   </div>  

export class UrlDetailsComponent implements OnInit {
  @Input() result: ResultModel;
  @Input() delta : string;
  results: ResultModel[];
  tables: String[];
  showHistorySpinner: boolean = false;
  count: number;
  tot_pages: number;
  numbers: number[];
  i:number;
  counter:number=0;

  @ViewChild('widgetsContent', { read: ElementRef }) public widgetsContent: ElementRef<any>;
  
  constructor(private service: DataService, private filterBarModel: FilterBarModel, public datepipe: DatePipe) { 

  }

  ngOnInit(): void {
    this.i=0;
    this.counter=0;
    this.result = history.state.data;
    this.showHistorySpinner=true;
    this.filterBarModel.selectedResult = this.result;
    // this.showSpinner=true
    this.getResults(0);
    this.results =  Array.from(new Set(this.results));      
  }

  private getResults(index:number) { 
    // this.showHistorySpinner=true;
    this.service.getResults( this.filterBarModel.getURLHistoryQuery() )
      .subscribe( response =>  {
          this.count= response["hits"]["total"]["value"];
          this.results = response["hits"]["hits"];
          this.showHistorySpinner=false;
          this.filterBarModel.total_count=this.count;
          this.tot_pages= Math.ceil(this.count / this.filterBarModel.pageSize);
          this.numbers= Array(this.tot_pages).fill(1).map((x, i) => i + 1);
        }
      );
      // this.showSpinner=false;
  } 

  extractTable(html: string) : string {
    var end = html.indexOf('</table>')

    return html.substring(0, end+8);
  }

  public scrollRight(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft + 1600), behavior: 'smooth' });
    console.log(this.counter);
    this.counter+=1;
    if(this.counter == 20){
      console.log("counter reached 20")
      if(this.i < this.tot_pages){
        this.i++;
        this.filterBarModel.index=this.i;
        this.getResults(this.i);
        this.counter=0;
        this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft - (1600 * 20)), behavior: 'smooth' });
      }
    }
  }

  public scrollLeft(): void {
    // console.log(this.widgetsContent);
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft - 1600), behavior: 'smooth' });
    this.counter-=1;
    if(this.counter<0){
      console.log("fetch previous batch");
      if(this.i>0){
        this.i--;
        this.filterBarModel.index=this.i;
        this.getResults(this.i);
        this.counter=19;
        this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft + (1600 * 20)), behavior: 'smooth' });
      }
    }
  }

  toLocalTime(value: string): string{
    let offset = new Date().getTimezoneOffset()
    let utcDate = new Date(value);
    return utcDate.setMinutes(utcDate.getMinutes() - offset).toString();
  }
}
