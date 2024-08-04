import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CommonService } from '../../../../core/services/common/common.service';
import { BackComponent } from '../../../../shared/layout/back/back.component';
import { RouteService } from '../../../../core/services/route/route.service';

@Component({
  selector: 'app-form-info-job',
  standalone: true,
  imports: [ReactiveFormsModule,InputTextModule, ButtonModule,FloatLabelModule,InputTextareaModule, BackComponent],
  templateUrl: './form-info-job.component.html',
  styleUrl: './form-info-job.component.scss'
})
export class FormInfoJobComponent implements OnInit {

  formBuilder = inject(FormBuilder);
  commonService = inject(CommonService);
  routeService = inject(RouteService);
  formInfoJob!:FormGroup;
  @Output() promptJob = new EventEmitter<string>();
  ngOnInit(): void {
   this.initForm();
  }

  initForm() {
    this.formInfoJob = this.formBuilder.group({
      vacancy:['',Validators.compose([Validators.required, Validators.minLength(5)])],
      description:['',Validators.compose([Validators.required,Validators.minLength(10)])],
      requirements:['',Validators.compose([Validators.required,Validators.minLength(10)])]
    })
  }

  emitValue() {
    if(this.formInfoJob.valid) {
      this.saveJobInfoPersistent();
      const prompt = 'El empleo es el siguiente:'+ ' ' + this.formInfoJob.controls['description'].value
                      + ' ' + 'Los requerimientos de la vacante son:'
                      + ' ' + this.formInfoJob.controls['requirements'].value
      this.promptJob.emit(prompt)
    }
  }

  saveJobInfoPersistent() {
    const job = {
      vacancy: this.formInfoJob.controls['vacancy'].value,
      description: this.formInfoJob.controls['description'].value,
      requirements: this.formInfoJob.controls['requirements'].value
    }
    this.commonService.setPersistentData('job',job);
  }
}
