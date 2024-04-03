import { Component } from '@angular/core';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { BannerAreaComponent } from '../../../components/banner-area/banner-area.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FooterComponent, NavbarComponent, BannerAreaComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

}
