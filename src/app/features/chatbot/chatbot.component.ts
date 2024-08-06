import { NgStyle } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CenterLayoutComponent } from '../../shared/layout/center-layout/center-layout.component';
import { ChatComponent } from './components/chat/chat.component';
import { MenuComponent } from '../../shared/layout/menu/menu.component';
import { Flows } from '../../shared/constants/flows';
import { FormInfoJobComponent } from './components/form-info-job/form-info-job.component';
import { TypeChat } from '../../core/models/interfaces/messages';
import { GenerateInterviewService } from '../../core/services/interview/generate-interview.service';
import { GeneratorQuestionsComponent } from './components/generator-questions/generator-questions.component';
import { AssistantSelect } from '../../core/models/interfaces/assistant';
import { LoaderService } from '../../core/services/loader/loader.service';
import { CommonService } from '../../core/services/common/common.service';
import { QuestionsService } from '../../core/services/questions/questions.service';
import { Messages, MessagesError } from '../../shared/constants/messages';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ListInterviewsComponent } from './components/list-interviews/list-interviews.component';
import { HeaderComponent } from '../../shared/layout/header/header.component';
import { ReportsInterviewComponent } from './components/reports-interview/reports-interview.component';
import { RouteService } from '../../core/services/route/route.service';
import { KEY_STORAGE } from '../../shared/constants/key-storage';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [ButtonModule,
            NgStyle,
            CenterLayoutComponent,
            ChatComponent,
            ListInterviewsComponent,
            MenuComponent,
            ToastModule,
            FormInfoJobComponent,
            HeaderComponent,
            ReportsInterviewComponent,
            GeneratorQuestionsComponent],
  providers:[MessageService],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent implements OnInit {



  serviceInterview = inject(GenerateInterviewService);
  loaderService = inject(LoaderService);
  commonService = inject(CommonService);
  questionService = inject(QuestionsService);
  messageService = inject(MessageService);
  routeService = inject(RouteService);

  isSidebarVisible = signal<boolean>(false);
  flow = signal<Flows>(Flows.menu);
  flowText = signal<string>('Bienvenido a Bot Job Talent, selecciona una opción para continuar');
  roleChat!:TypeChat;
  infoJob:string = '';
  questionInterview = signal<string>('');

  ngOnInit(): void {
    this.verifyInterviewQuestions();
    this.getRouterHome();
  }

  getRouterHome() {
    this.routeService.getEventRedirectHome().subscribe(data => {
      if(data.redirect){
        this.flow.set(Flows.menu);
        this.flowText.set('Bienvenido a Bot Job Talent, selecciona una opción para continuar')
      }
    })
  }

  verifyInterviewQuestions() {
    if(this.commonService.getPersistentData('questions') &&this.commonService.getPersistentData('questions').questions.length > 0){
      sessionStorage.setItem(KEY_STORAGE.token,JSON.stringify({isPresenter:true}));
      this.flow.set(Flows.chat);
    }
  }


  showSidebar() {
    this.isSidebarVisible.set(!this.isSidebarVisible());
  }

  getOptionSelected(option:Flows){
    this.flow.set(option);
    this.setTextFlow();
  }

  setTextFlow() {
    switch (this.flow()) {
      case Flows.intoInfoJob:
        this.flowText.set('Ingresa la descripción y requerimientos del empleo, recuerda ser muy especifico con estos, ya que asi se generarán mejor las preguntas técnicas');
        break;
      case Flows.generateInterview:
        this.flowText.set('Genera la entrevista con un máximo de 5 preguntas');
        break;
      case Flows.reportInterview:
        this.flowText.set('Resultados de las entrevistas');
        break;
      default:
        break;
    }
  }

  captureInfoJob(info:string) {
    console.log(info);
    this.infoJob = info;
    this.flow.set(Flows.generateInterview);
    this.roleChat = 'GenerateInterview';
    this.setTextFlow();
  }

  generateQuestionInterview(event:{id:string,isSendJob:boolean}){
    this.loaderService.showLoader();
    const dataservices = {
      threadId:event.id,
      response: event.isSendJob ? this.infoJob : 'Otra pregunta por favor',
      assistant:AssistantSelect.questions
    }
    this.serviceInterview.getQuestionsInterview(dataservices).subscribe(data => {
      this.questionInterview.set(data.data.content);
      this.loaderService.stopLoader();
    },err => {
      this.loaderService.stopLoader();
    })
  }

  saveInterview(questions:string[]) {
    const job = this.getJobPersistent();
    const body = {
      questions,
      titleVacancy:job.vacancy,
      description: job.description,
      requirements:job.requirements
    }
    this.questionService.saveQuestions(body).subscribe(data => {
      if(data.ok){
          this.resetFlow();
          this.messageService.add({ severity: 'success', summary: Messages.title, detail: Messages.questionsSuccess });
      }
    },err => {
      this.messageService.add({ severity: 'error', summary: MessagesError.title, detail: MessagesError.questionsError });

    })
  }

  getJobPersistent() {
    if(this.commonService.getPersistentData('job')){
      return this.commonService.getPersistentData('job');
    }else {
      this.commonService.toastError('No se encuentra información del trabajo');
      this.resetFlow();
    }
  }

  resetFlow() {
    this.flow.set(1);
    this.setTextFlow();
  }
}
