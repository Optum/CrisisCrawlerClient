import { Component, OnInit, Input } from '@angular/core';
import { FilterBarModel } from 'src/app/models/filter-bar.model';

@Component({
  selector: 'details-header',
  templateUrl: './details-header.component.html',
  styleUrls: ['./details-header.component.css']
})
export class DetailsHeaderComponent implements OnInit {
  @Input() title: string = "Undefined";
  @Input() showLegend: string = "Undefined";

  constructor(public filterBarModel: FilterBarModel) { }

  ngOnInit(): void {
  }

}
