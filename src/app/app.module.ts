import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { FiltersAreaComponent } from './results-page/filters-area/filters-area.component';
import { ResultsAreaComponent } from './results-page/results-area/results-area.component';
import { ResultsHeaderComponent } from './results-page/results-filter-bar/results-filter-bar.component';
import { ResultComponent } from './results-page/results-area/result/result.component';
import { FilterGeographyComponent } from './results-page/filters-area/filter-geography/filter-geography.component';
import { FilterArticleComponent } from './results-page/filters-area/filter-article/filter-article.component';
import { FilterTransportationComponent } from './results-page/filters-area/filter-transportation/filter-transportation.component';
import { FilterTimeComponent } from './results-page/filters-area/filter-time/filter-time.component';
import { SubscribeComponent } from './results-page/filters-area/subscribe/subscribe.component';
import { DataService } from './services/data.service';
import { AppErrorHandler } from './common/app-error-handler';
import { BackNavigationComponent } from './back-navigation/back-navigation.component';
import { FilterSocialChannelComponent } from './results-page/filters-area/filter-social-channel/filter-social-channel.component';
import { ResultsPageComponent } from './results-page/results-page.component';
import { DetailsPageComponent } from './details-page/details-page.component'; 
import { UrlDetailsComponent } from './details-page/url-details/url-details.component'
import { FilterBarModel } from './models/filter-bar.model';
import { MessagingService } from './services/messaging.service';
import { DetailsHeaderComponent } from './details-page/details-header/details-header.component';
import { DatePipe } from '@angular/common';
import { TweetComponent } from './results-page/results-area/tweet/tweet.component';
import { TwitterDetailsComponent } from './details-page/twitter-details/twitter-details.component';
import { HeaderBar1Component } from './landing-page/header-bar1/header-bar1.component';
import { NavContentComponent } from './landing-page/nav-content/nav-content.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    HeaderBarComponent,
    FiltersAreaComponent,
    ResultsAreaComponent,
    ResultsHeaderComponent,
    ResultComponent,
    FilterGeographyComponent,
    FilterArticleComponent,
    FilterTransportationComponent,
    FilterTimeComponent,
    SubscribeComponent,
    BackNavigationComponent,
    FilterSocialChannelComponent,
    ResultsPageComponent,
    DetailsHeaderComponent,
    DetailsPageComponent,
    UrlDetailsComponent,
    TweetComponent,
    TwitterDetailsComponent,
    HeaderBar1Component,
    NavContentComponent,
    LandingPageComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot([
      { path: '', component: LandingPageComponent},
      { path: 'results', component: ResultsPageComponent },
      { path: 'details', component: DetailsPageComponent },
      { path: '**', component: LandingPageComponent }
    ])
  ],
  providers: [
    DatePipe,
    FilterBarModel,
    DataService,
    MessagingService,
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
