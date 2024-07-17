import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-send-messages-chat',
  standalone: true,
  imports: [ReactiveFormsModule,InputTextareaModule, ButtonModule],
  templateUrl: './send-messages-chat.component.html',
  styleUrl: './send-messages-chat.component.scss'
})
export class SendMessagesChatComponent implements OnInit {


  formBuilder = inject(FormBuilder);

  formChat!:FormGroup;

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.formChat = this.formBuilder.group({
      message:['',[Validators.required, Validators.minLength(1)]]
    })
  }
}
