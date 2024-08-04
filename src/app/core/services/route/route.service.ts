import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Flows } from '../../../shared/constants/flows';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  private homeRoute$ = new BehaviorSubject<{redirect:boolean}>({redirect:false});
  private redirectFlow$ = new BehaviorSubject<Flows>(Flows.menu);
  constructor() { }

  setRedirect(data:{redirect:boolean}) {
    this.homeRoute$.next(data);
  }

  getEventRedirectHome() {
    return this.homeRoute$.asObservable();
  }

  setFlowRedirect(flow:Flows) {
    this.redirectFlow$.next(flow);
  }

  getFlowRedirect() {
    return this.redirectFlow$.asObservable();
  }
}
