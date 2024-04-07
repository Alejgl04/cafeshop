import { Routes } from '@angular/router';
import { SignUpComponent } from './auth/pages/sign-up/sign-up.component';
import { SignInComponent } from './auth/pages/sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { ForgotPasswordComponent } from './auth/pages/forgot-password/forgot-password.component';
import { DashboardComponent } from './admin/pages/dashboard/dashboard.component';

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
        title: 'CafeZone | Sign Up',
        component: SignUpComponent,
      },
      {
        path: 'sign-in',
        title: 'CafeZone | Sign In',
        component: SignInComponent,
      },
      {
        path: 'forgot-password',
        title: 'CafeZone | Forgot Password',
        component: ForgotPasswordComponent,
      },
      {
        path:'', redirectTo: 'sign-up', pathMatch: 'full',
      }
    ],
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.component').then( m => m.AdminComponent ),
    children: [
      {
        path: 'dashboard',
        title: 'CafeZone | Admin Dashboard ',
        component: DashboardComponent,
      },
      {
        path:'', redirectTo: 'dashboard', pathMatch: 'full',
      }
    ],
  }
];
