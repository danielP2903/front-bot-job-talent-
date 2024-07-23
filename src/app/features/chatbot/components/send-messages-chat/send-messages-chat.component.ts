import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TypeChat } from '../../../../core/models/interfaces/messages';
import { GenerateInterviewService } from '../../../../core/services/interview/generate-interview.service';

@Component({
  selector: 'app-send-messages-chat',
  standalone: true,
  imports: [ReactiveFormsModule,InputTextareaModule, ButtonModule],
  templateUrl: './send-messages-chat.component.html',
  styleUrl: './send-messages-chat.component.scss'
})
export class SendMessagesChatComponent implements OnInit {
  @Output() valueChat = new EventEmitter<string>();
  formBuilder = inject(FormBuilder);
  serviceInterview = inject(GenerateInterviewService);
  formChat!:FormGroup;
  roleChat!:TypeChat;

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.formChat = this.formBuilder.group({
      message:['',[Validators.required, Validators.minLength(10)]]
    })
  }

  emitResponse() {
    if(this.formChat.valid){
      this.valueChat.emit(this.formChat.value.message)
    }
  }

}
