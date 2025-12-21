import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UiService } from '../../../../services/core/ui.service';
import { BranchInventoryService } from '../../../../services/common/branch-inventory.service';
import { ShopService } from '../../../../services/common/shop.service';
import { ProductService } from '../../../../services/common/product.service';

@Component({
  selector: 'app-add-branch-inventory',
  templateUrl: './add-branch-inventory.component.html',
  styleUrls: ['./add-branch-inventory.component.scss']
})
export class AddBranchInventoryComponent implements OnInit, OnDestroy {
  // Form
  inventoryForm: FormGroup;
  
  // Data
  branches: any[] = [];
  products: any[] = [];
  selectedBranch: string = '';
  
  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;

  constructor(
    private fb: FormBuilder,
    private branchInventoryService: BranchInventoryService,
    private shopService: ShopService,
    private productService: ProductService,
    private uiService: UiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.inventoryForm = this.fb.group({
      branch: ['', [Validators.required]],
      product: ['', [Validators.required]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      reservedQuantity: [0, [Validators.min(0)]],
      minStockLevel: [0, [Validators.min(0)]],
      maxStockLevel: [0, [Validators.min(0)]],
      reorderPoint: [0, [Validators.min(0)]],
      location: ['']
    });
  }

  ngOnInit(): void {
    this.loadBranches();
    this.loadProducts();
    
    // Get branch from query params
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['branch']) {
        this.selectedBranch = params['branch'];
        this.inventoryForm.patchValue({ branch: params['branch'] });
      }
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

  private loadProducts(): void {
    this.subDataTwo = this.productService.getAllProducts({ pagination: { pageSize: 1000, currentPage: 1 } }).subscribe({
      next: (res) => {
        if (res.success) {
          this.products = res.data;
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.inventoryForm.invalid) {
      this.uiService.message('Please fill all required fields', 'warn');
      return;
    }

    const formData = this.inventoryForm.value;
    
    this.subDataThree = this.branchInventoryService.addBranchInventory(formData).subscribe({
      next: (res) => {
        if (res.success) {
          this.uiService.message('Branch inventory added successfully', 'success');
          this.router.navigate(['/pos/branch-inventory/list']);
        } else {
          this.uiService.message(res.message || 'Failed to add inventory', 'warn');
        }
      },
      error: (err) => {
        console.error(err);
        this.uiService.message('Failed to add inventory', 'wrong');
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
  }
}

