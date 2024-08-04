import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { SendMessagesChatComponent } from '../send-messages-chat/send-messages-chat.component';
import { GenerateInterviewService } from '../../../../core/services/interview/generate-interview.service';
import { IMessages } from '../../../../core/models/interfaces/messages';
import { BubbleChatComponent } from '../bubble-chat/bubble-chat.component';
import { LoaderChatComponent } from '../loader-chat/loader-chat.component';
import { CommonService } from '../../../../core/services/common/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [SendMessagesChatComponent,BubbleChatComponent, LoaderChatComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {
  @ViewChild('container', { static: false }) messagesHtml!: ElementRef;


  generateQuestionInterviewService = inject(GenerateInterviewService);
  commonService = inject(CommonService);
  router = inject(Router);

  messageResponseBot:IMessages[] = [];
  messagesUser:IMessages[] = [];
  messages: IMessages[] = [];
  isGenerateQuestion = signal<boolean>(false);
  counterMessagesChat = signal<number>(0);
  questionsBot = signal<string[]>([]);
  interview = signal<{question:string,response:string}[]>([]);
  vacancy:string ='';
  messageInitial:string = '';
  disableChat = false;
  ngOnInit(): void {
   this.verifyMessageInMemory();
  }

  receiveValueInput(value:string){
    this.setMessageUser(value);
    this.setLoaderWriteBot(true);
    this.scrollToBottom();
    setTimeout(() => {
      this.generateQuestionInterviewService.getQuestionsInterview({assistant:'',threadId:'',response:''}).subscribe(data => {
        const _data:IMessages = {
          content:data.data.content,
          role: 'Bot'
        }
        this.messages.push(_data);
        this.setLoaderWriteBot(false);
        this.scrollToBottom();
      })
    }, 3000);

  }

  verifyMessageInMemory() {

    if(this.commonService.getPersistentData('questions') &&this.commonService.getPersistentData('questions').questions.length > 0 && this.commonService.getPersistentData('questions').vacancy) {
      this.questionsBot.set(this.commonService.getPersistentData('questions').questions);
      this.vacancy = this.commonService.getPersistentData('questions').vacancy;
      this.messageInitial = 'Hola bienvenido, mi nombre es Bot Talent y te guiaré en esta'
    + ' ' + 'entrevista técnica para el cargo:' + ' ' + this.vacancy;
      this.sendMessageBot();
    }
  }

  sendMessageBot(value?:string) {
    if(value && value !== ''){
      this.setMessageUser(value);
      this.setBodyInterview(this.questionsBot()[this.counterMessagesChat() - 1],value as string);
    }
    this.verifyInterviewFinished();
    this.disableChat = true;
    this.setLoaderWriteBot(true);
    this.scrollToBottom();
    setTimeout(() => {
      const _data:IMessages = {
        content:this.questionsBot()[this.counterMessagesChat()],
        role: 'Bot'
      }
      this.messages.push(_data);
      this.counterMessagesChat.update(val => val + 1);
      console.log(this.counterMessagesChat());
      this.setLoaderWriteBot(false);
      this.scrollToBottom();
      this.disableChat = false;

    }, 2500);

  }

  setBodyInterview(question:string, response:string) {
    if(question && response && question !== '' && response !== ''){
      this.interview().push({question,response});
    }
  }

  verifyInterviewFinished() {
    if(this.counterMessagesChat() >= 5){
      console.log(this.interview());
      this.saveInterviewInMemory();
      this.router.navigate(['resultados']);
    }
  }

  setLoaderWriteBot(isWriting:boolean) {
    this.isGenerateQuestion.set(isWriting);
  }

  setMessageUser(value:string){
    const data:IMessages = {
      content:value,
      role: 'User'
    }
    this.messages.push(data);

  }
  scrollToBottom() {
    setTimeout(() => {
      this.messagesHtml.nativeElement.scrollTop = this.messagesHtml.nativeElement.scrollHeight;
    }, 0);
  }

  saveInterviewInMemory() {
    this.commonService.setPersistentData('interview',this.interview())
  }
}
