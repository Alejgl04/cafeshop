import { Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { DashboardService } from '../../services/dashboard.service';
import { DashboardCount } from '../../interfaces';
import { CardDasboardComponent } from '../../components/card-dasboard/card-dasboard.component';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, CardDasboardComponent, LoadingComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  private dashboardService = inject(DashboardService);
  public isLoading: boolean = false;
  public dashboardCount?: DashboardCount;


  ngOnInit(): void {
    this.dashboardService.getAllCounts().subscribe(
      (response) => {
        this.isLoading = true;
        this.dashboardCount = response;
      }
    )
  }


}
