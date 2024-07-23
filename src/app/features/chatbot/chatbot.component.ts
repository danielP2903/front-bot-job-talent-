import { NgStyle } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CenterLayoutComponent } from '../../shared/layout/center-layout/center-layout.component';
import { ChatComponent } from './components/chat/chat.component';
import { MenuComponent } from '../../shared/layout/menu/menu.component';
import { Flows } from '../../shared/constants/flows';
import { FormInfoJobComponent } from './components/form-info-job/form-info-job.component';
import { TypeChat } from '../../core/models/interfaces/messages';
import { GenerateInterviewService } from '../../core/services/interview/generate-interview.service';
import { GeneratorQuestionsComponent } from './components/generator-questions/generator-questions.component';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [ButtonModule, NgStyle, CenterLayoutComponent, ChatComponent, MenuComponent,FormInfoJobComponent, GeneratorQuestionsComponent],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent {

  isSidebarVisible = signal<boolean>(false);
  flow = signal<Flows>(Flows.menu);
  flowText = signal<string>('Bienvenido a Bot Job Talent, selecciona una opción para continuar');
  roleChat!:TypeChat;
  serviceInterview = inject(GenerateInterviewService);
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

      default:
        break;
    }
  }

  captureInfoJob(info:string) {
    console.log(info);
    this.flow.set(Flows.generateInterview);
    this.roleChat = 'GenerateInterview';
    this.setTextFlow();
  }
}
