import { Component, EventEmitter, Output } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { Flows } from '../../constants/flows';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [DividerModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  @Output() option = new EventEmitter<Flows>();
}
