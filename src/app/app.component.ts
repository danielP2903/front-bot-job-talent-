import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  NavigationStart, Router, RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  providers:[MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'front-hackaton-ia';
  router = inject(Router);
  currentRoute:string = '';
  previousRoute:string = '';

  ngOnInit() {
    this.subscribeRoute();
    if (window.performance.navigation.type == 1) {
      this.router.navigate(['ingresar']);

    }
  }

  subscribeRoute() {
    this.router.events.subscribe(data => {
      if(data instanceof NavigationStart){
        this.previousRoute = this.currentRoute;
        this.currentRoute = data.url;
        if(data.navigationTrigger === 'popstate'){
          this.checkActionPopstate();
        }

      }
    })
  }

  checkActionPopstate() {



    const isRouteOnApp = this.currentRoute.includes('ingresar') || this.currentRoute.includes('bienvenido');
    if(isRouteOnApp) {
      const userConfirmed = window.confirm('¿Esta acción lo sacará directamente de la aplicación, para navegar use solo los botones del app, aun asi, desea continuar?');
      if(userConfirmed === true) {
        this.router.navigate(['ingresar']);
        sessionStorage.clear();
      }else {
        this.router.navigate([this.previousRoute]);
      }
    }
  }
}
