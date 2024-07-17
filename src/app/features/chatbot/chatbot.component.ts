import { NgStyle } from '@angular/common';
import { Component, HostListener, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CenterLayoutComponent } from '../../shared/layout/center-layout/center-layout.component';
import { ChatComponent } from './components/chat/chat.component';
import { SidebarComponent } from '../../shared/layout/sidebar/sidebar.component';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [ButtonModule, NgStyle, CenterLayoutComponent, ChatComponent,SidebarComponent],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent {

  isSidebarVisible = signal<boolean>(false);

  showSidebar() {
    this.isSidebarVisible.set(!this.isSidebarVisible());
  }


}
