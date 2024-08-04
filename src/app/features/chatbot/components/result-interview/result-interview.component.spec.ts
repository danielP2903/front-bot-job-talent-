import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultInterviewComponent } from './result-interview.component';

describe('ResultInterviewComponent', () => {
  let component: ResultInterviewComponent;
  let fixture: ComponentFixture<ResultInterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultInterviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResultInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
