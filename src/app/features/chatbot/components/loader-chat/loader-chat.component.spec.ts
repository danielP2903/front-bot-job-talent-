import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderChatComponent } from './loader-chat.component';

describe('LoaderChatComponent', () => {
  let component: LoaderChatComponent;
  let fixture: ComponentFixture<LoaderChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderChatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoaderChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
