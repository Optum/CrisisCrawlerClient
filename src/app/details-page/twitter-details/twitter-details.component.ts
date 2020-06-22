import { Component, OnInit, Input } from '@angular/core';
import { TwitterModel } from 'src/app/models/twitter.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'twitter-details',
  templateUrl: './twitter-details.component.html',
  styleUrls: ['./twitter-details.component.css']
})

export class TwitterDetailsComponent implements OnInit {
  @Input() tweet: TwitterModel;
  score : number;  
  localDate : string;

  constructor(public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.score = Number(this.tweet._score);
    this.localDate = this.toLocalTime(this.tweet._source.CreatedTime);      
  }

  toLocalTime(value: string): string{
    let offset = new Date().getTimezoneOffset()
    let utcDate = new Date(value);
    return utcDate.setMinutes(utcDate.getMinutes() - offset).toString();
  }
}
