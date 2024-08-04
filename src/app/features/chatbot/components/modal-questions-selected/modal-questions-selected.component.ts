import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Message } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-modal-questions-selected',
  standalone: true,
  imports: [DialogModule,ButtonModule,MessagesModule],
  templateUrl: './modal-questions-selected.component.html',
  styleUrl: './modal-questions-selected.component.scss'
})
export class ModalQuestionsSelectedComponent implements OnInit {

  @Input() showModal:boolean = false;
  @Input() isView:boolean = false;
  @Input() questions:string[] = [];
  @Output() saveInterview = new EventEmitter();
  @Output() closeModal = new EventEmitter();
  messages: Message[] = [];

  ngOnInit() {
    this.messages = [{severity:'warn',summary: 'A continuación se muestran las preguntas que seleccionó para la entrevista'}];
  }

  save() {
    this.saveInterview.emit();
  }
}
