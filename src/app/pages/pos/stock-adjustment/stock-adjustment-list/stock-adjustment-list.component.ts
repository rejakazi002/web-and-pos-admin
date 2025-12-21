import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import { UiService } from '../../../../services/core/ui.service';
import { StockAdjustmentService } from '../../../../services/common/stock-adjustment.service';
import { ProductService } from '../../../../services/common/product.service';
import { ReloadService } from '../../../../services/core/reload.service';
import { VendorService } from '../../../../services/vendor/vendor.service';
import { ConfirmDialogComponent } from '../../../../shared/components/ui/confirm-dialog/confirm-dialog.component';
import { FilterData } from '../../../../interfaces/gallery/filter-data';
import { StockAdjustment } from '../../../../interfaces/common/stock-adjustment.interface';

@Component({
  selector: 'app-stock-adjustment-list',
  templateUrl: './stock-adjustment-list.component.html',
  styleUrls: ['./stock-adjustment-list.component.scss']
})
export class StockAdjustmentListComponent implements OnInit, OnDestroy {
  // Store Data
  isLoading: boolean = true;
  adjustments: StockAdjustment[] = [];
  totalAdjustments = 0;
  adjustmentsPerPage = 10;
  currentPage = 0;

  // Filter
  searchCtrl = new FormControl('');
  selectedType: string = '';
  startDate: Date;
  endDate: Date = new Date();

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subReload: Subscription;
  private subSearch: Subscription;

  constructor(
    private stockAdjustmentService: StockAdjustmentService,
    private productService: ProductService,
    private uiService: UiService,
    public router: Router,
    private dialog: MatDialog,
    private reloadService: ReloadService,
    private vendorService: VendorService,
  ) {
    // Don't set default dates - let user filter if needed
    // This ensures all data is shown by default
    this.startDate = null;
    this.endDate = null;
  }

  ngOnInit(): void {
    this.loadAllAdjustments();

    // Reload trigger
    this.subReload = this.reloadService.refreshData$.subscribe(() => {
      this.loadAllAdjustments();
    });

    // Search Control
    this.subSearch = this.searchCtrl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        this.currentPage = 0;
        this.loadAllAdjustments(term);
        return EMPTY;
      })
    ).subscribe();
  }

  loadAllAdjustments(searchQuery?: string): void {
    this.isLoading = true;
    
    // Build filter object
    const mFilter: any = {};
    
    // Add adjustmentType filter if selected
    if (this.selectedType && this.selectedType.trim() !== '') {
      mFilter.adjustmentType = this.selectedType;
    }
    
    // Add date filter only if both dates are explicitly provided
    if (this.startDate && this.endDate) {
      const startDate = new Date(this.startDate);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(this.endDate);
      endDate.setHours(23, 59, 59, 999);
      
      mFilter.date = {
        $gte: startDate,
        $lte: endDate
      };
    }
    
    const filter: FilterData = {
      pagination: {
        pageSize: this.adjustmentsPerPage,
        currentPage: this.currentPage
      },
      filter: Object.keys(mFilter).length > 0 ? mFilter : undefined,
      sort: { createdAt: -1 }
    };
    
    console.log('Loading adjustments with filter:', filter);

    this.subDataOne = this.stockAdjustmentService.getAllStockAdjustments(filter, searchQuery).subscribe({
      next: (res) => {
        console.log('Stock Adjustment API Response:', res);
        if (res.success) {
          // Backend returns: { data: [...], count: ..., success: true }
          // When pagination is used, dataAggregates[0] = { data: [...], count: ... }
          // So res.data should be the array directly
          if (Array.isArray(res.data)) {
            this.adjustments = res.data;
            this.totalAdjustments = res.count || res.data.length || 0;
          } else {
            // Fallback: check if data is nested
            this.adjustments = res.data?.data || [];
            this.totalAdjustments = res.data?.count || res.count || 0;
          }
          console.log('Loaded adjustments:', this.adjustments.length, 'Total:', this.totalAdjustments);
          this.isLoading = false;
        } else {
          console.error('API returned success: false', res);
          this.uiService.message(res.message || 'Failed to load adjustments', 'warn');
          this.adjustments = [];
          this.totalAdjustments = 0;
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.error('Stock Adjustment API Error:', err);
        this.uiService.message(err.error?.message || 'Failed to load adjustments', 'warn');
        this.adjustments = [];
        this.totalAdjustments = 0;
        this.isLoading = false;
      }
    });
  }

  onFilterChange(): void {
    this.currentPage = 0;
    this.loadAllAdjustments(this.searchCtrl.value);
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.adjustmentsPerPage = event.pageSize;
    this.loadAllAdjustments(this.searchCtrl.value);
  }

  deleteAdjustment(adjustment: StockAdjustment): void {
    this.openConfirmDialog(`Are you sure you want to delete this adjustment?`, () => {
      this.subDataTwo = this.stockAdjustmentService.deleteStockAdjustmentById(adjustment._id)
        .subscribe({
          next: (res) => {
            if (res.success) {
              this.uiService.message('Adjustment deleted successfully', 'success');
              this.reloadService.needRefreshData$();
            } else {
              this.uiService.message('Failed to delete adjustment', 'warn');
            }
          },
          error: (err) => {
            console.error(err);
            this.uiService.message('Failed to delete adjustment', 'warn');
          }
        });
    });
  }

  private openConfirmDialog(message: string, callback: () => void): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'Confirm Action',
        message: message,
        noButtonText: 'Cancel',
        yesButtonText: 'Confirm'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        callback();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
    if (this.subDataTwo) {
      this.subDataTwo.unsubscribe();
    }
    if (this.subReload) {
      this.subReload.unsubscribe();
    }
    if (this.subSearch) {
      this.subSearch.unsubscribe();
    }
  }
}

