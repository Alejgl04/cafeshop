import { Component, AfterViewInit, ViewChild, Input } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CategoriesResponse } from '../../../interfaces';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input() categoriesSource = new MatTableDataSource<CategoriesResponse>([]);
  displayedColumns: string[] = ['id', 'name', 'actions'];


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.categoriesSource.paginator = this.paginator;
    this.categoriesSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.categoriesSource.filter = filterValue.trim().toLowerCase();

    if (this.categoriesSource.paginator) {
      this.categoriesSource.paginator.firstPage();
    }
  }

  editCategory( id: string ): void {
    console.log(id);
  }
}
