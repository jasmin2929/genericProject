import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * SpinnerService shows/hides loading progress of HTTP request
 */
@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  visibility = new BehaviorSubject(false);

  constructor() {
  }

  show() {
    this.visibility.next(true);
  }

  hide() {
    this.visibility.next(false);
  }
}
