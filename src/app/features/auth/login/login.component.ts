import { Component, inject, OnInit, signal } from '@angular/core';
import { CenterLayoutComponent } from '../../../shared/layout/center-layout/center-layout.component';
import { HeaderComponent } from '../../../shared/layout/header/header.component';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { RegisterComponent } from '../register/register.component';
import { AuthService } from '../../../core/services/auth/auth.service';
import { KEY_STORAGE } from '../../../shared/constants/key-storage';
import { Router } from '@angular/router';
import { CommonService } from '../../../core/services/common/common.service';
import { Messages, MessagesError } from '../../../shared/constants/messages';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FormOtpComponent } from '../../../shared/layout/form-otp/form-otp.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CenterLayoutComponent,
            ButtonModule,
            HeaderComponent,
            FloatLabelModule,
            InputTextModule,
            ReactiveFormsModule,
            RegisterComponent,
            ToastModule,
            FormOtpComponent,
            PasswordModule],
  providers:[MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{


  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  commonService = inject(CommonService);
  messageService = inject(MessageService);
  formLogin!:FormGroup;
  isModeRegister = signal<boolean>(false);
  isModeOtp = signal<boolean>(false);
  isLogged:boolean = false;
  ngOnInit(): void {
    this.initForm();
  }



  initForm() {
    this.formLogin = this.formBuilder.group({
      username:['',Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    })
  }

  login() {
    if(this.formLogin.valid){
      this.authService.login(this.getValueForm('username'),this.getValueForm('password')).subscribe(data => {
        if(data.ok) {
          sessionStorage.setItem(KEY_STORAGE.token, data.data.access_token);
          this.commonService.setPersistentData('isUserAuth', {isAuth:true});
          this.messageService.add({ severity: 'success', summary: Messages.title, detail: Messages.authSuccess });
          this.redirectMenu();
        }
      },err => {
        if(err.error.statusCode === 404 || err.error.statusCode === 400){
          this.messageService.add({ severity: 'error', summary: MessagesError.title, detail: MessagesError.userPassBad });

        }else {
          this.messageService.add({ severity: 'error', summary: MessagesError.title, detail: MessagesError.authError });
        }
      })
    }
  }

  getValueForm(controlname:string) {
    return this.formLogin.controls[controlname].value;
  }

  redirectMenu() {
    setTimeout(() => {
      this.router.navigate(['chat'])
    }, 500);
  }

  showMessageRegister(event: {register:boolean}) {
    if(event.register){
      this.messageService.add({ severity: 'success', summary: Messages.title, detail: Messages.registerSuccess });
    }else {
      this.messageService.add({ severity: 'error', summary: MessagesError.title, detail: MessagesError.registerError });

    }
  }
}
