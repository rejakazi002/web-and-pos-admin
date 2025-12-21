import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from '../../../../services/core/ui.service';
import { CentralProductService } from '../../../../services/common/central-product.service';
import { ShopService } from '../../../../services/common/shop.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/components/ui/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-central-product-list',
  templateUrl: './central-product-list.component.html',
  styleUrls: ['./central-product-list.component.scss']
})
export class CentralProductListComponent implements OnInit, OnDestroy {
  // Store Data
  isLoading: boolean = true;
  products: any[] = [];
  allProducts: any[] = [];
  
  // Branch Data
  branches: any[] = [];
  
  // Filter
  searchQuery: string = '';
  selectedCategory: string = '';
  selectedStatus: string = '';
  
  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 20;
  totalItems: number = 0;
  
  // Table
  displayedColumns: string[] = ['product', 'category', 'status', 'price', 'quantity', 'actions'];
  
  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;

  constructor(
    private centralProductService: CentralProductService,
    private shopService: ShopService,
    private uiService: UiService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadBranches();
    this.loadProducts();
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
        this.uiService.message('Failed to load branches', 'warn');
      }
    });
  }

  private loadProducts(): void {
    this.isLoading = true;
    const filter: any = {
      page: this.currentPage,
      limit: this.itemsPerPage
    };
    
    if (this.searchQuery) {
      filter.search = this.searchQuery;
    }
    if (this.selectedCategory) {
      filter.category = this.selectedCategory;
    }
    if (this.selectedStatus) {
      filter.status = this.selectedStatus;
    }
    
    this.subDataTwo = this.centralProductService.getCentralProducts(filter).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.success) {
          this.products = res.data?.products || res.data || [];
          this.totalItems = res.data?.total || this.products.length;
        } else {
          this.products = [];
          this.uiService.message('Failed to load products', 'warn');
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
        this.uiService.message('Failed to load products', 'warn');
      }
    });
  }

  onSearch(): void {
    this.currentPage = 1;
    this.loadProducts();
  }

  onFilterChange(): void {
    this.currentPage = 1;
    this.loadProducts();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadProducts();
  }

  syncToBranches(product: any): void {
    if (!this.branches || this.branches.length === 0) {
      this.uiService.message('No branches available', 'warn');
      return;
    }

    // For now, sync to all branches
    // In a full implementation, you could create a custom dialog for branch selection
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Sync Product to Branches',
        message: `Are you sure you want to sync "${product.name}" to all branches?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const branchIds = this.branches.map(b => b._id);
        this.isLoading = true;
        this.subDataThree = this.centralProductService.syncProductToBranches(
          product._id,
          branchIds
        ).subscribe({
          next: (res) => {
            this.isLoading = false;
            if (res.success) {
              this.uiService.message('Product synced to branches successfully', 'success');
              this.loadProducts();
            } else {
              this.uiService.message('Failed to sync product', 'warn');
            }
          },
          error: (err) => {
            this.isLoading = false;
            console.error(err);
            this.uiService.message('Failed to sync product', 'warn');
          }
        });
      }
    });
  }

  markAsCentral(product: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Mark as Central Product',
        message: `Are you sure you want to mark "${product.name}" as a central product?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.confirmed) {
        this.isLoading = true;
        this.subDataThree = this.centralProductService.markAsCentralProduct(product._id).subscribe({
          next: (res) => {
            this.isLoading = false;
            if (res.success) {
              this.uiService.message('Product marked as central', 'success');
              this.loadProducts();
            } else {
              this.uiService.message('Failed to mark product', 'warn');
            }
          },
          error: (err) => {
            this.isLoading = false;
            console.error(err);
            this.uiService.message('Failed to mark product', 'warn');
          }
        });
      }
    });
  }

  unmarkAsCentral(product: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Unmark as Central Product',
        message: `Are you sure you want to unmark "${product.name}" as a central product?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.confirmed) {
        this.isLoading = true;
        this.subDataThree = this.centralProductService.unmarkAsCentralProduct(product._id).subscribe({
          next: (res) => {
            this.isLoading = false;
            if (res.success) {
              this.uiService.message('Product unmarked as central', 'success');
              this.loadProducts();
            } else {
              this.uiService.message('Failed to unmark product', 'warn');
            }
          },
          error: (err) => {
            this.isLoading = false;
            console.error(err);
            this.uiService.message('Failed to unmark product', 'warn');
          }
        });
      }
    });
  }
}

