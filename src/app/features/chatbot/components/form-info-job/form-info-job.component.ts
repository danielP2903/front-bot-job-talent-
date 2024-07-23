import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-form-info-job',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule,FloatLabelModule,InputTextareaModule],
  templateUrl: './form-info-job.component.html',
  styleUrl: './form-info-job.component.scss'
})
export class FormInfoJobComponent implements OnInit {

  formBuilder = inject(FormBuilder);
  formInfoJob!:FormGroup;
  @Output() promptJob = new EventEmitter<string>();
  ngOnInit(): void {
   this.initForm();
  }

  initForm() {
    this.formInfoJob = this.formBuilder.group({
      description:['',Validators.compose([Validators.required,Validators.minLength(10)])],
      requirements:['',Validators.compose([Validators.required,Validators.minLength(10)])]
    })
  }

  emitValue() {
    if(this.formInfoJob.valid) {
      const prompt = 'El empleo es el siguiente:'+ ' ' + this.formInfoJob.controls['description'].value
                      + ' ' + 'Los requerimientos de la vacante son:'
                      + ' ' + this.formInfoJob.controls['requirements'].value
      this.promptJob.emit(prompt)
    }
  }
}
