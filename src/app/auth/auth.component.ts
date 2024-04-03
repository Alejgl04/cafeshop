import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../shared/footer/footer.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterModule, CommonModule, FooterComponent, NavbarComponent],
  templateUrl: './auth.component.html',
})
export class AuthComponent {

}
