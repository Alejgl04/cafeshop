import { Component } from '@angular/core';
import { FooterComponent } from '../shared/footer/footer.component';
import { MenuAreaComponent } from '../components/menu-area/menu-area.component';
import { ReviewComponent } from '../components/review/review.component';
import { BannerAreaComponent } from '../components/banner-area/banner-area.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AboutComponent } from '../components/about/about.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule, NavbarComponent, BannerAreaComponent, ReviewComponent, MenuAreaComponent, FooterComponent, AboutComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
