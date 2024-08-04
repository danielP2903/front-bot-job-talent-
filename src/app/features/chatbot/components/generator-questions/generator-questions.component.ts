import { Component, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { CreateSessionService } from '../../../../core/services/session/create-session.service';
import { LoaderService } from '../../../../core/services/loader/loader.service';
import { LoaderComponent } from '../../../../shared/layout/loader/loader.component';
import { AsyncPipe } from '@angular/common';
import { CommonService } from '../../../../core/services/common/common.service';
import { Messages, MessagesError } from '../../../../shared/constants/messages';
import { ModalQuestionsSelectedComponent } from '../modal-questions-selected/modal-questions-selected.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-generator-questions',
  standalone: true,
  providers:[MessageService],
  imports: [CardModule,ToastModule, ButtonModule,RatingModule,FormsModule, LoaderComponent,AsyncPipe, ModalQuestionsSelectedComponent],
  templateUrl: './generator-questions.component.html',
  styleUrl: './generator-questions.component.scss'
})
export class GeneratorQuestionsComponent implements OnInit {

  sessionService = inject(CreateSessionService);
  loaderService = inject(LoaderService);
  commonService = inject(CommonService);
  messageService = inject(MessageService);

  value: number = 0;
  counterQuestions = signal<number>(0);
  idSession = signal<string>('');
  question:string = ''
  questionsSave:string[] = [];
  isCharge!:boolean;
  viewModal:boolean = false;
  @Input() set Question(value:string) {
    if(value && value !== ''){
      this.updateCounter();
      this.question = value;
    }
  }
  @Output() dataGenerateQuestion = new EventEmitter<{id:string,isSendJob:boolean}>();
  @Output() error = new EventEmitter<void>();
  @Output() questionsSelected = new EventEmitter<string[]>();

  ngOnInit(): void {
    this.createSession();
  }
  saveQuestion() {
    this.value += 1;
    this.questionsSave.push(this.question);
    this.verifyQuantityQuestions();
  }

  updateCounter() {
    this.counterQuestions.update(val => val + 1);
  }

  verifyQuantityQuestions() {
    if(this.questionsSave.length === 5) {
      this.viewModal = true;
    } else{
      this.generateQuestion();
    }
  }

  createSession() {
    this.loaderService.showLoader();
    this.sessionService.createThread().subscribe(data => {
      this.idSession.set(data.data);
      this.loaderService.stopLoader();
      this.dataGenerateQuestion.emit({id:this.idSession(),isSendJob:true});
      this.messageService.add({ severity: 'success', summary: Messages.title, detail: Messages.sessionSuccess });

    },(err) =>{
      this.loaderService.stopLoader();
      this.messageService.add({ severity: 'error', summary: MessagesError.title, detail: MessagesError.generalError });
      this.sendError();
    })

  }

  generateQuestion() {
    let isSendJob = false;
    if(this.counterQuestions() === 1) isSendJob = true;
    else isSendJob = false;
    this.dataGenerateQuestion.emit({id:this.idSession(),isSendJob});
  }

  sendError() {
    this.error.emit();
  }

  sendQuestionsInterview() {
    this.viewModal = false;
    this.questionsSelected.emit(this.questionsSave);
  }
}
