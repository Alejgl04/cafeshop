import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ReviewComponent } from './components/review/review.component';
import { BannerAreaComponent } from './components/banner-area/banner-area.component';
import { MenuAreaComponent } from './components/menu-area/menu-area.component';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, BannerAreaComponent, ReviewComponent, MenuAreaComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cafeshop';
}
