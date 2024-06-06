import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { CategoriesResponse } from '../../interfaces';
import { CategoriesService } from '../../services/categories.service';
import { MessagesService } from '../../../services/messages.service';
import { LoadingComponent } from '../../components/loading/loading.component';
import { TableComponent } from '../../components/categories/table/table.component';
import { DialogComponent } from '../../components/categories/dialog/dialog.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, LoadingComponent, TableComponent, DialogComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  private categoriesService = inject(CategoriesService);
  private messageService = inject(MessagesService);
  public dialog = inject(MatDialog);

  public isLoading: boolean = false;
  public categoriesSource = new MatTableDataSource<CategoriesResponse>([]);

  ngOnInit(): void {
    this.categories();
  }

  categories() {
    this.categoriesService.getAllCategories()
    .subscribe({
      next: data => {
        this.isLoading = true;
        this.categoriesSource.data = data;
      },
      error: error => {
        this.isLoading = true;
        this.messageService.confirmMessages(`${error.message}`);
      }
    })
  }

  addCategory(): void {
    this.dialog.open(DialogComponent);
  }
}

