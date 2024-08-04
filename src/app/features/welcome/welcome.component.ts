import { Component, inject } from '@angular/core';
import { CenterLayoutComponent } from '../../shared/layout/center-layout/center-layout.component';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { Options_Welcome } from '../../shared/constants/options-welcome';
import { Router } from '@angular/router';
@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CenterLayoutComponent,CarouselModule,ButtonModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {

  router = inject(Router);
  options = Options_Welcome;
  responsiveOptions = [
    {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
    },
    {
        breakpoint: '991px',
        numVisible: 1,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
    }
];

  redirectLogin() {
    this.router.navigate(['ingresar']);
  }

}
