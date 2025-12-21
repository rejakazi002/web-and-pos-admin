import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UiService } from '../../../../services/core/ui.service';
import { TransferRequestService } from '../../../../services/common/transfer-request.service';
import { ShopService } from '../../../../services/common/shop.service';
import { ReloadService } from '../../../../services/core/reload.service';

@Component({
  selector: 'app-transfer-request-list',
  templateUrl: './transfer-request-list.component.html',
  styleUrls: ['./transfer-request-list.component.scss']
})
export class TransferRequestListComponent implements OnInit, OnDestroy {
  // Store Data
  isLoading: boolean = true;
  allTransfers: any[] = [];
  transfers: any[] = [];
  
  // Filter
  branches: any[] = [];
  statusFilter: string = '';
  fromBranchFilter: string = '';
  toBranchFilter: string = '';
  
  // Status Options
  statusOptions = [
    { value: '', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'in_transit', label: 'In Transit' },
    { value: 'completed', label: 'Completed' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'cancelled', label: 'Cancelled' }
  ];
  
  // Table
  displayedColumns: string[] = ['transferNo', 'fromBranch', 'toBranch', 'products', 'status', 'requestDate', 'actions'];
  
  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subReload: Subscription;

  constructor(
    private transferRequestService: TransferRequestService,
    private shopService: ShopService,
    private uiService: UiService,
    private reloadService: ReloadService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBranches();
    this.loadTransfers();
    
    this.subReload = this.reloadService.refreshData$.subscribe(() => {
      this.loadTransfers();
    });
  }

  private loadBranches(): void {
    this.subDataOne = this.shopService.getAllShop({ pagination: { pageSize: 1000, currentPage: 1 } }).subscribe({
      next: (res) => {
        if (res.success) {
          this.branches = res.data;
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  private loadTransfers(): void {
    this.isLoading = true;
    const filter: any = {};
    
    if (this.statusFilter) {
      filter.status = this.statusFilter;
    }
    if (this.fromBranchFilter) {
      filter.fromBranch = this.fromBranchFilter;
    }
    if (this.toBranchFilter) {
      filter.toBranch = this.toBranchFilter;
    }

    this.subDataTwo = this.transferRequestService.getTransferRequests(filter).subscribe({
      next: (res) => {
        if (res.success) {
          this.allTransfers = res.data || [];
          this.transfers = [...this.allTransfers];
          this.isLoading = false;
        } else {
          this.uiService.message(res.message || 'Failed to load transfers', 'warn');
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.error(err);
        this.uiService.message('Failed to load transfers', 'wrong');
        this.isLoading = false;
      }
    });
  }

  onFilterChange(): void {
    this.loadTransfers();
  }

  createTransfer(): void {
    this.router.navigate(['/pos/transfer-request/create']);
  }

  viewDetails(transfer: any): void {
    this.router.navigate(['/pos/transfer-request/details', transfer._id]);
  }

  approveTransfer(transfer: any): void {
    this.transferRequestService.approveTransferRequest(transfer._id).subscribe({
      next: (res) => {
        if (res.success) {
          this.uiService.message('Transfer approved successfully', 'success');
          this.loadTransfers();
        } else {
          this.uiService.message(res.message || 'Failed to approve transfer', 'warn');
        }
      },
      error: (err) => {
        console.error(err);
        this.uiService.message('Failed to approve transfer', 'wrong');
      }
    });
  }

  rejectTransfer(transfer: any): void {
    this.transferRequestService.rejectTransferRequest(transfer._id).subscribe({
      next: (res) => {
        if (res.success) {
          this.uiService.message('Transfer rejected successfully', 'success');
          this.loadTransfers();
        } else {
          this.uiService.message(res.message || 'Failed to reject transfer', 'warn');
        }
      },
      error: (err) => {
        console.error(err);
        this.uiService.message('Failed to reject transfer', 'wrong');
      }
    });
  }

  getStatusColor(status: string): string {
    const colors: any = {
      pending: 'warn',
      approved: 'primary',
      in_transit: 'accent',
      completed: 'primary',
      rejected: 'warn',
      cancelled: ''
    };
    return colors[status] || '';
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
  }
}

