import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalQuestionsSelectedComponent } from './modal-questions-selected.component';

describe('ModalQuestionsSelectedComponent', () => {
  let component: ModalQuestionsSelectedComponent;
  let fixture: ComponentFixture<ModalQuestionsSelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalQuestionsSelectedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalQuestionsSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
