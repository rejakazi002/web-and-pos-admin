import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { UiService } from '../../../../services/core/ui.service';
import { Router } from '@angular/router';
import { ReloadService } from '../../../../services/core/reload.service';
import { EMPTY, Subscription } from 'rxjs';
import { FilterData } from '../../../../interfaces/gallery/filter-data';
import { PurchaseService } from '../../../../services/common/purchase.service';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { UtilsService } from '../../../../services/core/utils.service';
import { debounceTime, distinctUntilChanged, pluck, switchMap } from 'rxjs/operators';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as XLSX from 'xlsx';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/components/ui/confirm-dialog/confirm-dialog.component';
import { Select } from '../../../../interfaces/core/select';
import { MONTHS, YEARS } from '../../../../core/utils/app-data';
import { ShopInformation } from '../../../../interfaces/common/shop-information.interface';
import { ShopInformationService } from '../../../../services/common/shop-information.service';

@Component({
  selector: 'app-purchase-return-list',
  templateUrl: './purchase-return-list.component.html',
  styleUrls: ['./purchase-return-list.component.scss'],
})
export class PurchaseReturnListComponent implements OnInit, OnDestroy {
  // Static Data
  months: Select[] = MONTHS;
  years: Select[] = YEARS;

  // Store Data
  isLoading: boolean = true;
  private allReturns: any[] = [];
  private holdAllReturns: any[] = [];
  returns: { _id: string, data: any[], total: number }[] = [];
  holdPrevData: any[] = [];
  calculation: any = null;
  holdCalculation: any = null;

  // Shop data
  shopInformation: ShopInformation;

  // FilterData
  isDefaultFilter: boolean = false;
  filter: any = null;
  sortQuery: any = null;
  activeFilterMonth: number = null;
  activeFilterYear: number = null;
  activeSort: number;

  // Selected Data
  selectedIds: string[] = [];
  @ViewChild('matCheckbox') matCheckbox: MatCheckbox;

  // Date
  today = new Date();
  dataFormDateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  // Search Area
  @ViewChild('searchForm') searchForm: NgForm;
  searchQuery = null;
  searchReturn: any[] = [];

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
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
    private shopInformationService: ShopInformationService,
  ) {}

  ngOnInit(): void {
    this.subReload = this.reloadService.refreshData$.subscribe(() => {
      this.getAllReturns();
    });

    this.setDefaultFilter();
    this.getAllReturns();
    this.getShopInformation();
  }

  ngAfterViewInit(): void {
    if (!this.searchForm) return;

    const formValue = this.searchForm.valueChanges;

    this.subForm = formValue
      .pipe(
        pluck('searchTerm'),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((data) => {
          this.searchQuery = data;
          if (this.searchQuery === '' || this.searchQuery === null) {
            this.searchReturn = [];
            this.returns = this.holdPrevData;
            this.allReturns = this.holdAllReturns;
            this.calculation = this.holdCalculation;
            this.searchQuery = null;
            return EMPTY;
          }

          const mSelect = {
            returnPurchaseNo: 1,
            originalPurchaseNo: 1,
            supplier: 1,
            products: 1,
            returnDate: 1,
            returnDateString: 1,
            grandTotal: 1,
            subTotal: 1,
          };

          const filter: FilterData = {
            filter: null,
            pagination: null,
            select: mSelect,
            sort: { createdAt: -1 },
          };

          return this.purchaseService.getAllReturnPurchases(filter, this.searchQuery);
        })
      )
      .subscribe((res) => {
        if (res.success) {
          this.searchReturn = res.data || [];
          this.allReturns = this.searchReturn;
          this.returns = this.utilsService.arrayGroupByField(this.allReturns, 'returnDateString', 'grandTotal');
          this.calculation = (res as any).reports || null;
        }
      });
  }

  setDefaultFilter() {
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    this.filter = {
      month: month,
      year: year,
    };

    this.activeFilterMonth = this.months.findIndex(f => f.value === month);
    this.activeFilterYear = this.years.findIndex(f => f.value === year);
  }

  filterData(query: any, index: number, type: string) {
    if (type === 'month') {
      this.activeFilterMonth = index;
      this.filter = { ...this.filter, ...{ month: query.value } };
    } else if (type === 'year') {
      this.activeFilterYear = index;
      this.filter = { ...this.filter, ...{ year: query.value } };
    }
    this.isDefaultFilter = false;
    this.getAllReturns();
  }

  endChangeRegDateRange(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      const startDate = this.dataFormDateRange.value.start;
      const endDate = event.value;

      if (startDate && endDate) {
        const startDateString = this.utilsService.getDateString(startDate);
        const endDateString = this.utilsService.getDateString(endDate);

        const qData = { returnDateString: { $gte: startDateString, $lte: endDateString } };
        this.isDefaultFilter = false;
        this.filter = { ...this.filter, ...qData };
        this.getAllReturns();
      }
    }
  }

  onRemoveAllQuery() {
    this.activeSort = null;
    this.activeFilterMonth = null;
    this.activeFilterYear = null;
    this.sortQuery = { createdAt: -1 };
    this.filter = null;
    this.dataFormDateRange.reset();
    this.setDefaultFilter();
    this.getAllReturns();
  }

  onCheckChange(event: boolean, index: number, id: string) {
    if (event) {
      this.selectedIds.push(id);
    } else {
      const i = this.selectedIds.findIndex(f => f === id);
      this.selectedIds.splice(i, 1);
    }
  }

  onAllSelectChange(event: MatCheckbox, data: any[], groupIndex: number) {
    if (event.checked) {
      data.forEach(m => {
        m.select = true;
        const index = this.selectedIds.findIndex(f => f === m._id);
        if (index === -1) {
          this.selectedIds.push(m._id);
        }
      });
    } else {
      data.forEach(m => {
        m.select = false;
        const i = this.selectedIds.findIndex(f => f === m._id);
        this.selectedIds.splice(i, 1);
      });
    }
  }

  get checkDeletePermission(): boolean {
    return true;
  }

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

  private getAllReturns() {
    this.isLoading = true;
    const mSelect = {
      returnPurchaseNo: 1,
      originalPurchaseNo: 1,
      supplier: 1,
      products: 1,
      reason: 1,
      month: 1,
      returnDate: 1,
      returnDateString: 1,
      grandTotal: 1,
      subTotal: 1,
    };

    const filter: FilterData = {
      filter: this.filter,
      pagination: null,
      select: mSelect,
      sort: { createdAt: -1 },
    };

    this.subDataOne = this.purchaseService
      .getAllReturnPurchases(filter, null)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.success) {
            this.allReturns = res.data || [];
            this.holdAllReturns = this.allReturns;
            this.returns = this.utilsService.arrayGroupByField(this.allReturns, 'returnDateString', 'grandTotal');
            this.holdPrevData = this.returns;
            this.calculation = (res as any).reports || null;
            this.holdCalculation = this.calculation;
          } else {
            this.uiService.message('Failed to load returns', 'warn');
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Error loading returns:', err);
          this.uiService.message('Failed to load returns. Please try again.', 'warn');
        },
      });
  }

  deleteMultipleReturnById() {
    if (this.selectedIds.length < 1) {
      this.uiService.message('Please select at least one item', 'warn');
      return;
    }
    this.subDataTwo = this.purchaseService.deleteMultipleReturnPurchaseById(this.selectedIds)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.selectedIds = [];
            this.uiService.message(res.message, 'success');
            this.getAllReturns();
          } else {
            this.uiService.message(res.message, 'warn');
          }
        },
        error: (err) => {
          console.error('Error deleting returns:', err);
          this.uiService.message('Failed to delete returns', 'warn');
        }
      });
  }

  exportToAllExcel() {
    if (!this.allReturns.length) {
      this.uiService.message('No data to export', 'warn');
      return;
    }

    const date = new Date().toISOString().split('T')[0];
    const data = this.allReturns.map((m, index) => {
      return {
        'SL': index + 1,
        'Return No': m.returnPurchaseNo || '',
        'Original Purchase': m.originalPurchaseNo || '',
        'Supplier': m.supplier?.name || '',
        'Supplier Phone': m.supplier?.phone || '',
        'Date': m.returnDateString || '',
        'Total': m.grandTotal || 0,
      };
    });

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Purchase Returns');
    XLSX.writeFile(wb, `Purchase_Returns_${date}.xlsx`);
  }

  public openConfirmDialog(type: string, data?: any) {
    switch (type) {
      case 'delete': {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          maxWidth: '400px',
          data: {
            title: 'Confirm Delete',
            message: 'Are you sure you want delete this data?',
          },
        });
        dialogRef.afterClosed().subscribe((dialogResult) => {
          if (dialogResult) {
            this.deleteMultipleReturnById();
          }
        });
        break;
      }
      default: {
        break;
      }
    }
  }

  ngOnDestroy() {
    if (this.subDataOne) this.subDataOne.unsubscribe();
    if (this.subDataTwo) this.subDataTwo.unsubscribe();
    if (this.subForm) this.subForm.unsubscribe();
    if (this.subReload) this.subReload.unsubscribe();
    if (this.subShopInfo) this.subShopInfo.unsubscribe();
  }
}

