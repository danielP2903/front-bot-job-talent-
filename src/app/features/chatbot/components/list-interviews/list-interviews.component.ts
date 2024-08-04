import { Component, inject, OnInit, signal } from '@angular/core';
import { IResponseInterviews } from '../../../../core/models/responses/response-interviews';
import { QuestionsService } from '../../../../core/services/questions/questions.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Messages, MessagesError } from '../../../../shared/constants/messages';
import { DatePipe } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { ModalQuestionsSelectedComponent } from '../modal-questions-selected/modal-questions-selected.component';
import { ModalCodeComponent } from '../modal-code/modal-code.component';
import { ReportsInterviewComponent } from '../reports-interview/reports-interview.component';
import { RouteService } from '../../../../core/services/route/route.service';
import { BackComponent } from '../../../../shared/layout/back/back.component';

@Component({
  selector: 'app-list-interviews',
  standalone: true,
  imports: [ToastModule,
            DatePipe,
            TooltipModule,
            ButtonModule,
            MessagesModule,
            ModalCodeComponent,
            ReportsInterviewComponent,
            BackComponent,
            ModalQuestionsSelectedComponent],
  providers:[MessageService],
  templateUrl: './list-interviews.component.html',
  styleUrl: './list-interviews.component.scss'
})
export class ListInterviewsComponent implements OnInit{


  questionsService = inject(QuestionsService);
  messageService = inject(MessageService);
  routeService = inject(RouteService);

  messages = [{ severity: 'error', detail: 'No se encontrarón entrevistas.' }];

  listInterviews:IResponseInterviews[] = [];
  skip = 0;
  limit = 10;
  isViewInterview = false;
  interviewSelected!:IResponseInterviews;
  codeGenerated = signal<string>('12345678');
  isViewCodeGenerated = false;
  step = signal<number>(1);
  identifierSelected = '';

  ngOnInit(): void {
   this.getInterviews();
  }

  getInterviews() {
    this.questionsService.getQuestionsInterview(this.skip,this.limit).subscribe(data => {
      this.listInterviews = data.data;
      this.messageService.add({ severity: 'success', summary: Messages.title, detail: Messages.generalSuccess });
    }, err => {
      this.showErrorGeneral();

    })
  }
  selectInterview(interview:IResponseInterviews){
    this.interviewSelected = interview;
    this.isViewInterview = true;
  }

  viewResults(idInterview:string) {
    this.identifierSelected = idInterview;
    this.step.set(2);
  }

  generateCode(id:string) {
    this.questionsService.generateCodeInterview(id).subscribe(data => {
      this.messageService.add({ severity: 'success', summary: Messages.title, detail: Messages.codeSuccess });
        this.codeGenerated.set(data.data);
        this.isViewCodeGenerated = true;
    }, err => {
       if(err.error.statusCode === 404 || err.error.statusCode === 400) {
        this.messageService.add({ severity: 'error', summary: MessagesError.title, detail: err.error.messageException });

       } else {
        this.showErrorGeneral();
       }
    })
  }

  showErrorGeneral() {
    this.messageService.add({ severity: 'error', summary: MessagesError.title, detail: MessagesError.generalError });
  }
}
