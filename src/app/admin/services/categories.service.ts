import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { AuthService } from '../../auth/services/auth.service';
import { Category, CategoryCreate } from '../interfaces';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private readonly apiUrl: string = environment.apiUrl;
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  public authToken = this.authService.getJwtToken();
  public headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken}`);

  getAllCategories() {
    return this.http.get<Category[]>(`${this.apiUrl}/category`, {headers: this.headers});
  }

  getCategoryById(id: string) {
    return this.http.get<Category[]>(`${this.apiUrl}/category/${id}`, {headers: this.headers});
  }

  saveNewCategory(name: string) {
    return this.http.post<CategoryCreate>(`${this.apiUrl}/category`, {name}, {headers: this.headers})
    .pipe(
      map( resp => resp.message),
      catchError(error => throwError(() => error.error.message))
    )
  }

  updateCategory(category: Category, id: string) {
    return this.http.patch<Category>(`${this.apiUrl}/category/${id}`, category, {headers: this.headers})
    .pipe(
      map( resp => `Category ${resp.name} updated successfully`),
      catchError(error => throwError(() => error.error.message))
    )
  }
}

