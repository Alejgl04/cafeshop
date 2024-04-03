import { Routes } from '@angular/router';
import { SignUpComponent } from './auth/pages/sign-up/sign-up.component';
import { SignInComponent } from './auth/pages/sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,

  },
  {
    path: 'auth',
    loadComponent: () => import('./auth/auth.component').then( m => m.AuthComponent ),
    children: [
      {
        path: 'sign-up',
        title: 'Sign Up',
        component: SignUpComponent,
      },
      {
        path: 'sign-in',
        title: 'Sign In',
        component: SignInComponent,
      },
      {
        path:'', redirectTo: 'sign-up', pathMatch: 'full',
      }
    ],
  },
];
