import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBarLabel } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AuthService } from '../../services/auth.service';
import { MessagesService } from '../../../services/messages.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, MatProgressBarModule, MatSnackBarLabel],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  private fb          = inject( FormBuilder );
  private authService = inject( AuthService );
  private messagesService = inject( MessagesService );
  private router      = inject( Router );

  public isLoading: boolean = false;

  public signInForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit(): void {
    if ( this.signInForm.invalid ) {
      this.signInForm.markAllAsTouched();
      return;
    }
    const { email, password } = this.signInForm.value;

    this.isLoading = true;
    this.authService.sigIn( email, password )
    .subscribe({
      next: value => {
        this.messagesService.authRegisterMesage(`Sign In successfully`);
        this.isLoading = false;
      },
      complete: () => {
        this.signInForm.reset();
        this.router.navigateByUrl('/admin');
      },
      error: error => {
        this.messagesService.authRegisterMesage(`${error}`);
        this.isLoading = false;
      }
    })
  }

  isValidField( field: string ): boolean | null {
    return this.signInForm.controls[field].errors
      && this.signInForm.controls[field].touched;
  }

  getFieldError( field: string ): string | null {

    if ( !this.signInForm.controls[field] ) return null;

    const errors = this.signInForm.controls[field].errors || {};
    for (const key of Object.keys(errors)) {
      switch( key ) {
        case 'required':
          return `The ${field} field is required`;

        case 'minlength':
          return `Minimum ${errors['minlength'].requiredLength} characters`;

        case 'email':
          return `The ${field} field needs to be an valid email`;
      }
    }
    return null;
  }
}
