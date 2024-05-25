import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { AuthService } from '../../auth/services/auth.service';
import { CategoriesResponse } from '../interfaces';
import { Observable } from 'rxjs';

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
    return this.http.get<CategoriesResponse[]>(`${this.apiUrl}/category`, {headers: this.headers});
  }
}

