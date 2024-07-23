import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInfoJobComponent } from './form-info-job.component';

describe('FormInfoJobComponent', () => {
  let component: FormInfoJobComponent;
  let fixture: ComponentFixture<FormInfoJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormInfoJobComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormInfoJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
