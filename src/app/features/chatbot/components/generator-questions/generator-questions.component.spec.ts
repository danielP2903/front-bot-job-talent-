import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratorQuestionsComponent } from './generator-questions.component';

describe('GeneratorQuestionsComponent', () => {
  let component: GeneratorQuestionsComponent;
  let fixture: ComponentFixture<GeneratorQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneratorQuestionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneratorQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
