import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsInterviewComponent } from './reports-interview.component';

describe('ReportsInterviewComponent', () => {
  let component: ReportsInterviewComponent;
  let fixture: ComponentFixture<ReportsInterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsInterviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportsInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
