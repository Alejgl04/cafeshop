import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBarLabel } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AuthService } from '../../services/auth.service';
import { MessagesService } from '../../../services/messages.service';
import { ValidatorsService } from '../../../services/validators.service';

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
  private validMessages  = inject( ValidatorsService );


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
        this.messagesService.authMessages(`Sign In successfully`);
        this.isLoading = false;
      },
      complete: () => {
        this.signInForm.reset();
        this.router.navigateByUrl('/admin');
      },
      error: error => {
        this.messagesService.authMessages(`${error}`);
        this.isLoading = false;
      }
    })
  }

  isValidField( field: string ): boolean | null {
    return this.validMessages.isValidField( this.signInForm, field);
  }

  getFieldError( field: string ): string | null {
    return this.validMessages.getFieldError( this.signInForm, field)
  }
}
