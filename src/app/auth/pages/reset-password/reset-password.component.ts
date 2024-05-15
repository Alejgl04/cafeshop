import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MessagesService } from '../../../services/messages.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ValidatorsService } from '../../../services/validators.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {


  private fb          = inject( FormBuilder );
  private authService = inject( AuthService );
  private messagesService = inject( MessagesService );
  private router      = inject( Router );
  private activatedRoute = inject(ActivatedRoute);
  private validMessages  = inject( ValidatorsService );

  public idUser: string = '';
  public isLoading: boolean = false;

  public resetForm: FormGroup = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(6)]],
    rePassword: ['', [Validators.required, Validators.minLength(6)]],
  }, {
    validators: [
      this.validMessages.isFieldOneEqualFieldTwo('password', 'rePassword')
    ]
  });

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe( params => {
      this.idUser = params.get('id') || '';
    })
  }
  onSubmit(): void {
    if ( this.resetForm.invalid ) {
      this.resetForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.authService.changePassword( this.idUser, this.resetForm.value )
    .subscribe({
      next: value => {
        this.messagesService.authMessages(`${value}`);
        this.isLoading = false;
      },
      complete: () => {
        this.resetForm.reset();
        this.router.navigateByUrl('/auth');
      },
      error: error => {
        this.messagesService.authMessages(`${error}`);
        this.isLoading = false;
      }
    })
  }

  isValidField( field: string ): boolean | null {
    return this.validMessages.isValidField( this.resetForm, field);
  }

  getFieldError( field: string ): string | null {
    return this.validMessages.getFieldError( this.resetForm, field)
  }
}
