import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from '../../../services/core/ui.service';
import { CentralDashboardService } from '../../../services/common/central-dashboard.service';

@Component({
  selector: 'app-central-dashboard',
  templateUrl: './central-dashboard.component.html',
  styleUrls: ['./central-dashboard.component.scss']
})
export class CentralDashboardComponent implements OnInit, OnDestroy {
  // Store Data
  isLoading: boolean = true;
  dashboardData: any = null;
  
  // Date Filter
  startDate: Date;
  endDate: Date;
  
  // Table
  salesColumns: string[] = ['branchName', 'totalSales', 'invoiceCount', 'avgSaleAmount'];
  
  // Subscriptions
  private subDataOne: Subscription;

  constructor(
    private centralDashboardService: CentralDashboardService,
    private uiService: UiService
  ) {
    // Set default date range (last 30 days)
    const today = new Date();
    this.endDate = today;
    this.startDate = new Date(today);
    this.startDate.setDate(today.getDate() - 30);
  }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  onDateRangeChange(): void {
    if (this.startDate && this.endDate) {
      this.loadDashboardData();
    }
  }

  private loadDashboardData(): void {
    this.isLoading = true;
    const filter: any = {};
    
    if (this.startDate) {
      filter.startDate = this.startDate.toISOString().split('T')[0];
    }
    if (this.endDate) {
      filter.endDate = this.endDate.toISOString().split('T')[0];
    }

    this.subDataOne = this.centralDashboardService.getCentralDashboardData(filter).subscribe({
      next: (res) => {
        if (res.success) {
          this.dashboardData = res.data;
          this.isLoading = false;
        } else {
          this.uiService.message(res.message || 'Failed to load dashboard data', 'warn');
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.error(err);
        this.uiService.message('Failed to load dashboard data', 'wrong');
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
  }
}

