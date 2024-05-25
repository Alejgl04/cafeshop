import { Component, inject, OnInit } from '@angular/core';
import { LoadingComponent } from '../../components/loading/loading.component';
import { CategoriesResponse } from '../../interfaces';
import { CategoriesService } from '../../services/categories.service';
import { MessagesService } from '../../../services/messages.service';
import { TableComponent } from '../../components/categories/table/table.component';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, LoadingComponent, TableComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  private categoriesService = inject(CategoriesService);
  private messageService = inject(MessagesService)

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
}

