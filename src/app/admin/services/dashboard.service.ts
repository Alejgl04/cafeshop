import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly apiUrl: string = environment.apiUrl;
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  public authToken = this.authService.getJwtToken();
  public headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken}`);


  getAllCounts() {
    return this.http.get(`${this.apiUrl}/dashboard`, { headers: this.headers });
  }
}
