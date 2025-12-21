import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { EMPTY, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { UiService } from '../../../../services/core/ui.service';
import { ShopService } from '../../../../services/common/shop.service';
import { UtilsService } from '../../../../services/core/utils.service';
import { ReloadService } from '../../../../services/core/reload.service';
import { ConfirmDialogComponent } from '../../../../shared/components/ui/confirm-dialog/confirm-dialog.component';
import { FilterData } from '../../../../interfaces/gallery/filter-data';
import { Shop } from '../../../../interfaces/common/shop.interface';

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.scss']
})
export class BranchListComponent implements OnInit, OnDestroy {
  // Store Data
  isLoading: boolean = true;
  allBranches: Shop[] = [];
  branches: Shop[] = [];
  totalBranches = 0;
  branchesPerPage = 10;
  currentPage = 1;

  // FilterData
  filter: FilterData = {
    pagination: {
      pageSize: this.branchesPerPage,
      currentPage: this.currentPage
    },
    filter: null,
    select: null,
    sort: { createdAt: -1 }
  };

  // Selected Data
  selectedIds: string[] = [];
  @ViewChild('matCheckbox') matCheckbox: MatCheckbox;

  // Search Area
  @ViewChild('searchForm') searchForm: NgForm;
  searchCtrl = new FormControl('');

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subSearch: Subscription;
  private subReload: Subscription;

  constructor(
    private shopService: ShopService,
    private uiService: UiService,
    private utilsService: UtilsService,
    private router: Router,
    private dialog: MatDialog,
    private reloadService: ReloadService,
  ) {
  }

  ngOnInit(): void {
    this.loadAllBranches();

    // Reload trigger
    this.subReload = this.reloadService.refreshData$.subscribe(() => {
      this.loadAllBranches();
    });

    // Search Control
    this.subSearch = this.searchCtrl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        this.currentPage = 1;
        this.loadAllBranches(term);
        return EMPTY;
      })
    ).subscribe();
  }

  /**
   * HTTP REQ HANDLE
   */
  private loadAllBranches(searchQuery?: string) {
    this.isLoading = true;
    this.filter.pagination.currentPage = this.currentPage;
    this.filter.pagination.pageSize = this.branchesPerPage;

    this.subDataOne = this.shopService.getAllShop(this.filter, searchQuery)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.success) {
            this.allBranches = res.data;
            this.branches = res.data;
            this.totalBranches = res.count;
            this.selectedIds = [];
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error(err);
          this.uiService.message('Failed to load branches', 'warn');
        }
      });
  }

  /**
   * ON PAGE CHANGE
   */
  onPageChange(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.branchesPerPage = event.pageSize;
    this.loadAllBranches(this.searchCtrl.value);
  }

  /**
   * SELECTION
   */
  onCheckChange(event: MatCheckboxChange, branch: Shop) {
    if (event.checked) {
      this.selectedIds.push(branch._id);
    } else {
      const index = this.selectedIds.indexOf(branch._id);
      if (index > -1) {
        this.selectedIds.splice(index, 1);
      }
    }
  }

  onAllSelectChange(event: MatCheckboxChange) {
    if (event.checked) {
      this.selectedIds = this.branches.map(b => b._id);
    } else {
      this.selectedIds = [];
    }
  }

  /**
   * DELETE
   */
  deleteBranch(branch: Shop) {
    this.openConfirmDialog('Are you sure you want to delete this branch?', () => {
      this.subDataTwo = this.shopService.deleteShopById(branch._id)
        .subscribe({
          next: (res) => {
            if (res.success) {
              this.uiService.message('Branch deleted successfully', 'success');
              this.reloadService.needRefreshData$();
            } else {
              this.uiService.message('Failed to delete branch', 'warn');
            }
          },
          error: (err) => {
            console.error(err);
            this.uiService.message('Failed to delete branch', 'warn');
          }
        });
    });
  }

  deleteMultipleBranches() {
    if (this.selectedIds.length === 0) {
      this.uiService.message('Please select at least one branch', 'warn');
      return;
    }

    this.openConfirmDialog(`Are you sure you want to delete ${this.selectedIds.length} branches?`, () => {
      this.subDataThree = this.shopService.deleteMultipleShopById(this.selectedIds)
        .subscribe({
          next: (res) => {
            if (res.success) {
              this.uiService.message('Branches deleted successfully', 'success');
              this.selectedIds = [];
              this.reloadService.needRefreshData$();
            } else {
              this.uiService.message('Failed to delete branches', 'warn');
            }
          },
          error: (err) => {
            console.error(err);
            this.uiService.message('Failed to delete branches', 'warn');
          }
        });
    });
  }

  /**
   * NAVIGATION
   */
  navigateToAdd() {
    this.router.navigate(['/pos/branch-management/add']);
  }

  navigateToEdit(branch: Shop) {
    this.router.navigate(['/pos/branch-management/edit', branch._id]);
  }

  /**
   * CONFIRM DIALOG
   */
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
    if (this.subDataThree) {
      this.subDataThree.unsubscribe();
    }
    if (this.subSearch) {
      this.subSearch.unsubscribe();
    }
    if (this.subReload) {
      this.subReload.unsubscribe();
    }
  }
}

