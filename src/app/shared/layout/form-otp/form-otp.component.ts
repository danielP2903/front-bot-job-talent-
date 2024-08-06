import { Component, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { InputOtpModule } from 'primeng/inputotp';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CommonService } from '../../../core/services/common/common.service';
import { QuestionsService } from '../../../core/services/questions/questions.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MessagesError } from '../../constants/messages';
import { ToastModule } from 'primeng/toast';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { KEY_STORAGE } from '../../constants/key-storage';
@Component({
  selector: 'app-form-otp',
  standalone: true,
  imports: [InputOtpModule,FormsModule,InputTextModule,FloatLabelModule,DialogModule,ButtonModule, ToastModule,ReactiveFormsModule],
  providers:[MessageService],
  templateUrl: './form-otp.component.html',
  styleUrl: './form-otp.component.scss'
})
export class FormOtpComponent implements OnInit {

  @Input() showModal:boolean = false;
  @Output() closeModal = new EventEmitter();

  value: string = '';
  form!:FormGroup;
  step = signal<number>(1);
  textAction = 'Ingresa tus datos';

  formBuilder = inject(FormBuilder);
  questionService = inject(QuestionsService);
  commonService = inject(CommonService);
  messageService = inject(MessageService);
  router = inject(Router);


  setCode(){

    if(this.value.length === 8) {
      this.commonService.setPersistentData('otp',this.value);
      this.setDataUser();
      this.validateCode();
      this.value = '';
      this.closeModal.emit();
    }
  }
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      email:['',Validators.compose([Validators.email,Validators.required])],
      names:['',Validators.compose([Validators.minLength(3), Validators.required])]
    })
  }

  validateCode() {
    this.questionService.validateCodeInterview(this.value).subscribe(data => {
       this.setInterviewInMemory(data.data.questions,data.data.titleVacancy);
       this.redirectChatBot();
    },err => {
      console.log(err);

      if(err.error?.statusCode === 400){

        this.messageService.add({ severity: 'error', summary: MessagesError.title, detail: err.error.messageException });
      }else {
        this.messageService.add({ severity: 'error', summary: MessagesError.title, detail: MessagesError.generalError });

      }
    })
  }
  nextStep(){
    this.step.set(2);
    this.textAction = 'Ingresa el código para presentar la entrevista.'
  }

  setInterviewInMemory(questions:string[],vacancy:string) {
    this.commonService.setPersistentData('questions',{questions,vacancy})
  }

  setDataUser() {
    const dataUser = {
      email: this.form.controls['email'].value,
      names:this.form.controls['names'].value
    }
    console.log(dataUser);
    this.commonService.setPersistentData('presenterInterview',dataUser);
    console.log(this.commonService.getPersistentData('presenterInterview'));

  }

  redirectChatBot() {
    sessionStorage.setItem(KEY_STORAGE.token,'isPresenter');
    this.router.navigate(['chat']);
  }

}
