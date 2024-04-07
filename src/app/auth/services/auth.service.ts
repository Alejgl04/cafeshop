import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment.development';

import { catchError, map, throwError } from 'rxjs';
import { AuthStatus, RegisterResponse, User } from '../interfaces/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl: string = environment.apiUrl;
  private http = inject( HttpClient );

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';

  private _currentUser = signal<User|null>(null);
  private _authStatus  = signal<AuthStatus>( AuthStatus.checking );

  public currentUser = computed( () => this._currentUser() );
  public authStatus = computed( () => this._authStatus() );

  constructor() {
    // this.checkAuthStatus().subscribe();
  }

  private setAuthentitacion( user: User, token: string ): boolean {

    this._currentUser.set( user );
    this._authStatus.set( AuthStatus.authenticated );
    this.storeTokens(token);
    return true;

  }

  register( user: User ) {
    const url = `${this.apiUrl}/auth/sign-up`;

    return this.http.post<RegisterResponse>(url, user)
      .pipe(
        map( ({ user, token }) => this.setAuthentitacion(user, token)),
        catchError( error => throwError( () => error.error.message ))
      )
  }

  private storeTokens(tokens: string) {
    localStorage.setItem(this.JWT_TOKEN, tokens);
    localStorage.setItem(this.REFRESH_TOKEN, tokens);
  }
}
