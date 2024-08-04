import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [DialogModule,
            ButtonModule,
            FloatLabelModule,
            PasswordModule,
            ReactiveFormsModule,
            InputTextModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  @Input()  showModal: boolean = false;
  @Output() closeModal = new EventEmitter<boolean>();
  @Output() messageRegister = new EventEmitter<{register:boolean}>();

  formbuilder = inject(FormBuilder);
  formRegister!:FormGroup;
  authService = inject(AuthService);

  ngOnInit(): void {
   this.initForm();
  }

  initForm() {
    this.formRegister = this.formbuilder.group({
      name:['',Validators.compose([Validators.required, Validators.min(3)])],
      lastname:['',Validators.compose([Validators.required, Validators.min(3)])],
      company:['',Validators.compose([Validators.required, Validators.min(3)])],
      username:['',Validators.compose([Validators.required, Validators.email])],
      password:['',Validators.compose([Validators.required, Validators.min(3)])],
    })
  }

  dismiss() {
    this.closeModal.emit(false);
  }

  registerUser() {
    if(this.formRegister.valid) {
      const dataServices = {
        names: this.form.name,
        lastnames: this.form.lastname,
        company: this.form.company,
        email:this.form.username,
        password:this.form.password
      }
      this.authService.register(dataServices).subscribe(data => {
        this.messageRegister.emit({register:true});
        this.dismiss();
      },err => {
        this.messageRegister.emit({register:false});
        this.dismiss();
      })
    }
  }

  get form() {
    return this.formRegister.value;
  }
}
