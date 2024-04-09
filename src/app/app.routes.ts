import { Routes } from '@angular/router';
import { SignUpComponent } from './auth/pages/sign-up/sign-up.component';
import { SignInComponent } from './auth/pages/sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { ForgotPasswordComponent } from './auth/pages/forgot-password/forgot-password.component';
import { DashboardComponent } from './admin/pages/dashboard/dashboard.component';
import { authGuard } from './auth/guard/auth.guard';
import { checkAuthSignInGuard } from './auth/guard/checkAuthSignIn.guard';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,

  },
  {
    path: 'auth',
    canActivate: [checkAuthSignInGuard],
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
        path:'', redirectTo: 'sign-in', pathMatch: 'full',
      }
    ],
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    component: AdminComponent,
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
