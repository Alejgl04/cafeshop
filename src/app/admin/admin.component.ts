import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'

})
export class AdminComponent {
  public showFiller: boolean = false;
}
