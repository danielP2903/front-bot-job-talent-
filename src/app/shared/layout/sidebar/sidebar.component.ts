import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ButtonModule,SidebarModule,DividerModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() isSidebarVisible:boolean = false;
  @Output() hiddenSidebar = new EventEmitter<boolean>();
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  closeCallback(e:any): void {
    console.log(e);

    this.sidebarRef.close(e);
}

hideSidebar(event:boolean) {
  if(!event) {
    this.hiddenSidebar.emit(event);
  }
}

}
