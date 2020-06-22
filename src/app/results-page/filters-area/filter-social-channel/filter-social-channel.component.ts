import { Component, OnInit, Input } from '@angular/core';
import { FilterBarModel } from '../../../models/filter-bar.model';
import { MessagingService } from '../../../services/messaging.service';

@Component({
  selector: 'filter-social-channel',
  styleUrls: ['./filter-social-channel.component.css'],
  template:
  `
    <div class='row title'>Channels</div>

    <div *ngFor='let channel of filterBarModel.channels' class='row'>
      <div class='check-column'>
        <input type='checkbox' id='{{ channel }}' [(ngModel)]='filterBarModel.useChannel[channel]' (change)='useArticleChanged(channel, $event.target.checked)'>
        <label for='{{channel}}'></label>
      </div>
      <div class='label-column'>
        <label for='{{channel}}'>{{ channel }}</label>
      </div>
    </div>    
  `
})

export class FilterSocialChannelComponent implements OnInit {
  @Input() channels : string[]

  constructor(public filterBarModel: FilterBarModel, private messageService: MessagingService) { }

  ngOnInit(): void {
  }

  useArticleChanged(key: string, value: boolean)
  {
    this.messageService.sendFilterMessage("Use " + value + " Changed");
  }
}
