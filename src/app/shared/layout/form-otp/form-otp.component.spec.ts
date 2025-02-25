import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOtpComponent } from './form-otp.component';

describe('FormOtpComponent', () => {
  let component: FormOtpComponent;
  let fixture: ComponentFixture<FormOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormOtpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
