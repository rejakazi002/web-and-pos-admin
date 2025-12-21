import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import { UiService } from '../../../../services/core/ui.service';
import { ProductDamageService } from '../../../../services/common/product-damage.service';
import { ReloadService } from '../../../../services/core/reload.service';
import { VendorService } from '../../../../services/vendor/vendor.service';
import { ConfirmDialogComponent } from '../../../../shared/components/ui/confirm-dialog/confirm-dialog.component';
import { FilterData } from '../../../../interfaces/gallery/filter-data';
import { ProductDamage } from '../../../../interfaces/common/product-damage.interface';

@Component({
  selector: 'app-product-damage-list',
  templateUrl: './product-damage-list.component.html',
  styleUrls: ['./product-damage-list.component.scss']
})
export class ProductDamageListComponent implements OnInit, OnDestroy {
  // Store Data
  isLoading: boolean = true;
  damages: ProductDamage[] = [];
  totalDamages = 0;
  damagesPerPage = 10;
  currentPage = 0;
  reports: any = { totalAmount: 0, totalQuantity: 0 };

  // Filter
  searchCtrl = new FormControl('');
  startDate: Date;
  endDate: Date = new Date();

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subReload: Subscription;
  private subSearch: Subscription;

  constructor(
    private productDamageService: ProductDamageService,
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
    this.loadAllDamages();

    // Reload trigger
    this.subReload = this.reloadService.refreshData$.subscribe(() => {
      this.loadAllDamages();
    });

    // Search Control
    this.subSearch = this.searchCtrl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        this.currentPage = 0;
        this.loadAllDamages(term);
        return EMPTY;
      })
    ).subscribe();
  }

  loadAllDamages(searchQuery?: string): void {
    this.isLoading = true;
    
    // Build filter object
    const mFilter: any = {};
    
    // Add date filter only if both dates are explicitly provided
    if (this.startDate && this.endDate) {
      mFilter.dateString = {
        $gte: this.startDate.toISOString().split('T')[0],
        $lte: this.endDate.toISOString().split('T')[0]
      };
    }
    
    const filter: FilterData = {
      pagination: {
        pageSize: this.damagesPerPage,
        currentPage: this.currentPage
      },
      filter: Object.keys(mFilter).length > 0 ? mFilter : undefined,
      sort: { createdAt: -1 }
    };
    
    console.log('Loading damages with filter:', filter);

    this.subDataOne = this.productDamageService.getAllProductDamages(filter, searchQuery).subscribe({
      next: (res) => {
        console.log('Product Damage API Response:', res);
        if (res.success) {
          // Handle both response formats
          let damagesData = res.data;
          if (Array.isArray(damagesData)) {
            this.damages = damagesData;
            this.totalDamages = res.count || damagesData.length || 0;
          } else {
            this.damages = damagesData?.data || [];
            this.totalDamages = damagesData?.count || res.count || 0;
          }
          
          // Calculate reports if not provided by backend
          if ((res as any).reports) {
            this.reports = (res as any).reports;
          } else {
            // Calculate totals from damages array
            this.reports = {
              totalQuantity: this.damages.reduce((sum, d) => sum + (d.quantity || 0), 0),
              totalAmount: this.damages.reduce((sum, d) => {
                const price = (d.product as any)?.purchasePrice || (d.product as any)?.costPrice || 0;
                const qty = d.quantity || 0;
                return sum + (price * qty);
              }, 0)
            };
          }
          
          console.log('Loaded damages:', this.damages.length, 'Reports:', this.reports);
          this.isLoading = false;
        } else {
          this.uiService.message('Failed to load damages', 'warn');
          this.damages = [];
          this.totalDamages = 0;
          this.reports = { totalAmount: 0, totalQuantity: 0 };
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.error('Product Damage API Error:', err);
        this.uiService.message('Failed to load damages', 'warn');
        this.damages = [];
        this.totalDamages = 0;
        this.reports = { totalAmount: 0, totalQuantity: 0 };
        this.isLoading = false;
      }
    });
  }

  onFilterChange(): void {
    this.currentPage = 0;
    this.loadAllDamages(this.searchCtrl.value);
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.damagesPerPage = event.pageSize;
    this.loadAllDamages(this.searchCtrl.value);
  }

  deleteDamage(damage: ProductDamage): void {
    this.openConfirmDialog(`Are you sure you want to delete this damage record?`, () => {
      this.subDataTwo = this.productDamageService.deleteProductDamageById(damage._id)
        .subscribe({
          next: (res) => {
            if (res.success) {
              this.uiService.message('Damage record deleted successfully', 'success');
              this.reloadService.needRefreshData$();
            } else {
              this.uiService.message('Failed to delete damage record', 'warn');
            }
          },
          error: (err) => {
            console.error(err);
            this.uiService.message('Failed to delete damage record', 'warn');
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

