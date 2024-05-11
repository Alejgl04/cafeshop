import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MessagesService } from '../../../services/messages.service';
import { ValidatorsService } from '../../../services/validators.service';
import { MatSnackBarLabel } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatProgressBarModule, MatSnackBarLabel],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  private fb = inject( FormBuilder );
  private authService = inject( AuthService );
  private messageService = inject( MessagesService );
  private validMessages  = inject( ValidatorsService );

  public isLoading: boolean = false;

  public forgotPasswordForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  onSubmit(): void {
    if ( this.forgotPasswordForm.invalid ) {
      this.forgotPasswordForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.authService.recoveryPassword( this.forgotPasswordForm.value )
    .subscribe({
      next: value => {
        console.log(value);
        this.messageService.authMessages('A message has been sent to your email');
        this.isLoading = false;
      },
      complete: () => {
        this.forgotPasswordForm.reset();
      },
      error: error => {
        this.messageService.authMessages(`${error}`);
        this.isLoading = false;
      }
    })
  }

  isValidField( field: string ): boolean | null {
    return this.validMessages.isValidField( this.forgotPasswordForm, field);
  }

  getFieldError( field: string ): string | null {
    return this.validMessages.getFieldError( this.forgotPasswordForm, field)
  }
}
