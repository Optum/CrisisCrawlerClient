import { Component, OnInit, Input } from '@angular/core';
import { FilterBarModel } from '../../../models/filter-bar.model';
import { MessagingService } from '../../../services/messaging.service';

@Component({
  selector: 'filter-article',
  styleUrls: ['./filter-article.component.css'],
  template:
  `
    <div class='row title'>Article Type</div>

    <div *ngFor='let article of filterBarModel.articles' class='row'>      
      <div class='check-column'>
        <input type='checkbox' id='{{article}}' [(ngModel)]='filterBarModel.useArticle[article]' (change)='useArticleChanged(article, $event.target.checked)'>
        <label for='{{article}}'></label>
      </div>
      <div class='label-column'>
        <label for='{{article}}'>{{ article }}</label>
      </div>
    </div>    
  `
})
export class FilterArticleComponent implements OnInit {
  @Input() articles : string[];

  constructor(public filterBarModel: FilterBarModel, private messageService: MessagingService) { }

  ngOnInit(): void {
  }

  useArticleChanged(key: string, value: boolean)
  {
    this.messageService.sendFilterMessage("Use " + value + " Changed");
  }
}
