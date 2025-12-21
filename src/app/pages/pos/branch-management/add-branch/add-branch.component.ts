import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { UiService } from '../../../../services/core/ui.service';
import { ShopService } from '../../../../services/common/shop.service';
import { UtilsService } from '../../../../services/core/utils.service';
import { ReloadService } from '../../../../services/core/reload.service';
import { Shop } from '../../../../interfaces/common/shop.interface';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.scss']
})
export class AddBranchComponent implements OnInit, OnDestroy {
  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;
  disable = false;

  // Store Data
  isLoading: boolean = false;
  id?: string;
  branch?: Shop;

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subReload: Subscription;

  constructor(
    private fb: FormBuilder,
    private shopService: ShopService,
    private uiService: UiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private utilsService: UtilsService,
    private reloadService: ReloadService,
  ) {
  }

  ngOnInit(): void {
    // Get ID from route
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.initDataForm();
    
    if (this.id) {
      this.getBranchById();
    }
  }

  /**
   * INIT FORM
   */
  private initDataForm() {
    this.dataForm = this.fb.group({
      name: [null, [Validators.required]],
      websiteName: [null, [Validators.required]],
      isPasswordLess: [false, [Validators.required]],
      domain: [null],
      domainType: ['sub-domain'],
      phoneNo: [null],
      email: [null, [Validators.email]],
      address: [null],
      city: [null],
      country: [null],
      status: ['active'],
      description: [null],
    });
  }

  /**
   * HTTP REQ HANDLE
   */
  private getBranchById() {
    this.isLoading = true;
    this.subDataOne = this.shopService.getShopById(this.id)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.success) {
            this.branch = res.data;
            this.setFormValue();
          } else {
            this.uiService.message('Failed to load branch data', 'warn');
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error(err);
          this.uiService.message('Failed to load branch data', 'warn');
        }
      });
  }

  private setFormValue() {
    if (this.branch) {
      this.dataForm.patchValue({
        name: this.branch.name || this.branch.websiteName,
        websiteName: this.branch.websiteName,
        isPasswordLess: false,
        domain: this.branch.domain,
        domainType: this.branch.domainType || 'sub-domain',
        phoneNo: this.branch.phoneNo,
        email: this.branch.email,
        address: this.branch.address,
        city: this.branch.city,
        country: this.branch.country,
        status: this.branch.status || 'active',
        description: this.branch.description,
      });
    }
  }

  /**
   * SUBMIT FORM
   */
  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.message('Please fill all required fields', 'warn');
      return;
    }

    if (this.id) {
      this.updateBranch();
    } else {
      this.addBranch();
    }
  }

  private addBranch() {
    this.isLoading = true;
    const formData = this.dataForm.value;

    this.subDataTwo = this.shopService.addShop(formData)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.success) {
            this.uiService.message('Branch added successfully', 'success');
            this.reloadService.needRefreshData$();
            this.router.navigate(['/pos/branch-management/list']);
          } else {
            this.uiService.message(res.message || 'Failed to add branch', 'warn');
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error(err);
          this.uiService.message('Failed to add branch', 'warn');
        }
      });
  }

  private updateBranch() {
    this.isLoading = true;
    const formData = this.dataForm.value;

    this.subDataTwo = this.shopService.updateShopById(this.id, formData)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.success) {
            this.uiService.message('Branch updated successfully', 'success');
            this.reloadService.needRefreshData$();
            this.router.navigate(['/pos/branch-management/list']);
          } else {
            this.uiService.message(res.message || 'Failed to update branch', 'warn');
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error(err);
          this.uiService.message('Failed to update branch', 'warn');
        }
      });
  }

  /**
   * CANCEL
   */
  onCancel() {
    this.router.navigate(['/pos/branch-management/list']);
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

