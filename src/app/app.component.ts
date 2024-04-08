import { Component, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private authService = inject( AuthService );
  private router = inject( Router );

  public finishedAuthCheck = computed<boolean>( () => {

    if ( this.authService.authStatus() === AuthStatus.checking ) {
      return false;
    }
    return true;
  });

  public authStatusChangedEffect = effect(() => {
    switch(this.authService.authStatus()){
      case AuthStatus.checking:
        return;

      case AuthStatus.authenticated:
        this.router.navigateByUrl('/admin')
      return;

      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('/auth')
      return;
    }
  })}
