import { Component, OnInit } from "@angular/core";
import { FilterBarModel } from "../../models/filter-bar.model";
import { MessagingService } from "../../services/messaging.service";

@Component({
  selector: "results-filter-bar",
  templateUrl: "./results-filter-bar.component.html",
  styleUrls: ["./results-filter-bar.component.css"]
})
export class ResultsHeaderComponent implements OnInit {
  selector: string = "";

  constructor(
    public filterBarModel: FilterBarModel,
    public messageService: MessagingService
  ) {}

  ngOnInit(): void {
    this.messageService.filterMessage.subscribe(() => {
      console.log("message recieved", this.messageService.filterMessage);
      // if (Object.keys(this.filterBarModel.selectedSortBy).length === 0) {
      //   this.filterBarModel.selectedSortBy = this.filterBarModel.sortBys[0];
      // }
      this.selector = this.filterBarModel.selectedSortBy["displayName"];
    });
  }

  sortByChanged(i: number) {
    this.filterBarModel.selectedSortBy = this.filterBarModel.sortBys[i];
    this.selector = this.filterBarModel.selectedSortBy["displayName"];
    this.messageService.sendFilterMessage("Sort Changed");
  }

  unUseState() {
    this.filterBarModel.useState = false;
    this.filterBarModel.useCounty = false;
    this.messageService.sendFilterMessage("Use State Changed");
  }

  unUseCounty() {
    this.filterBarModel.useCounty = false;
    this.messageService.sendFilterMessage("Use State Changed");
  }

  unUseArticle(article: string) {
    this.filterBarModel.useArticle[article] = false;
    this.messageService.sendFilterMessage("Use State Changed");
  }

  unUseChannel(channel: string) {
    this.filterBarModel.useChannel[channel] = false;
    this.messageService.sendFilterMessage("Use State Changed");
  }

  unUseAllFilter() {
    this.filterBarModel.useState = false;
    this.filterBarModel.useCounty = false;
    for (let article of this.filterBarModel.articles) {
      this.filterBarModel.useArticle[article] = false;
    }

    for (let channel of this.filterBarModel.channels) {
      this.filterBarModel.useChannel[channel] = false;
    }

    this.messageService.sendFilterMessage("All Filters Changed");
  }
}
