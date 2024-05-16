import { Injectable, Injector, inject } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

// @Injectable()
// export class TokenInterceptor implements HttpInterceptor {

//   // private authService = inject(AuthService);
//   constructor(private injector: Injector) {

//   }
//   public auth = this.injector.get(AuthService);

//   intercept(req: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
//     if (this.auth.getJwtToken()) {
//       req = this.addToken(req, this.auth.getJwtToken());
//     }

//     return handler.handle(req);
//   }

//   private addToken(request: HttpRequest<any>, token: string) {
//     return request.clone({
//       setHeaders: {
//         'Authorization': `Bearer ${token}`
//       }
//     });
//   }

//   private isRefreshing = false;
//   private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

//   private handle401Error(request: HttpRequest<any>, handle: HttpHandler) {

//     if (!this.isRefreshing) {
//       this.isRefreshing = true;
//       this.refreshTokenSubject.next(null);

//       return this.auth.AuthtokenInterceptor().pipe(
//         switchMap((token: any) => {
//           this.isRefreshing = false;
//           this.refreshTokenSubject.next(token);
//           return handle.handle(this.addToken(request, token));
//         }));

//     } else {
//       return this.refreshTokenSubject.pipe(
//         filter(token => token != null),
//         take(1),
//         switchMap(jwt => {
//           return handle.handle(this.addToken(request, jwt));
//         }));
//     }
//   }
// }

// export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
//   const authToken = inject(AuthService).getJwtToken();


//   // Clone the request and add the authorization header
//   const authReq = req.clone({
//     setHeaders: {
//       Authorization: `Bearer ${authToken}`
//     }
//   });

//   // Pass the cloned request with the updated header to the next handler
//   return next(authReq).pipe(
//     catchError((err: any) => {
//       if (err instanceof HttpErrorResponse) {
//         // Handle HTTP errors
//         if (err.status === 401) {
//           // Specific handling for unauthorized errors
//           console.error('Unauthorized request:', err);
//           // You might trigger a re-authentication flow or redirect the user here
//           let isRefreshing = false;
//           let refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
//           inject(AuthService).AuthtokenInterceptor().pipe(
//           switchMap((token: any) => {
//           isRefreshing = true;
//           refreshTokenSubject.next(token);
//           return next(addToken(req, token));
//         }));
//         } else {
//           // Handle other HTTP error codes
//           console.error('HTTP error:', err);
//         }
//       } else {
//         // Handle non-HTTP errors
//         console.error('An error occurred:', err);
//       }

//       // Re-throw the error to propagate it further
//       return throwError(() => err);
//     })
//   );;
// };

// export function addToken(request: HttpRequest<any>, token: string) {
//   return request.clone({
//     setHeaders: {
//       'Authorization': `Bearer ${token}`
//     }
//   });
// }

// export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
//   // Inject the current `AuthService` and use it to get an authentication token:
//   const authToken = inject(AuthService).getJwtToken();
//   // Clone the request to add the authentication header.
//   const newReq = req.clone({
//     setHeaders: {
//       'Authorization': `Bearer ${authToken}`
//     }
//   });
//   return next(newReq);
// }
