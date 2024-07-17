import { Component } from '@angular/core';
import { SendMessagesChatComponent } from '../send-messages-chat/send-messages-chat.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [SendMessagesChatComponent, OverlayPanelModule, ButtonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {

}
