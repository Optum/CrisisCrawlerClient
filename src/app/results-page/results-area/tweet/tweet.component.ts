import { Component, OnInit, Input } from '@angular/core';
import { TwitterModel } from 'src/app/models/twitter.model';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { FilterBarModel } from '../../../models/filter-bar.model';

@Component({
  selector: 'tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {
  @Input() tweet : TwitterModel;
  score : number;
  localDate : string;
  relevant: number=0;
  max_score: number;

  constructor(private router: Router, public datepipe: DatePipe, private filterBarModel: FilterBarModel) { }

  ngOnInit(): void {    
    this.score = Number(this.tweet._score);
    this.relevant= this.filterBarModel.relevant;  
    this.max_score=  this.filterBarModel.max_score;
    this.localDate = this.toLocalTime(this.tweet._source.CreatedTime);  
  }

  public openNewTab(url: string) {
    window.open(url, '_blank');    
    window.event.stopImmediatePropagation();
  }

  public showDetails(tweet: TwitterModel) {    
    this.router.navigate(['/details'], { state: {data: tweet, type: 'tweet' }});
  }

  toLocalTime(value: string): string{
    let offset = new Date().getTimezoneOffset()
    let utcDate = new Date(value);
    return utcDate.setMinutes(utcDate.getMinutes() - offset).toString();
  }
}
