import { Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { DashboardService } from '../../services/dashboard.service';
import { DashboardCount } from '../../interfaces';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  public isLoading: boolean = false;
  private dashboardService = inject(DashboardService);
  public dashboardCount?: DashboardCount;

  ngOnInit(): void {
    this.dashboardService.getAllCounts().subscribe(
      response => {
        console.log(response  );
      }
    )
  }


}
