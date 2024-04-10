import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, catchError, map, of, tap, throwError } from 'rxjs';

import { environment } from '../../../environments/environment.development';

import { AuthStatus, CheckTokenResponse, RegisterResponse, SignInResponse, User } from '../interfaces/';

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
    this.checkAuthStatus().subscribe();
  }

  private setAuthentication( user: User, token: string ): boolean {
    this._currentUser.set( user );
    this._authStatus.set( AuthStatus.authenticated );
    this.storeTokens(token);
    return true;

  }

  sigIn( email: string, password: string ) {
    const url = `${this.apiUrl}/auth/sign-in`;
    const dataUser = { email, password };

    return this.http.post<SignInResponse>(url, dataUser)
      .pipe(
        map( ({user, token}) => {
          this.setAuthentication(user, token)
        }),
        catchError( error => throwError( () => error.error.message ))
      )
  }

  register( user: User ) {
    const url = `${this.apiUrl}/auth/sign-up`;

    return this.http.post<RegisterResponse>(url, user)
      .pipe(
        map( ({user, token}) => {
          this.setAuthentication(user, token)
        }),
        catchError( error => throwError( () => error.error.message ))
      )
  }

  checkAuthStatus(): Observable<Boolean> {
    const url  = `${ this.apiUrl }/auth/check-token`;
    const token = this.getJwtToken();

    if (!token) {
      this.logOut();
      return of(false)
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<CheckTokenResponse>(url, { headers })
      .pipe(
        map( ({ user, token }) => this.setAuthentication(user, token)),
        catchError(() => {
          this._authStatus.set( AuthStatus.notAuthenticated )
          return of(false)
        })
    );
  }

  tokenInterceptor() {
    const url  = `${this.apiUrl}/auth/refresh`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getRefreshToken() || ''}`  );

    return this.http.post<RegisterResponse>(url, { headers } ).pipe(
        map( ({ user, token }) => this.setAuthentication(user, token)),
        catchError( error => throwError( () => error.error.message ))
      )
  }

  logOut() {
    this.removeTokens();
    this._currentUser.set(null);
    this._authStatus.set( AuthStatus.notAuthenticated )
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN) || '';
  }

  private storeTokens(tokens: string) {
    localStorage.setItem(this.JWT_TOKEN, tokens);
    localStorage.setItem(this.REFRESH_TOKEN, tokens);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}
