import { Component, OnInit, computed, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AuthService } from '../../../auth/services/auth.service';
import { MenuItem } from '../../interfaces/menu-items';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, MatSidenavModule, MatButtonModule, MatIconModule, MatToolbarModule, MatListModule, MatDividerModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  private authService = inject(AuthService);
  private router = inject(Router);
  public menuItems: MenuItem[] = [];

  public currentUser = computed( () => this.authService.currentUser() );

  ngOnInit(): void {
    this.menuItems = [
     {
       text: 'Users',
       route: 'users',
       icon: 'group_add'
     },
     {
       text: 'Dashboard',
       route: 'dashboard'
     },
     {
       text: 'Products',
       route: 'products'
     },
    ]
  }

  onLogout(): void {
    this.authService.logOut();
    this.router.navigateByUrl('/auth')
  }

}
