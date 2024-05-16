import { Routes } from '@angular/router';
import { SignUpComponent } from './auth/pages/sign-up/sign-up.component';
import { SignInComponent } from './auth/pages/sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { ForgotPasswordComponent } from './auth/pages/forgot-password/forgot-password.component';
import { DashboardComponent } from './admin/pages/dashboard/dashboard.component';
import { authGuard } from './auth/guard/auth.guard';
import { checkAuthSignInGuard } from './auth/guard/checkAuthSignIn.guard';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './admin/pages/users/users.component';
import { ProductsComponent } from './admin/pages/products/products.component';
import { CategoriesComponent } from './admin/pages/categories/categories.component';
import { BillsComponent } from './admin/pages/bills/bills.component';
import { ResetPasswordComponent } from './auth/pages/reset-password/reset-password.component';
import { AuthGuard } from '../../../../angular/servicesRouteApp/src/app/guards/auth.guard';

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
        path: 'reset-password/:id',
        title: 'CafeZone | Forgot Password',
        component: ResetPasswordComponent,
      },
      {
        path:'', redirectTo: 'sign-in', pathMatch: 'full',
      }
    ],
  },
  {
    path:'', redirectTo: '', pathMatch: 'full',
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () => import('./admin/admin.component').then( m => m.AdminComponent ),
    children: [
      {
        path: 'users',
        title: 'CafeZone | User Panel',
        component: UsersComponent,
      },
      {
        path: 'dashboard',
        title: 'CafeZone | Dashboard Panel',
        component: DashboardComponent,
      },
      {
        path: 'products',
        title: 'CafeZone | Product Panel',
        component: ProductsComponent,
      },
      {
        path: 'categories',
        title: 'CafeZone | Category Panel',
        component: CategoriesComponent,
      },
      {
        path: 'bills',
        title: 'CafeZone | Bill Panel',
        component: BillsComponent,
      },
      {
        path:'', redirectTo: 'dashboard', pathMatch: 'full',
      }
    ],
  }
];
