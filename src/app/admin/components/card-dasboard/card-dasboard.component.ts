import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { DashboardCount } from '../../interfaces';

@Component({
  selector: 'app-card-dasboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './card-dasboard.component.html',
  styleUrl: './card-dasboard.component.css'
})
export class CardDasboardComponent {

  @Input() dashboardItems?: DashboardCount;


}
