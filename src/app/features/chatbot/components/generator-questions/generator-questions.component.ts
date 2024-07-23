import { Component, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-generator-questions',
  standalone: true,
  imports: [CardModule, ButtonModule,RatingModule,FormsModule],
  templateUrl: './generator-questions.component.html',
  styleUrl: './generator-questions.component.scss'
})
export class GeneratorQuestionsComponent {
  value: number = 0;

  counterQuestions = signal<number>(1);

  saveQuestion() {
    this.updateCounter();
    this.value += 1;
  }

  updateCounter() {
    this.counterQuestions.update(val => val + 1);
  }
}
