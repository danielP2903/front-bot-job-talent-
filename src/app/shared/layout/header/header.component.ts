import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { RouteService } from '../../../core/services/route/route.service';
import { SplitButtonModule } from 'primeng/splitbutton';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, TooltipModule,SplitButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  routerService = inject(RouteService);
  router = inject(Router);

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
}
