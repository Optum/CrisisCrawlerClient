import { Component, OnInit, Output, Input } from '@angular/core';
import { FilterBarModel } from '../../../models/filter-bar.model';
import { MessagingService } from '../../../services/messaging.service';

@Component({
  selector: 'filter-geography',
  styleUrls: ['./filter-geography.component.css'],
  template:

  `    
<div class='title'>Geography</div>

<div class='row'>
  <div class='check-column'>
    <input type="checkbox" id='use-state' 
      [(ngModel)]='filterBarModel.useState' 
      (change)='filterBarModel.useState?true:filterBarModel.useCounty=false; 
                this.messageService.sendFilterMessage("Use County Changed");'/>
                <label for='use-state'></label>
    </div>
  <div class='label-column'><label for='use-state'>State</label></div>
</div>

<div class='row'>
  <div class='select-wrapper'>
    <select id='state' (change)='stateChanged($event.target.value)' [(ngModel)]='this.filterBarModel.selectedState'>
      <option *ngFor='let state of filterBarModel.states' [value]='state'>{{ displayName(state) }}</option>
    </select>
  </div>
</div>

<div class='row'>
  <div class='check-column'>
    <input #county type="checkbox" id='use-county' 
      [(ngModel)]='filterBarModel.useCounty' 
      (change)='this.messageService.sendFilterMessage("Use County Changed");' 
      [disabled]='!filterBarModel.useState'
      />
      <label for='use-county'></label>
  </div>
  <div class='label-column'><label for='use-county'>County/City</label></div>
</div>

<div class='row'>
    <div class='select-wrapper'>
      <select id='county' 
        (change)='countyChanged($event.target.value)' 
        [(ngModel)]='this.filterBarModel.selectedCounty'
        >
        <option *ngFor='let county of filterBarModel.counties; let first = first;' [value]='county'>{{ displayName(county) }}</option>
      </select>
    </div>
</div>
  `
})
export class FilterGeographyComponent implements OnInit {
  constructor(public filterBarModel: FilterBarModel, public messageService: MessagingService) { }

  ngOnInit(): void {    

  }

  stateChanged(state: string)
  {    
    this.filterBarModel.counties = this.filterBarModel.countyMap[this.filterBarModel.selectedState];
    if(this.filterBarModel.counties.length > 0 ) {      
      this.filterBarModel.selectedCounty = this.filterBarModel.counties[0];
    }

    if(this.filterBarModel.useState) {
      this.messageService.sendFilterMessage("State Changed");
    }
  }

  countyChanged(county: string)
  {
    if(this.filterBarModel.useCounty) {
      this.messageService.sendFilterMessage("County Changed");
    }
  }

  displayName(name: string): string {    
    if(name.toLowerCase() =='usvi') return 'USVI';
    if(name.toLowerCase() =='washington dc') return 'Washington DC'; 
    if(name.toLowerCase() =='american samoa') return 'American Samoa';
    if(name.toLowerCase() =='puerto rico') return 'Puerto Rico';
    if(name.toLowerCase().startsWith('new ')) return "New " + name.charAt(4).toUpperCase() + name.slice(5).toLowerCase();
    if(name.toLowerCase().startsWith('west ')) return "West " + name.charAt(5).toUpperCase() + name.slice(6).toLowerCase();
    if(name.toLowerCase().startsWith('north ')) return "North " + name.charAt(6).toUpperCase() + name.slice(7).toLowerCase();
    if(name.toLowerCase().startsWith('south ')) return "South " + name.charAt(6).toUpperCase() + name.slice(7).toLowerCase();
    if(name.toLowerCase().startsWith('rhode ')) return "South " + name.charAt(6).toUpperCase() + name.slice(7).toLowerCase();

    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()

    return name;
  }
}
