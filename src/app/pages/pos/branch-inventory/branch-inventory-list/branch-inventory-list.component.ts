import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UiService } from '../../../../services/core/ui.service';
import { BranchInventoryService } from '../../../../services/common/branch-inventory.service';
import { ShopService } from '../../../../services/common/shop.service';
import { ReloadService } from '../../../../services/core/reload.service';

@Component({
  selector: 'app-branch-inventory-list',
  templateUrl: './branch-inventory-list.component.html',
  styleUrls: ['./branch-inventory-list.component.scss']
})
export class BranchInventoryListComponent implements OnInit, OnDestroy {
  // Store Data
  isLoading: boolean = true;
  allInventories: any[] = [];
  inventories: any[] = [];
  
  // Branch Data
  branches: any[] = [];
  selectedBranch: string = '';
  
  // Filter
  showLowStock: boolean = false;
  
  // Table
  displayedColumns: string[] = ['product', 'quantity', 'reservedQuantity', 'availableQuantity', 'reorderPoint', 'location', 'actions'];
  
  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subReload: Subscription;

  constructor(
    private branchInventoryService: BranchInventoryService,
    private shopService: ShopService,
    private uiService: UiService,
    private reloadService: ReloadService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBranches();
    
    // Reload trigger
    this.subReload = this.reloadService.refreshData$.subscribe(() => {
      this.loadBranchInventory();
    });
  }

  private loadBranches(): void {
    this.subDataOne = this.shopService.getAllShop({ pagination: { pageSize: 1000, currentPage: 1 } }).subscribe({
      next: (res) => {
        if (res.success) {
          this.branches = res.data;
          if (this.branches.length > 0 && !this.selectedBranch) {
            this.selectedBranch = this.branches[0]._id;
            this.loadBranchInventory();
          }
        }
      },
      error: (err) => {
        console.error(err);
        this.uiService.message('Failed to load branches', 'wrong');
      }
    });
  }

  onBranchChange(): void {
    if (this.selectedBranch) {
      this.loadBranchInventory();
    }
  }

  private loadBranchInventory(): void {
    if (!this.selectedBranch) {
      this.isLoading = false;
      return;
    }

    this.isLoading = true;
    const filter: any = {};
    if (this.showLowStock) {
      filter.lowStock = true;
    }

    this.subDataTwo = this.branchInventoryService.getBranchInventory(this.selectedBranch, filter).subscribe({
      next: (res) => {
        if (res.success) {
          this.allInventories = res.data || [];
          this.inventories = [...this.allInventories];
          this.isLoading = false;
        } else {
          this.uiService.message(res.message || 'Failed to load inventory', 'warn');
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.error(err);
        this.uiService.message('Failed to load inventory', 'wrong');
        this.isLoading = false;
      }
    });
  }

  toggleLowStock(): void {
    this.showLowStock = !this.showLowStock;
    this.loadBranchInventory();
  }

  addInventory(): void {
    this.router.navigate(['/pos/branch-inventory/add'], {
      queryParams: { branch: this.selectedBranch }
    });
  }

  editInventory(inventory: any): void {
    this.router.navigate(['/pos/branch-inventory/edit', inventory._id], {
      queryParams: { branch: this.selectedBranch }
    });
  }

  ngOnDestroy(): void {
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
    if (this.subDataTwo) {
      this.subDataTwo.unsubscribe();
    }
    if (this.subDataThree) {
      this.subDataThree.unsubscribe();
    }
    if (this.subReload) {
      this.subReload.unsubscribe();
    }
  }
}

