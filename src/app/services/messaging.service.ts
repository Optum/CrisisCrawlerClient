import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  private messageSource = new BehaviorSubject('default message');
  filterMessage = this.messageSource.asObservable();

  constructor() { }

  sendFilterMessage(message: string) {
    this.messageSource.next(message);
  }
}
