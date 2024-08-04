import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
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
export class SendMessagesChatComponent  {
  @Output() valueChat = new EventEmitter<string>();
  @Input() set disable(value:boolean) {
    this.initializeForm();
    if(value){
      this.disableChat = value;
      this.formChat.controls['message'].disable();
    }else {
      this.disableChat = value;
      this.formChat.controls['message'].enable();
    }
  }
  formBuilder = inject(FormBuilder);
  serviceInterview = inject(GenerateInterviewService);
  formChat!:FormGroup;
  roleChat!:TypeChat;
  disableChat:boolean = false;



  initializeForm() {
    if(!this.formChat){
      this.formChat = this.formBuilder.group({
        message:['',[Validators.required, Validators.minLength(10)]]
      })
    }
  }

  emitResponse() {
    if(this.formChat.valid){
      this.valueChat.emit(this.formChat.value.message)
      this.formChat.reset();
    }
  }

}
