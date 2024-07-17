import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'',
    redirectTo: 'bienvenido',
    pathMatch: 'full',
  },
  {
    path:'chat',
    loadComponent:() => import('../app/features/chatbot/chatbot.component').then(c => c.ChatbotComponent)
  },
  {
    path:'bienvenido',
    loadComponent:() => import('../app/features/welcome/welcome.component').then(c => c.WelcomeComponent)
  }
];
