import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { SendMessagesChatComponent } from '../send-messages-chat/send-messages-chat.component';
import { GenerateInterviewService } from '../../../../core/services/interview/generate-interview.service';
import { IMessages } from '../../../../core/models/interfaces/messages';
import { BubbleChatComponent } from '../bubble-chat/bubble-chat.component';
import { LoaderChatComponent } from '../loader-chat/loader-chat.component';

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
  messageResponseBot:IMessages[] = [];
  messagesUser:IMessages[] = [];
  messages: IMessages[] = [];
  isGenerateQuestion = signal<boolean>(false);
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  receiveValueInput(value:string){
    this.setMessageUser(value);
    this.setLoaderWriteBot(true);
    this.scrollToBottom();
    setTimeout(() => {
      this.generateQuestionInterviewService.getQuestionsInterview({assistantId:'',threadId:'',response:''}).subscribe(data => {
        const _data:IMessages = {
          content:data[0].content,
          role: 'Bot'
        }
        this.messages.push(_data);
        console.log(this.messages);
        this.setLoaderWriteBot(false);
        this.scrollToBottom();
      })
    }, 3000);

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
    console.log(this.messages);

  }
  scrollToBottom() {
    setTimeout(() => {
      this.messagesHtml.nativeElement.scrollTop = this.messagesHtml.nativeElement.scrollHeight;
    }, 0);
  }
}
