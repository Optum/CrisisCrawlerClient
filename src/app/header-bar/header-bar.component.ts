import { Component, OnInit } from "@angular/core";
import { FilterBarModel } from "../models/filter-bar.model";
import { MessagingService } from "../services/messaging.service";

@Component({
  selector: "header-bar",
  styleUrls: ["./header-bar.component.css"],
  template: `
    <div id="header-bar">
      <div id="uhg-logo" routerLink=""></div>
      <div id="search">
        <input
          type="text"
          placeholder="Search"
          (keydown.enter)="$event.target.blur(); (false)"
          (blur)="searchBlurred($event.target.value)"
        />
      </div>
      <div
        id="map"
        (click)="
          openNewTab(
            'http://voyager.mhars2.optum.com/uhcbi/manual/c3684abf-22ad-6ca9-9575-66657df87984'
          )
        "
      >
        MAP VIEW
      </div>
    </div>
  `
})
export class HeaderBarComponent implements OnInit {
  constructor(
    private filterBarModel: FilterBarModel,
    private messageService: MessagingService
  ) {}

  ngOnInit(): void {}

  searchBlurred(value: string) {
    this.filterBarModel.searchText = value;
    if (
      this.filterBarModel.searchText &&
      this.filterBarModel.sortBys.length < 7
    ) {
      this.filterBarModel.sortBys.push({
        displayName: "Relevance",
        url: "_score",
        history: "_score",
        twitter: "_score",
        facebook: "",
        order: "desc"
      });
      this.filterBarModel.selectedSortBy = this.filterBarModel.sortBys[6];
    } else {
      if (
        !this.filterBarModel.searchText &&
        this.filterBarModel.sortBys.length == 7
      )
        this.filterBarModel.sortBys.pop();
    }
    console.log("msg sending - ", this.messageService.filterMessage);
    this.messageService.sendFilterMessage("Search Changed");
  }

  openNewTab(url: string) {
    window.open(url, "_blank");
  }
}
