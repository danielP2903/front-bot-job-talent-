import { Component, Input } from '@angular/core';
import { RoleMessage } from '../../../../core/models/interfaces/messages';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
import { LoaderChatComponent } from '../loader-chat/loader-chat.component';

@Component({
  selector: 'app-bubble-chat',
  standalone: true,
  imports: [OverlayPanelModule,ButtonModule,LoaderChatComponent],
  templateUrl: './bubble-chat.component.html',
  styleUrl: './bubble-chat.component.scss'
})
export class BubbleChatComponent {
  @Input() content: string = '';
  @Input() role: RoleMessage = 'Bot';
  @Input() isWriteBotMessage: boolean = false;
}
