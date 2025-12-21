import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as XLSX from 'xlsx';

import { UiService } from '../../../../services/core/ui.service';
import { CashTransactionService } from '../../../../services/common/cash-transaction.service';
import { UtilsService } from '../../../../services/core/utils.service';
import { ReloadService } from '../../../../services/core/reload.service';
import { ConfirmDialogComponent } from '../../../../shared/components/ui/confirm-dialog/confirm-dialog.component';
import { FilterData } from '../../../../interfaces/gallery/filter-data';
import { CashTransaction } from '../../../../interfaces/common/cash-transaction.interface';

@Component({
  selector: 'app-cash-transaction-list',
  templateUrl: './cash-transaction-list.component.html',
  styleUrls: ['./cash-transaction-list.component.scss']
})
export class CashTransactionListComponent implements OnInit, OnDestroy {
  isLoading: boolean = true;
  allTransactions: CashTransaction[] = [];
  transactions: CashTransaction[] = [];
  
  filter: any = null;
  sortQuery: any = null;
  activeFilter: string = 'all'; // 'all', 'cash_in', 'cash_out'
  
  @ViewChild('searchForm') searchForm: NgForm;
  searchQuery = null;
  searchTransactions: CashTransaction[] = [];
  
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subReload: Subscription;

  constructor(
    private cashTransactionService: CashTransactionService,
    private uiService: UiService,
    private router: Router,
    private dialog: MatDialog,
    private reloadService: ReloadService,
  ) {}

  ngOnInit(): void {
    this.initFilter();
    this.getAllTransactions();
    this.subReload = this.reloadService.refreshData$.subscribe(() => {
      this.getAllTransactions();
    });
  }

  private initFilter() {
    this.filter = null;
    this.sortQuery = { transactionDate: -1 };
    this.activeFilter = 'all';
  }

  private getAllTransactions() {
    this.isLoading = true;
    let mFilter: any = null;
    
    if (this.activeFilter !== 'all') {
      mFilter = { type: this.activeFilter };
    }

    const filter: FilterData = {
      filter: mFilter,
      pagination: null,
      select: null,
      sort: this.sortQuery,
    };

    this.subDataOne = this.cashTransactionService.getAllCashTransactions(filter, this.searchQuery)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.success) {
            this.allTransactions = res.data?.data || [];
            this.transactions = this.allTransactions;
            this.searchTransactions = this.allTransactions;
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Error loading transactions:', err);
        }
      });
  }

  onFilterChange(filter: string) {
    this.activeFilter = filter;
    this.getAllTransactions();
  }

  onSearchChange(event: any) {
    const searchTerm = event.target.value;
    if (searchTerm) {
      this.searchTransactions = this.transactions.filter(t =>
        t.transactionNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.searchTransactions = this.transactions;
    }
  }

  deleteTransactionById(id: string) {
    this.subDataTwo = this.cashTransactionService.deleteCashTransactionById(id)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.uiService.message('Transaction deleted successfully', 'success');
            this.getAllTransactions();
          }
        },
        error: (err) => {
          console.error('Error deleting transaction:', err);
        }
      });
  }

  openConfirmDialog(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this transaction?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteTransactionById(id);
      }
    });
  }

  exportToExcel() {
    const data = this.searchTransactions.map(t => ({
      'Transaction No': t.transactionNo,
      'Date': t.transactionDateString,
      'Type': t.type,
      'Amount': t.amount,
      'Description': t.description || '',
      'Payment Method': t.paymentMethod || '',
      'Bank Account': t.bankAccount?.accountName || '',
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Cash Transactions');
    XLSX.writeFile(wb, `Cash_Transactions_${new Date().getTime()}.xlsx`);
    this.uiService.message('Exported to Excel', 'success');
  }

  ngOnDestroy(): void {
    if (this.subDataOne) this.subDataOne.unsubscribe();
    if (this.subDataTwo) this.subDataTwo.unsubscribe();
    if (this.subReload) this.subReload.unsubscribe();
  }
}


