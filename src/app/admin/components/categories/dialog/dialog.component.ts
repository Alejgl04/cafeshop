import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { MessagesService } from '../../../../services/messages.service';
import { ValidatorsService } from '../../../../services/validators.service';
import { CategoriesService } from '../../../services/categories.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatButtonModule, MatProgressBarModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  private fb              = inject( FormBuilder );
  private messagesService = inject( MessagesService );
  private validMessages   = inject( ValidatorsService );
  private categoryService = inject(CategoriesService)

  public dialog = inject(MatDialog);
  public isLoading = signal(false);

  public addCategoryForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
  });

  onSubmit(): void {
    if ( this.addCategoryForm.invalid ) {
      this.addCategoryForm.markAllAsTouched();
      return;
    }
    const { name } = this.addCategoryForm.value;
    this.isLoading.set(true);
    this.categoryService.saveNewCategory(name)
    .subscribe({
      next: value => {
        this.messagesService.authMessages(`${value},`);
        this.isLoading.set(false);
      },
      complete: () => {
        this.addCategoryForm.reset();
        this.dialog.closeAll();

      },
      error: error => {
        this.messagesService.authMessages(`${error}`);
        this.isLoading.set(false);
      }
    })
  }

  isValidField( field: string ): boolean | null {
    return this.validMessages.isValidField( this.addCategoryForm, field);
  }

  getFieldError( field: string ): string | null {
    return this.validMessages.getFieldError( this.addCategoryForm, field)
  }
}
