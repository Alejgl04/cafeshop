import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarLabel } from '@angular/material/snack-bar';


import { AuthService } from '../../services/auth.service';
import { MessagesService } from '../../../services/messages.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, MatProgressBarModule, MatSnackBarLabel],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  private fb          = inject( FormBuilder );
  private authService = inject( AuthService );
  private messagesService = inject( MessagesService );
  private router      = inject( Router );

  public isLoading: boolean = false;

  public registerForm: FormGroup = this.fb.group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit(): void {
    if ( this.registerForm.invalid ) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.authService.register( this.registerForm.value )
    .subscribe({
      next: value => {
        this.messagesService.authRegisterMesage(`${value}, Sign up successfully`);
        this.isLoading = false;
      },
      complete: () => {
        this.registerForm.reset();
        this.router.navigateByUrl('/admin');
      },
      error: error => {
        this.messagesService.authRegisterMesage(`${error}`);
        this.isLoading = false;
      }
    })
  }

  isValidField( field: string ): boolean | null {
    return this.registerForm.controls[field].errors
      && this.registerForm.controls[field].touched;
  }

  getFieldError( field: string ): string | null {

    if ( !this.registerForm.controls[field] ) return null;

    const errors = this.registerForm.controls[field].errors || {};
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
