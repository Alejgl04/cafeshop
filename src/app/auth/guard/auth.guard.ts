import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject( AuthService );
  const router = inject(Router);

  if ( authService.getJwtToken() === '' ) {
    authService.logOut();
    router.navigate(['/auth/sign-in'],{queryParams:{'redirectURL':state.url}})
    // this.router.navigate(['/auth/login'],{queryParams:{'redirectURL':state.url}});
    return false;
  }
  return true
};
