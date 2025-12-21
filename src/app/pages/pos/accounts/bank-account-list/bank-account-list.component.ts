import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, pluck, switchMap } from 'rxjs/operators';
import * as XLSX from 'xlsx';

import { UiService } from '../../../../services/core/ui.service';
import { BankAccountService } from '../../../../services/common/bank-account.service';
import { UtilsService } from '../../../../services/core/utils.service';
import { ReloadService } from '../../../../services/core/reload.service';
import { VendorService } from '../../../../services/vendor/vendor.service';
import { ConfirmDialogComponent } from '../../../../shared/components/ui/confirm-dialog/confirm-dialog.component';
import { FilterData } from '../../../../interfaces/gallery/filter-data';
import { BankAccount } from '../../../../interfaces/common/bank-account.interface';

@Component({
  selector: 'app-bank-account-list',
  templateUrl: './bank-account-list.component.html',
  styleUrls: ['./bank-account-list.component.scss']
})
export class BankAccountListComponent implements OnInit, OnDestroy {
  // Store Data
  isLoading: boolean = true;
  allBankAccounts: BankAccount[] = [];
  bankAccounts: BankAccount[] = [];

  // FilterData
  isDefaultFilter: boolean = false;
  filter: any = null;
  sortQuery: any = null;
  activeFilter: string = 'all'; // 'all', 'active', 'inactive'
  activeSort: number;

  // Search Area
  @ViewChild('searchForm') searchForm: NgForm;
  searchQuery = null;
  searchBankAccounts: BankAccount[] = [];

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subForm: Subscription;
  private subReload: Subscription;

  constructor(
    private bankAccountService: BankAccountService,
    private uiService: UiService,
    private utilsService: UtilsService,
    private router: Router,
    private dialog: MatDialog,
    private reloadService: ReloadService,
    private vendorService: VendorService,
  ) {
  }

  ngOnInit(): void {
    this.initFilter();
    this.getAllBankAccounts();
    this.subReload = this.reloadService.refreshData$.subscribe(() => {
      this.getAllBankAccounts();
    });
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
  private getAllBankAccounts() {
    this.isLoading = true;

    const mSelect = {
      accountName: 1,
      accountNumber: 1,
      bankName: 1,
      branchName: 1,
      accountType: 1,
      initialBalance: 1,
      currentBalance: 1,
      status: 1,
      createdAt: 1,
    };

    let mFilter: any = null;

    // Apply filter
    if (this.activeFilter === 'active') {
      mFilter = { status: 'active' };
    } else if (this.activeFilter === 'inactive') {
      mFilter = { status: { $in: ['inactive', 'closed'] } };
    }

    const filter: FilterData = {
      filter: mFilter,
      pagination: null,
      select: mSelect,
      sort: this.sortQuery || { createdAt: -1 },
    };

    this.subDataOne = this.bankAccountService.getAllBankAccounts(filter, this.searchQuery)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.success) {
            this.allBankAccounts = res.data?.data || [];
            this.bankAccounts = this.allBankAccounts;
            this.searchBankAccounts = this.allBankAccounts;
          } else {
            this.uiService.message('Failed to load bank accounts', 'warn');
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Error loading bank accounts:', err);
          this.uiService.message('Failed to load bank accounts', 'warn');
        }
      });
  }

  /**
   * ON FILTER CHANGE
   */
  onFilterChange(filter: string) {
    this.activeFilter = filter;
    this.getAllBankAccounts();
  }

  /**
   * SEARCH AREA
   */
  onSearchChange(event: any) {
    const searchTerm = event.target.value;
    if (searchTerm) {
      this.searchBankAccounts = this.bankAccounts.filter(account =>
        account.accountName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.accountNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.bankName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.searchBankAccounts = this.bankAccounts;
    }
  }

  /**
   * DELETE BANK ACCOUNT
   */
  deleteBankAccountById(id: string) {
    this.subDataTwo = this.bankAccountService.deleteBankAccountById(id)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.uiService.message('Bank account deleted successfully', 'success');
            this.getAllBankAccounts();
          } else {
            this.uiService.message(res.message || 'Failed to delete bank account', 'warn');
          }
        },
        error: (err) => {
          console.error('Error deleting bank account:', err);
          this.uiService.message('Failed to delete bank account', 'warn');
        }
      });
  }

  /**
   * OPEN CONFIRM DIALOG
   */
  openConfirmDialog(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this bank account?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteBankAccountById(id);
      }
    });
  }

  /**
   * EXPORT TO EXCEL
   */
  exportToExcel() {
    const data = this.searchBankAccounts.map(account => ({
      'Account Name': account.accountName,
      'Account Number': account.accountNumber,
      'Bank Name': account.bankName,
      'Branch Name': account.branchName || '',
      'Account Type': account.accountType || '',
      'Initial Balance': account.initialBalance || 0,
      'Current Balance': account.currentBalance || 0,
      'Status': account.status || '',
      'Created At': account.createdAtString || '',
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Bank Accounts');
    XLSX.writeFile(wb, `Bank_Accounts_${new Date().getTime()}.xlsx`);
    this.uiService.message('Exported to Excel', 'success');
  }

  ngOnDestroy(): void {
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
    if (this.subDataTwo) {
      this.subDataTwo.unsubscribe();
    }
    if (this.subForm) {
      this.subForm.unsubscribe();
    }
    if (this.subReload) {
      this.subReload.unsubscribe();
    }
  }
}


