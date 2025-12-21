import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReportsService } from '../../../services/common/reports.service';
import { UiService } from '../../../services/core/ui.service';
import { CurrencyIconPipe } from '../../../shared/pipes/currency-icon.pipe';

@Component({
  selector: 'app-pos-dashboard',
  templateUrl: './pos-dashboard.component.html',
  styleUrls: ['./pos-dashboard.component.scss']
})
export class PosDashboardComponent implements OnInit, OnDestroy {
  isLoading: boolean = true;
  dashboardData: any = {
    todaySale: 0,
    todayProfit: 0,
    todayDue: 0,
    expense: 0,
    cashInHand: 0,
    invoiceCount: 0
  };

  private subDataOne: Subscription;

  constructor(
    private reportsService: ReportsService,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.isLoading = true;
    this.subDataOne = this.reportsService.getTodayDashboard().subscribe({
      next: (res) => {
        if (res.success) {
          this.dashboardData = res.data || this.dashboardData;
        } else {
          this.uiService.message(res.message || 'Failed to load dashboard data', 'warn');
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.uiService.message('Failed to load dashboard data', 'wrong');
        this.isLoading = false;
      }
    });
  }

  refreshData(): void {
    this.loadDashboardData();
  }

  ngOnDestroy(): void {
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
  }
}

