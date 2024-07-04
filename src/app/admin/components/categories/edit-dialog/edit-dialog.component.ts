import { CommonModule } from '@angular/common';
import { Component, Inject, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MessagesService } from '../../../../services/messages.service';
import { ValidatorsService } from '../../../../services/validators.service';
import { CategoriesService } from '../../../services/categories.service';
import { Category } from '../../../interfaces';

@Component({
  selector: 'app-edit-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatButtonModule, MatProgressBarModule],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.css'
})
export class EditDialogComponent {
  private fb              = inject( FormBuilder );
  private messagesService = inject( MessagesService );
  private validMessages   = inject( ValidatorsService );
  private categoryService = inject( CategoriesService );

  constructor(
    public MatDialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category,
  ) {
  }

  public dialog = inject(MatDialog);
  public isLoading = signal(false);

  public updateCategoryForm: FormGroup = this.fb.group({
    name: [this.data.name, [Validators.required]],
  });

  onSubmit(): void {
    if ( this.updateCategoryForm.invalid ) {
      this.updateCategoryForm.markAllAsTouched();
      return;
    }
    this.isLoading.set(true);
    this.categoryService.updateCategory(this.updateCategoryForm.value, this.data.id)
    .subscribe({
      next: value => {
        this.messagesService.confirmMessages(`${value},`);
        this.isLoading.set(false);
      },
      complete: () => {
        this.updateCategoryForm.reset();
        this.dialog.closeAll();

      },
      error: error => {
        this.messagesService.confirmMessages(`${error}`);
        this.isLoading.set(false);
      }
    })
  }

  isValidField( field: string ): boolean | null {
    return this.validMessages.isValidField( this.updateCategoryForm, field);
  }

  getFieldError( field: string ): string | null {
    return this.validMessages.getFieldError( this.updateCategoryForm, field)
  }
}
