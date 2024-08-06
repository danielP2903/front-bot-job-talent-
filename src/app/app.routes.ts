import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  {
    path:'',
    redirectTo: 'bienvenido',
    pathMatch: 'full',
  },
  {
    path:'chat',
    loadComponent:() => import('../app/features/chatbot/chatbot.component').then(c => c.ChatbotComponent),
    canActivate:[authGuard]
  },
  {
    path:'bienvenido',
    loadComponent:() => import('../app/features/welcome/welcome.component').then(c => c.WelcomeComponent)
  },
  {
    path: 'ingresar',
    loadComponent:() => import('../app/features/auth/login/login.component').then(c => c.LoginComponent)
  },
  {
    path: 'registrarse',
    loadComponent:() => import('../app/features/auth/register/register.component').then(c => c.RegisterComponent)
  },
  {
    path:'resultados',
    loadComponent:() => import('../app/features/chatbot/components/result-interview/result-interview.component').then(c => c.ResultInterviewComponent),
  }
];
