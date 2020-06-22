import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { ResultModel } from 'src/app/models/result.model';
import { DatePipe } from '@angular/common';
import { FilterBarModel } from '../../../models/filter-bar.model';

@Component({
  selector: 'result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})

export class ResultComponent implements OnInit {
  @Input() result : ResultModel;
  score : number;
  max_score: number;
  localDate : string;
  relevant: number=0;

  constructor(private router: Router, public datepipe: DatePipe, private filterBarModel: FilterBarModel) { }

  ngOnInit(): void {    
    this.score = Number(this.result._score);   
    this.relevant= this.filterBarModel.relevant;  
    this.max_score=  this.filterBarModel.max_score;
    this.localDate = this.toLocalTime(this.result._source.createdatetime)
  }

  public openNewTab(url: string) {
    window.open(url, '_blank');
    window.event.stopImmediatePropagation();
  }

  public showDetails(result: ResultModel) { 
    // let url= this.router.serializeUrl(this.router.createUrlTree(['/details',{ state: {data: result, type: "url" }}]));
    // this.openNewTab(url);
    this.router.navigate(['/details'], { state: {data: result, type: "url" }});
  }

  toLocalTime(value: string): string{
    let offset = new Date().getTimezoneOffset()
    let utcDate = new Date(value);
    return utcDate.setMinutes(utcDate.getMinutes() - offset).toString();
  }
}
