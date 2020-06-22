import { ResultModel } from "./result.model";

export class FilterBarModel {
  pageSize: number = 20;
  total_count: number;
  index: number;

  relevant: number;
  max_score: number;

  states = [];
  cities = [];
  counties = [];
  articles = [];
  channels = [];

  useState = false;
  useCounty = false;
  countyMap = {};
  useArticle: object = {};
  useChannel: object = {};

  searchText: string = "";

  selectedState: string = "";
  selectedCounty: string = "";
  selectedSortBy: object = {};
  selectedResult: ResultModel;

  sortBys: object[] = [
    {
      displayName: "Date: Newest First",
      url: "createdatetime",
      history: "createdatetime",
      twitter: "CreatedTime",
      facebook: "",
      order: "desc"
    },

    {
      displayName: "Date: Oldest First",
      url: "createdatetime",
      history: "createdatetime",
      twitter: "CreatedTime",
      facebook: "",
      order: "asc"
    },

    {
      displayName: "Title: A-Z",
      url: "title.keyword",
      history: "title.keyword",
      twitter: "SenderScreenName.keyword",
      facebook: "",
      order: "desc"
    },

    {
      displayName: "Title: Z-A",
      url: "title.keyword",
      history: "title.keyword",
      twitter: "SenderScreenName.keyword",
      facebook: "",
      order: "asc"
    },

    {
      displayName: "URL: A-Z",
      url: "url",
      history: "url",
      twitter: "Permalink.keyword",
      facebook: "",
      order: "asc"
    },

    {
      displayName: "URL: Z-A",
      url: "url",
      history: "url",
      twitter: "Permalink.keyword",
      facebook: "",
      order: "desc"
    }
  ];

  getURLQuery(): string {
    return this.getQuery("url");
  }

  getTwitterQuery(): string {
    //return this.getQuery('twitter');
    let query: object = { query: { bool: { must: [] } } };
    let must: Array<object> = query["query"]["bool"]["must"];

    if (this.useState)
      must.push({ term: { State: this.selectedState.toLowerCase() } });

    if (this.useCounty && this.countyMap[this.selectedState].length > 0)
      must.push({ term: { City: this.selectedCounty.toLowerCase() } });

    if (this.useChannel["Twitter"] && this.useChannel["Facebook"]) {
    } else if (this.useChannel["Twitter"])
      must.push({ term: { SocialNetwork: "twitter" } });
    else if (this.useChannel["Facebook"])
      must.push({ term: { SocialNetwork: "facebook" } });

    if (!this.searchText) {
      this.relevant = 0;
    }

    if (this.searchText) {
      this.relevant = 1;
      must.push({
        multi_match: {
          query: this.searchText,
          fields: ["Message"],
          fuzziness: "AUTO"
        }
      });
    }

    // if (this.searchText && this.sortBys.length < 7) {
    //   this.sortBys.push({
    //     displayName: "Relevance",
    //     url: "_score",
    //     history: "_score",
    //     twitter: "_score",
    //     facebook: "",
    //     order: "desc"
    //   });
    //   this.selectedSortBy = this.sortBys[6];
    // } else {
    //   if (!this.searchText && this.sortBys.length == 7) this.sortBys.pop();
    // }

    for (let article of this.articles) {
      if (this.useArticle[article]) {
        let queries = this.getQueries(must);
        queries.push({ term: { contentType: article.toLowerCase() } });
      }
    }

    let key = this.selectedSortBy["twitter"];
    let value = this.selectedSortBy["order"];
    let sort = {};
    sort[key] = value;

    query["sort"] = [sort];
    query["track_scores"] = true;
    query["from"] = this.index * this.pageSize;
    query["size"] = this.pageSize;

    console.log(JSON.stringify(query));
    return JSON.stringify(query);
  }

  getURLHistoryQuery(): string {
    return this.getQuery("history");
  }

  private getQuery(channel: string): string {
    // if(JSON.stringify(this.selectedSortBy)==='{}'){
    //   console.log("setting sort by");
    //   if(this.searchText)
    //     this.selectedSortBy= this.sortBys[6];
    //   else
    //     this.selectedSortBy= this.sortBys[0];
    // }

    let query: object = { query: { bool: { must: [] } } };
    let must: Array<object> = query["query"]["bool"]["must"];

    if (this.useState)
      must.push({
        term: { state: this.selectedState.toLowerCase().replace(/ /g, "_") }
      });

    if (this.useCounty && this.countyMap[this.selectedState].length > 0)
      must.push({
        term: { county: this.selectedCounty.toLowerCase().replace(/ /g, "_") }
      });

    if (!this.searchText) {
      this.relevant = 0;
    }

    if (this.searchText) {
      this.relevant = 1;
      must.push({
        multi_match: {
          query: this.searchText,
          fields: ["htmldiff", "title^10"]
        }
      });
    }

    // if (this.searchText && this.sortBys.length < 7) {
    //   this.sortBys.push({
    //     displayName: "Relevance",
    //     url: "_score",
    //     history: "_score",
    //     twitter: "_score",
    //     facebook: "",
    //     order: "desc"
    //   });
    //   this.selectedSortBy = this.sortBys[6];
    // } else {
    //   if (!this.searchText && this.sortBys.length == 7) this.sortBys.pop();
    // }

    for (let article of this.articles) {
      if (this.useArticle[article]) {
        let queries = this.getQueries(must);
        queries.push({ term: { contentType: article.toLowerCase() } });
      }
    }

    if (channel == "history") {
      must.push({ term: { url: this.selectedResult._source.url } });
      must.push({
        range: {
          createdatetime: { lte: this.selectedResult._source.createdatetime }
        }
      });
    }

    // Sloppy bit of code. We could replace this with a beautiful data structure
    // if we hard coded channels to the client.
    let key = this.selectedSortBy[channel];
    let value = {};
    value["order"] = this.selectedSortBy["order"];
    let sort = {};
    sort[key] = value;

    if (channel == "url" || channel == "history") query["sort"] = [sort];

    console.log(this.index);

    query["track_scores"] = true;
    query["from"] = this.index * this.pageSize;
    query["size"] = this.pageSize;

    console.log(this.total_count);

    console.log(JSON.stringify(query));
    return JSON.stringify(query);
  }

  private getQueries(must: Array<object>): Array<object> {
    let queries: Array<object>;

    for (let obj of must) {
      if (obj["dis_max"]) return obj["dis_max"]["queries"];
    }

    let len = must.push({ dis_max: { queries: [] } });
    return must[len - 1]["dis_max"]["queries"];
  }
}
