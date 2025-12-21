import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { EMPTY, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, pluck, switchMap } from 'rxjs/operators';
import * as XLSX from 'xlsx';

import { UiService } from '../../../../services/core/ui.service';
import { PurchaseService } from '../../../../services/common/purchase.service';
import { UtilsService } from '../../../../services/core/utils.service';
import { ReloadService } from '../../../../services/core/reload.service';
import { VendorService } from '../../../../services/vendor/vendor.service';
import { ShopInformationService } from '../../../../services/common/shop-information.service';
import { ConfirmDialogComponent } from '../../../../shared/components/ui/confirm-dialog/confirm-dialog.component';
import { FilterData } from '../../../../interfaces/gallery/filter-data';
import { Purchase } from '../../../../interfaces/common/purchase.interface';
import { ShopInformation } from '../../../../interfaces/common/shop-information.interface';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.scss']
})
export class PurchaseListComponent implements OnInit, OnDestroy {
  // Vendor Base Data
  vendorId: string;
  role: string;
  checkEditPermission: boolean = false;
  checkDeletePermission: boolean = false;

  // Store Data
  isLoading: boolean = true;
  allPurchases: Purchase[] = [];
  purchases: Purchase[] = [];
  id?: string;
  purchaseData: Purchase = null;

  // Shop data
  shopInformation: ShopInformation;

  // FilterData
  isDefaultFilter: boolean = false;
  filter: any = null;
  sortQuery: any = null;
  activeFilter: string = 'all'; // 'all', 'Completed', 'Pending', 'Partial'
  activeSort: number;

  // Selected Data
  selectedIds: string[] = [];
  @ViewChild('matCheckbox') matCheckbox: MatCheckbox;

  // Search Area
  @ViewChild('searchForm') searchForm: NgForm;
  searchQuery = null;
  searchPurchases: Purchase[] = [];

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subForm: Subscription;
  private subReload: Subscription;
  private subShopInfo: Subscription;

  constructor(
    private purchaseService: PurchaseService,
    private uiService: UiService,
    private utilsService: UtilsService,
    private router: Router,
    private dialog: MatDialog,
    private reloadService: ReloadService,
    private vendorService: VendorService,
    private shopInformationService: ShopInformationService,
  ) {
  }

  ngOnInit(): void {
    this.getVendorBaseData();
    this.getShopInformation();
    this.initFilter();
    this.getAllPurchases();
    this.subReload = this.reloadService.refreshCustomer$.subscribe(() => {
      this.getAllPurchases();
    });
  }

  /**
   * VENDOR BASE DATA
   */
  private getVendorBaseData() {
    this.vendorId = this.vendorService.getUserId();
    this.role = this.vendorService.getUserRole() || 'admin';
    this.checkEditPermission = true;
    this.checkDeletePermission = true;
  }

  /**
   * INIT FILTER
   */
  private initFilter() {
    this.filter = null;
    this.sortQuery = { createdAt: -1 };
    this.activeSort = 0;
    this.isDefaultFilter = true;
  }

  /**
   * HTTP REQ HANDLE
   */
  private getAllPurchases() {
    this.isLoading = true;

    const mSelect = {
      purchaseNo: 1,
      purchaseDate: 1,
      purchaseDateString: 1,
      supplier: 1,
      total: 1,
      paidAmount: 1,
      dueAmount: 1,
      paymentType: 1,
      status: 1,
      createdAt: 1,
      createdAtString: 1,
    };

    let mFilter: any = null;

    // Apply filter
    if (this.activeFilter !== 'all') {
      mFilter = { status: this.activeFilter };
    }

    const filter: FilterData = {
      filter: mFilter,
      pagination: null,
      select: mSelect,
      sort: this.sortQuery || { createdAt: -1 },
    };

    this.subDataOne = this.purchaseService.getAllPurchases(filter, this.searchQuery)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.success) {
            this.allPurchases = res.data || [];
            this.purchases = this.allPurchases;
            this.searchPurchases = this.allPurchases;
          } else {
            this.uiService.message('Failed to load purchases', 'warn');
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Error loading purchases:', err);
          this.uiService.message('Failed to load purchases. Please try again.', 'warn');
        },
      });
  }

  /**
   * FILTER BY STATUS
   */
  onFilterChange(filter: string) {
    this.activeFilter = filter;
    this.getAllPurchases();
  }

  /**
   * SEARCH AREA
   */
  ngAfterViewInit() {
    const formValue = this.searchForm?.valueChanges;
    if (formValue) {
      this.subForm = formValue
        .pipe(
          pluck('searchTerm'),
          debounceTime(200),
          distinctUntilChanged(),
          switchMap((data) => {
            this.searchQuery = data;
            if (this.searchQuery && this.searchQuery.length > 0) {
              this.getAllPurchases();
            } else {
              this.searchQuery = null;
              this.getAllPurchases();
            }
            return EMPTY;
          })
        )
        .subscribe(() => {});
    }
  }

  /**
   * ON SELECT CHANGE
   */
  onCheckChange(event: MatCheckboxChange, index: number, id: string) {
    if (event.checked) {
      this.selectedIds.push(id);
    } else {
      const i = this.selectedIds.findIndex(f => f === id);
      this.selectedIds.splice(i, 1);
    }
  }

  onAllSelectChange(event: MatCheckboxChange, purchases: Purchase[], index: number) {
    if (event.checked) {
      purchases.forEach(m => {
        this.selectedIds.push(m._id);
        (m as any).select = true;
      });
    } else {
      purchases.forEach(m => {
        const i = this.selectedIds.findIndex(f => f === m._id);
        this.selectedIds.splice(i, 1);
        (m as any).select = false;
      });
    }
  }

  /**
   * DELETE METHODS
   */
  private deletePurchaseById(id: string) {
    this.subDataTwo = this.purchaseService.deletePurchaseById(id)
      .subscribe({
        next: (res) => {
          this.uiService.message(res.message || 'Purchase deleted successfully', 'success');
          this.getAllPurchases();
        },
        error: (err) => {
          console.error('Error deleting purchase:', err);
          this.uiService.message('Failed to delete purchase', 'warn');
        }
      });
  }

  openConfirmDialog(type: string, purchase?: Purchase) {
    if (type === 'delete' && purchase) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        maxWidth: '400px',
        data: {
          title: 'Confirm Delete',
          message: `Are you sure you want to delete purchase: ${purchase.purchaseNo}?`,
        },
      });
      dialogRef.afterClosed().subscribe((dialogResult) => {
        if (dialogResult) {
          this.deletePurchaseById(purchase._id);
        }
      });
    }
  }

  /**
   * EXPORT TO EXCEL
   */
  exportToExcel() {
    const data = this.purchases.map(purchase => ({
      'Purchase No': purchase.purchaseNo,
      'Date': purchase.purchaseDateString || (purchase.purchaseDate ? new Date(purchase.purchaseDate).toLocaleDateString() : '-'),
      'Supplier': purchase.supplier?.name || '-',
      'Total': purchase.total || 0,
      'Paid': purchase.paidAmount || 0,
      'Due': purchase.dueAmount || 0,
      'Status': purchase.status || '-',
      'Payment Type': purchase.paymentType || '-',
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Purchases');
    XLSX.writeFile(workbook, `Purchases_${new Date().getTime()}.xlsx`);
    this.uiService.message('Excel file downloaded successfully', 'success');
  }

  /**
   * GET SHOP INFORMATION
   */
  private getShopInformation() {
    this.subShopInfo = this.shopInformationService.getShopInformation()
      .subscribe({
        next: res => {
          this.shopInformation = res.data;
        },
        error: err => {
          console.log(err);
        }
      });
  }

  /**
   * GET STATUS BADGE CLASS
   */
  getStatusBadgeClass(status: string): string {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'status-completed';
      case 'pending':
        return 'status-pending';
      case 'partial':
        return 'status-partial';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return 'status-default';
    }
  }

  /**
   * ON DESTROY
   */
  ngOnDestroy() {
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
    if (this.subDataTwo) {
      this.subDataTwo.unsubscribe();
    }
    if (this.subDataThree) {
      this.subDataThree.unsubscribe();
    }
    if (this.subForm) {
      this.subForm.unsubscribe();
    }
    if (this.subReload) {
      this.subReload.unsubscribe();
    }
    if (this.subShopInfo) {
      this.subShopInfo.unsubscribe();
    }
  }
}

