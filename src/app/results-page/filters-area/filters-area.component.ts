import { Component, OnInit, Output } from "@angular/core";
import { DataService } from "../../services/data.service";
import { FilterModel } from "../../models/filter.model";
import { FilterBarModel } from "src/app/models/filter-bar.model";
import { countyMapModel } from "src/app/models/county-map.model";
import { MessagingService } from "../../services/messaging.service";

@Component({
  selector: "filters-area",
  styleUrls: ["./filters-area.component.css"],
  template: `
    <div id="filters-area">
      <back-navigation
        text="Crisis Intelligence Home Page"
        url=""
      ></back-navigation>
      <div class="spacer"></div>
      <filter-geography></filter-geography>
      <filter-article></filter-article>
      <filter-social-channel></filter-social-channel>
      <subscribe></subscribe>
    </div>
  `
})
export class FiltersAreaComponent implements OnInit {
  constructor(
    private dataService: DataService,
    public filterBarModel: FilterBarModel,
    public messageService: MessagingService
  ) {}

  ngOnInit(): void {
    if (Object.keys(this.filterBarModel.selectedSortBy).length === 0) {
      this.filterBarModel.selectedSortBy = this.filterBarModel.sortBys[0];
    }
    this.getData();
  }

  private getData() {
    let filteredCounties: Array<string> = [];

    this.dataService
      .getCountyMap('{"from":0, "size":100}')
      .subscribe(response => {
        let countyMap: countyMapModel[] = response["hits"]["hits"];
        for (let map of countyMap) {
          for (let county of map._source.counties) {
            if (county.toLowerCase() !== "nan") filteredCounties.push(county);
          }
          this.filterBarModel.countyMap[map._source.state] = filteredCounties;
          filteredCounties = [];
        }
        this.getFilterBarData();
      });
  }

  private getFilterBarData() {
    this.dataService.getFilters().subscribe(response => {
      let filterData: FilterModel[] = response["hits"]["hits"];

      for (let filter of filterData) {
        switch (filter._source.filter_type.toLocaleUpperCase()) {
          case "STATE":
            this.filterBarModel.states = filter._source.filter_values;
            if (!this.filterBarModel.selectedState) {
              this.filterBarModel.selectedState = this.filterBarModel.states[0];
              this.filterBarModel.counties = this.filterBarModel.countyMap[
                this.filterBarModel.selectedState
              ];
              if (this.filterBarModel.counties.length > 0)
                this.filterBarModel.selectedCounty = this.filterBarModel.counties[0];
            }
            break;

          case "COUNTYTAG":
            break;

          case "CHANNELTAG":
            this.filterBarModel.channels = filter._source.filter_values;
            break;

          case "CONTENTTAG":
            this.filterBarModel.articles = filter._source.filter_values;
            break;

          default:
            break;
        }
      }
    });
  }
}
