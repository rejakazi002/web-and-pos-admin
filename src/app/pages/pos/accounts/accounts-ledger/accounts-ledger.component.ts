import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountsLedgerService } from '../../../../services/common/accounts-ledger.service';
import { FilterData } from '../../../../interfaces/gallery/filter-data';
import { AccountsLedger } from '../../../../interfaces/common/accounts-ledger.interface';
import { UiService } from '../../../../services/core/ui.service';

@Component({
  selector: 'app-accounts-ledger',
  templateUrl: './accounts-ledger.component.html',
  styleUrls: ['./accounts-ledger.component.scss']
})
export class AccountsLedgerComponent implements OnInit, OnDestroy {
  isLoading: boolean = true;
  ledgerEntries: AccountsLedger[] = [];
  openingBalance: number = 0;
  closingBalance: number = 0;
  
  startDate: Date;
  endDate: Date;
  
  private subDataOne: Subscription;

  constructor(
    private accountsLedgerService: AccountsLedgerService,
    private uiService: UiService,
  ) {}

  ngOnInit(): void {
    const today = new Date();
    this.endDate = today;
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    this.startDate = firstDay;
    this.loadLedgerEntries();
  }

  loadLedgerEntries() {
    this.isLoading = true;
    let mFilter: any = null;
    
    if (this.startDate && this.endDate) {
      mFilter = {
        startDate: this.startDate.toISOString(),
        endDate: this.endDate.toISOString(),
      };
    }

    const filter: FilterData = {
      filter: mFilter,
      pagination: null,
      sort: { date: -1 },
      select: null,
    };

    this.subDataOne = this.accountsLedgerService.getAllLedgerEntries(filter)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.success) {
            this.ledgerEntries = res.data?.data || [];
            this.openingBalance = res.data?.openingBalance || 0;
            this.closingBalance = res.data?.closingBalance || 0;
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Error loading ledger:', err);
        }
      });
  }

  onDateRangeChange() {
    this.loadLedgerEntries();
  }

  ngOnDestroy(): void {
    if (this.subDataOne) this.subDataOne.unsubscribe();
  }
}


