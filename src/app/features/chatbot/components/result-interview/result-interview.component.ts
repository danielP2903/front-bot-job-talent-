import { Component, inject, OnInit, signal } from '@angular/core';
import { GenerateInterviewService } from '../../../../core/services/interview/generate-interview.service';
import { CommonService } from '../../../../core/services/common/common.service';
import { CreateSessionService } from '../../../../core/services/session/create-session.service';
import { IGenerateResultInterview, Interview } from '../../../../core/models/requests/generate-result-interview';
import { CenterLayoutComponent } from '../../../../shared/layout/center-layout/center-layout.component';
import { HeaderComponent } from '../../../../shared/layout/header/header.component';
import { IResponseInterview } from '../../../../core/models/responses/response-result-interview';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { LoaderService } from '../../../../core/services/loader/loader.service';
import { MessagesError } from '../../../../shared/constants/messages';
import { MessageService } from 'primeng/api';
import { LoaderComponent } from '../../../../shared/layout/loader/loader.component';
import { AssistantSelect } from '../../../../core/models/interfaces/assistant';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-result-interview',
  standalone: true,
  imports: [CenterLayoutComponent,HeaderComponent, ButtonModule, LoaderComponent,AsyncPipe],
  providers:[MessageService],
  templateUrl: './result-interview.component.html',
  styleUrl: './result-interview.component.scss'
})
export class ResultInterviewComponent implements OnInit {


  serviceInterview = inject(GenerateInterviewService);
  commonService = inject(CommonService);
  router = inject(Router);
  loaderService = inject(LoaderService);
  sessionService = inject(CreateSessionService);
  messageService = inject(MessageService);


  interview = signal<Interview[]>([]);
  titleLoader:string = 'Generando sesión';
  response!:string;
  sessionId!:string;
  resultInterview!:IResponseInterview
  ngOnInit(): void {
    this.verifyInterview();
  }

  verifyInterview() {
    if(this.commonService.getPersistentData('interview') && this.commonService.getPersistentData('interview').length > 0){
      this.interview.set(this.commonService.getPersistentData('interview'));
      this.getSessionId();
    }else {
      this.showError();
    }
  }

  buildStringResponseAsssistant() {
  this.interview().forEach(value => {
      this.response = this.response + ' ' + value.question.trim() + ' ' + value.response.trim()
    });
    console.log(this.response);

    this.titleLoader = 'Generando resultados..'
    this.getResultInterview();
  }

  getSessionId() {
    this.loaderService.showLoader();
    this.sessionService.createThread().subscribe(data => {
      this.sessionId = data.data;
      this.buildStringResponseAsssistant();
    }, err => {
      this.loaderService.stopLoader();
      this.showError();
    })
  }
  showError() {
    this.messageService.add({ severity: 'error', summary: MessagesError.title, detail: MessagesError.generalError });
    this.redirectLogin();

  }

  redirectLogin() {
    sessionStorage.clear();
    this.router.navigate(['ingresar']);
  }


  getResultInterview() {
    this.loaderService.showLoader();

    const dataservices: IGenerateResultInterview = {
      interview:this.interview(),
      response:this.response,
      threadId:this.sessionId,
      assistant:AssistantSelect.analyze,
      codeInterview:this.commonService.getPersistentData('otp') as string,
      email: this.commonService.getPersistentData('presenterInterview').email,
      names:this.commonService.getPersistentData('presenterInterview').names
    }
    this.serviceInterview.getResultInterview(dataservices).subscribe(data => {
      this.resultInterview = data.data;
      this.loaderService.stopLoader();

    },err => {
      this.messageService.add({ severity: 'error', summary: MessagesError.title, detail: MessagesError.generalError });
      this.redirectLogin();
    })
  }
}
