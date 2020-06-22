import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error'; 
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'

const options = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Basic ' + btoa(environment.username+ ':' + environment.password)
  })
};

const url= environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private urlResults = url + '/state_*/_search';
  private urlTwitters = url + '/social_data/_search';  
  private urlCounties = url+ '/state_counties/_search'
  private urlFilters = url + '/filters/_search';

  constructor(private http: HttpClient) { }

  

  getFilters() {
    return this.http.get(this.urlFilters,options).pipe(
      retry(1), 
      catchError(this.handleError)
  )}

  getResults(query: string) {    
    return this.http.post(this.urlResults, JSON.parse(query), options ).pipe(
      retry(1), 
      catchError(this.handleError)
  )}
  
  getTwitters(query: string) {    
    return this.http.post(this.urlTwitters, JSON.parse(query), options).pipe(
      retry(1), 
      catchError(this.handleError)
  )}

  getFacebook(query: string) {    
    return this.http.post(this.urlTwitters, JSON.parse(query), options).pipe(
      retry(1), 
      catchError(this.handleError)
  )}

  getCountyMap(query: string) {    
    return this.http.post(this.urlCounties, JSON.parse(query), options ).pipe(
      retry(1), 
      catchError(this.handleError)
  )}

  private handleError(error: Response) {
    console.log(error);

    if (error.status === 404 )
      return Observable.throw(new NotFoundError());

    return Observable.throw(new AppError(error));
  }
}
