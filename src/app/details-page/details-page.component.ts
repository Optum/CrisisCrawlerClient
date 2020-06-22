import { Component, OnInit, Input } from '@angular/core';
import { ResultModel } from '../models/result.model';
import { TwitterModel } from '../models/twitter.model';
import { FilterBarModel } from '../models/filter-bar.model';

@Component({
  selector: 'details-page',
  styleUrls: ['./details-page.component.css'],
  template:
  `
  <div id='details-page'>
    <details-header [title]='title' [showLegend]='type=="url"'></details-header>
    <url-details *ngIf='type=="url"'></url-details>    
    <twitter-details *ngIf='type=="tweet"' [tweet]='tweet' ></twitter-details>        
    <div class='link' (click)='openNewWindow(link)'>{{ link }}</div>
    <div class='footer'>
      <div class='links'>CONTACT US</div>
      <div class='links'>SITE MAP</div>
      <div class='links'>PRIVACY POLICY</div>
      <div class='links'>TERMS OF USE</div>
      <div class='copy'>&copy;2020 UnitedHealth Group. All Rights reserved.</div>                        
    </div>
  </div> 
  `
})
// <url-details *ngIf='type=="url"' [delta]='table' ></url-details>  

export class DetailsPageComponent implements OnInit {
  @Input() result: ResultModel;
  @Input() tweet: TwitterModel;

  type : string = "";
  title : string = "";
  table : string = "";
  link : string = "";

  constructor(private filterBarModel: FilterBarModel) { }

  ngOnInit(): void {
    // console.log("Check here --> ");
    console.log(history.state.type);

    this.type = history.state.type;

    if(this.type == 'url') {
      this.result = history.state.data;      
      this.title = this.result._source.previewText.title;
      // this.table = this.extractTable(this.result._source.htmldiff); 
      this.link = this.result._source.url;
      // this.filterBarModel.selectedResult = this.result;
    }
    // this.result = history.state.data; 
    // console.log("check here 1st");
    // console.log(this.result);

    if(this.type == 'tweet') {
      this.tweet = history.state.data;
      this.link = this.tweet._source.Permalink;
      this.title = this.tweet._source.SenderScreenName;
    }
  }

  extractTable(html: string) : string {
    var end = html.indexOf('</table>')

    return html.substring(0, end+8);
  }

  openNewWindow(url: string) {
    window.open(url, '_blank');
  }

}
