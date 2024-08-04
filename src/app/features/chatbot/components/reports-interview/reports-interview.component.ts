import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { QuestionsService } from '../../../../core/services/questions/questions.service';
import { IResponseReportsInterview } from '../../../../core/models/responses/response-reportinterview';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { BadgeModule } from 'primeng/badge';
import { QualificationPipe } from '../../../../core/pipes/qualification.pipe';
import { NgClass } from '@angular/common';
import { BackComponent } from '../../../../shared/layout/back/back.component';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-reports-interview',
  standalone: true,
  imports: [AccordionModule,
            ButtonModule,
            TooltipModule,
            BadgeModule,
            QualificationPipe,
            NgClass,
            MessagesModule,
            BackComponent],
  templateUrl: './reports-interview.component.html',
  styleUrl: './reports-interview.component.scss'
})
export class ReportsInterviewComponent implements OnInit {

  @Input() set identifierInterview(value:string) {
    if(value){
      this.identifier = value;
    }
  }
  @Output() backToListInterview = new EventEmitter<void>();
  messages = [{ severity: 'error', detail: 'No se encontrarón resultados.' }];
  questionService = inject(QuestionsService);
  skip=0;
  limit=20;
  identifier!:string;

  listInterviews:IResponseReportsInterview[] = [];

  ngOnInit(): void {
   this.getRestultsInterviews();
  }

  getRestultsInterviews() {
    this.questionService.getReportInterview(this.identifier, this.skip,this.limit).subscribe(data => {
      this.listInterviews = data.data;
    })
  }

  downloadReport(identifier:string) {
    this.questionService.generateReportPdf(identifier).subscribe((data:Blob) => {
      this.openFileInNewWindow(data);

    })
  }
  private openFileInNewWindow(data: Blob) {
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }
}
