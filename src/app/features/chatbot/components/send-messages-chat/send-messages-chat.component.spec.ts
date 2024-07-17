import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendMessagesChatComponent } from './send-messages-chat.component';

describe('SendMessagesChatComponent', () => {
  let component: SendMessagesChatComponent;
  let fixture: ComponentFixture<SendMessagesChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendMessagesChatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SendMessagesChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
