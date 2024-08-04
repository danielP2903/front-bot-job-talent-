import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private isCharging$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  showLoader() {
    this.isCharging$.next(true);
  }

  stopLoader() {
    this.isCharging$.next(false);
  }

  getLoader():Observable<boolean> {
    return this.isCharging$.asObservable();
  }
}
