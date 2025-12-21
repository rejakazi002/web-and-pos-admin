import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { UiService } from '../../../../services/core/ui.service';
import { MembershipCardService } from '../../../../services/common/membership-card.service';
import { ReloadService } from '../../../../services/core/reload.service';
import { FilterData } from '../../../../interfaces/gallery/filter-data';
import { MembershipCard } from '../../../../interfaces/common/membership-card.interface';
import { ConfirmDialogComponent } from '../../../../shared/components/ui/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-membership-card-list',
  templateUrl: './membership-card-list.component.html',
  styleUrls: ['./membership-card-list.component.scss']
})
export class MembershipCardListComponent implements OnInit, OnDestroy {
  // Store Data
  isLoading: boolean = true;
  membershipCards: MembershipCard[] = [];
  totalCards = 0;
  cardsPerPage = 10;
  currentPage = 0;

  // Filter
  searchCtrl = new FormControl('');
  statusFilter: 'all' | 'active' | 'expired' | 'suspended' = 'all';
  cardTypeFilter: 'all' | 'Silver' | 'Gold' | 'Platinum' | 'VIP' = 'all';

  // Subscriptions
  private subDataOne: Subscription;
  private subReload: Subscription;
  private subSearch: Subscription;

  constructor(
    private membershipCardService: MembershipCardService,
    private uiService: UiService,
    private router: Router,
    private reloadService: ReloadService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.loadMembershipCards();

    // Reload trigger
    this.subReload = this.reloadService.refreshData$.subscribe(() => {
      this.loadMembershipCards();
    });

    // Search Control
    this.subSearch = this.searchCtrl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe(() => {
      this.currentPage = 0;
      this.loadMembershipCards();
    });
  }

  loadMembershipCards(): void {
    this.isLoading = true;

    const filter: any = {};
    if (this.statusFilter !== 'all') {
      filter.status = this.statusFilter;
    }
    if (this.cardTypeFilter !== 'all') {
      filter.cardType = this.cardTypeFilter;
    }

    const filterData: FilterData = {
      pagination: {
        pageSize: this.cardsPerPage,
        currentPage: this.currentPage
      },
      filter: Object.keys(filter).length > 0 ? filter : {},
      sort: { createdAt: -1 }
    };

    this.subDataOne = this.membershipCardService.getAllMembershipCards(
      filterData,
      this.searchCtrl.value || undefined
    ).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.success) {
          this.membershipCards = res.data || [];
          this.totalCards = res.count || 0;
        } else {
          this.uiService.message(res.message || 'Failed to load membership cards', 'warn');
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error loading membership cards:', err);
        this.uiService.message('Failed to load membership cards', 'warn');
      }
    });
  }

  onFilterChange(): void {
    this.currentPage = 0;
    this.loadMembershipCards();
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.cardsPerPage = event.pageSize;
    this.loadMembershipCards();
  }

  getCardTypeClass(cardType: string): string {
    switch (cardType) {
      case 'Silver':
        return 'silver-card';
      case 'Gold':
        return 'gold-card';
      case 'Platinum':
        return 'platinum-card';
      case 'VIP':
        return 'vip-card';
      default:
        return '';
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'active':
        return 'status-active';
      case 'expired':
        return 'status-expired';
      case 'suspended':
        return 'status-suspended';
      default:
        return '';
    }
  }

  isExpired(date: Date): boolean {
    if (!date) return false;
    return new Date(date) < new Date();
  }

  viewCustomer(customerId: string): void {
    this.router.navigate(['/pos/customer/customer-details/', customerId]);
  }

  updateCardStatus(card: MembershipCard, newStatus: 'active' | 'expired' | 'suspended'): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'Confirm Status Update',
        message: `Are you sure you want to change status to ${newStatus}?`,
      },
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.isLoading = true;
        this.subDataOne = this.membershipCardService.updateMembershipCard(card._id, {
          status: newStatus
        } as any).subscribe({
          next: (res) => {
            this.isLoading = false;
            if (res.success) {
              this.uiService.message('Card status updated successfully', 'success');
              this.loadMembershipCards();
            } else {
              this.uiService.message(res.message || 'Failed to update card status', 'warn');
            }
          },
          error: (err) => {
            this.isLoading = false;
            console.error('Error updating card status:', err);
            this.uiService.message('Failed to update card status', 'warn');
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
    if (this.subReload) {
      this.subReload.unsubscribe();
    }
    if (this.subSearch) {
      this.subSearch.unsubscribe();
    }
  }
}

