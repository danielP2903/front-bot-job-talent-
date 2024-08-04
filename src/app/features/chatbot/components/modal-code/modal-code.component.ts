import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-modal-code',
  standalone: true,
  imports: [DialogModule,ButtonModule],
  templateUrl: './modal-code.component.html',
  styleUrl: './modal-code.component.scss'
})
export class ModalCodeComponent {
  @Input() showModal:boolean = false;
  @Input() code!:string;
  @Output() closeModal = new EventEmitter();
}
