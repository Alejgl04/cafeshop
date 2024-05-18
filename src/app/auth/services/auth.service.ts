import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, catchError, map, of, tap, throwError } from 'rxjs';

import { environment } from '../../../environments/environment.development';

import { AuthStatus, CheckTokenResponse, ForgotPassword, PasswordContent, RegisterResponse, ResetPassword, SignInResponse, User } from '../interfaces/';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl: string = environment.apiUrl;
  private http = inject(HttpClient);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  public authParams: any;

  constructor() {
    this.checkAuthStatus().subscribe();
  }

  private setAuthentication(user: User, token: string): boolean {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    this.storeTokens(token);
    return true;

  }

  sigIn(email: string, password: string) {
    const url = `${this.apiUrl}/auth/sign-in`;
    const dataUser = { email, password };

    return this.http.post<SignInResponse>(url, dataUser)
      .pipe(
        map(({ user, token }) => {

          this.setAuthentication(user, token)
          this.authParams = this.activatedRoute.snapshot.queryParams['redirectURL'];

        }),
        catchError(error => throwError(() => error.error.message))
      )
  }

  public authStatusChangedEffect = effect(() => {
    switch (this.authStatus()) {
      case AuthStatus.checking:
      return;

      case AuthStatus.authenticated:
        if (this.authParams) {
          this.router.navigateByUrl(this.authParams)
        }
        else {
          this.router.navigateByUrl('/admin')
        }
      return;

      case AuthStatus.notAuthenticated:
      return;
    }
  });

  register(user: User) {
    const url = `${this.apiUrl}/auth/sign-up`;

    return this.http.post<RegisterResponse>(url, user)
      .pipe(
        map(({ user, token }) => {
          this.setAuthentication(user, token)
        }),
        catchError(error => throwError(() => error.error.message))
      )
  }

  checkAuthStatus(): Observable<Boolean> {
    const url = `${this.apiUrl}/auth/check-token`;
    const token = this.getJwtToken();

    if (!token) {
      this.logOut();
      return of(false)
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<CheckTokenResponse>(url, { headers })
      .pipe(
        map(({ user, token }) => this.setAuthentication(user, token)),
        catchError((error) => {
          this._authStatus.set(AuthStatus.notAuthenticated)
          return of(false)
        })
      );
  }

  AuthtokenInterceptor() {
    const url = `${this.apiUrl}/auth/refresh`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getRefreshToken() || ''}`);

    return this.http.post<RegisterResponse>(url, { headers }).pipe(
      map(({ user, token }) => this.setAuthentication(user, token)),
      catchError(error => throwError(() => error.error.message))
    )
  }

  logOut() {
    this.removeTokens();
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated)
  }

  recoveryPassword(email: string) {
    const url = `${this.apiUrl}/auth/forgot-password`;

    return this.http.post<ForgotPassword>(url, email).pipe(
      map(resp => resp.message),
      catchError(error => throwError(() => error.error.message))
    )
  }

  changePassword(id: string, passwordContent: PasswordContent) {

    const { password } = passwordContent;
    const url = `${this.apiUrl}/auth/reset-password`;

    return this.http.post<ResetPassword>(url, { id, password }).pipe(
      map(resp => resp.message),
      catchError(error => throwError(() => error.error.message))
    )
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN) || '';
  }
  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }


  private storeTokens(tokens: string) {
    this.removeTokens();
    localStorage.setItem(this.JWT_TOKEN, tokens);
    localStorage.setItem(this.REFRESH_TOKEN, tokens);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}
