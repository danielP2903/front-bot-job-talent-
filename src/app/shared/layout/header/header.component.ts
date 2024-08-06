import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { RouteService } from '../../../core/services/route/route.service';
import { SplitButtonModule } from 'primeng/splitbutton';
import { Router } from '@angular/router';
import { KEY_STORAGE } from '../../constants/key-storage';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, TooltipModule,SplitButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{


  routerService = inject(RouteService);
  router = inject(Router);
  isLogged = false;
  ngOnInit(): void {
   this.verifyLogged();
  }

  items = [
    {
      label:'Menú Principal',
      icon:'pi pi-home',
      command:() => {this.redirectMenu()}
    },
    {
      label:'Cerrar Sesión',
      icon:'pi pi-sign-out',
      command:() => {this.closeSession()}
    }
  ]

  redirectMenu() {
    const data = {redirect:true}
    this.routerService.setRedirect({...data});
  }

  closeSession() {
    sessionStorage.clear();
    this.router.navigate(['ingresar']);
  }
  verifyLogged() {
    if(sessionStorage.getItem(KEY_STORAGE.token)){
      this.isLogged = true;
    }else {
      this.isLogged =false;
    }
  }
}
