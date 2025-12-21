import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UiService } from '../../../../services/core/ui.service';
import { BranchAccessService } from '../../../../services/common/branch-access.service';
import { ShopService } from '../../../../services/common/shop.service';
import { AdminDataService } from '../../../../services/common/admin-data.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/components/ui/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-branch-access-management',
  templateUrl: './branch-access-management.component.html',
  styleUrls: ['./branch-access-management.component.scss']
})
export class BranchAccessManagementComponent implements OnInit, OnDestroy {
  // Store Data
  isLoading: boolean = true;
  branchAccessList: any[] = [];
  
  // Branch Data
  branches: any[] = [];
  
  // Users (will be populated from admin/vendor service)
  users: any[] = [];
  
  // Form
  accessForm: FormGroup;
  showForm: boolean = false;
  
  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;

  constructor(
    private branchAccessService: BranchAccessService,
    private shopService: ShopService,
    private adminDataService: AdminDataService,
    private uiService: UiService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.loadBranches();
    this.loadUsers();
    this.loadBranchAccess();
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

  private initForm(): void {
    this.accessForm = this.fb.group({
      userId: ['', Validators.required],
      branches: [[], Validators.required],
      permissions: this.fb.group({
        canView: [true],
        canEdit: [false],
        canDelete: [false],
        canTransfer: [false],
        canApproveTransfer: [false]
      })
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
        this.uiService.message('Failed to load branches', 'warn');
      }
    });
  }

  private loadUsers(): void {
    this.adminDataService.getAllAdmins({ pagination: { pageSize: 1000, currentPage: 1 } }).subscribe({
      next: (res) => {
        if (res.success) {
          this.users = res.data || [];
        }
      },
      error: (err) => {
        console.error(err);
        this.uiService.message('Failed to load users', 'warn');
      }
    });
  }

  private loadBranchAccess(): void {
    this.isLoading = true;
    this.subDataTwo = this.branchAccessService.getAllBranchAccess().subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.success) {
          this.branchAccessList = res.data || [];
        } else {
          this.branchAccessList = [];
          this.uiService.message('Failed to load branch access', 'warn');
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
        this.uiService.message('Failed to load branch access', 'warn');
      }
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.accessForm.reset();
      this.initForm();
    }
  }

  onSubmit(): void {
    if (this.accessForm.invalid) {
      this.uiService.message('Please fill all required fields', 'warn');
      return;
    }

    const formValue = this.accessForm.value;
    this.isLoading = true;
    
    this.subDataThree = this.branchAccessService.assignBranchAccess({
      userId: formValue.userId,
      branches: formValue.branches,
      permissions: formValue.permissions
    }).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.success) {
          this.uiService.message('Branch access assigned successfully', 'success');
          this.accessForm.reset();
          this.initForm();
          this.showForm = false;
          this.loadBranchAccess();
        } else {
          this.uiService.message('Failed to assign branch access', 'warn');
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
        this.uiService.message('Failed to assign branch access', 'warn');
      }
    });
  }

  revokeAccess(access: any, branchId?: string): void {
    const message = branchId 
      ? `Are you sure you want to revoke access for this branch?`
      : `Are you sure you want to revoke all branch access for this user?`;
    
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Revoke Branch Access',
        message: message
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoading = true;
        this.subDataThree = this.branchAccessService.revokeBranchAccess(
          access.user?._id || access.user,
          branchId
        ).subscribe({
          next: (res) => {
            this.isLoading = false;
            if (res.success) {
              this.uiService.message('Branch access revoked successfully', 'success');
              this.loadBranchAccess();
            } else {
              this.uiService.message('Failed to revoke branch access', 'warn');
            }
          },
          error: (err) => {
            this.isLoading = false;
            console.error(err);
            this.uiService.message('Failed to revoke branch access', 'warn');
          }
        });
      }
    });
  }

  getBranchNames(branchIds: string[]): string {
    if (!branchIds || branchIds.length === 0) return 'N/A';
    const branchNames = branchIds.map(id => {
      const branch = this.branches.find(b => b._id === id);
      return branch ? branch.websiteName : id;
    });
    return branchNames.join(', ');
  }
}

