import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { UiService } from '../../../../services/core/ui.service';
import { ProductDamageService } from '../../../../services/common/product-damage.service';
import { ProductService } from '../../../../services/common/product.service';
import { UtilsService } from '../../../../services/core/utils.service';
import { ReloadService } from '../../../../services/core/reload.service';
import { VendorService } from '../../../../services/vendor/vendor.service';
import { FilterData } from '../../../../interfaces/gallery/filter-data';
import { Product } from '../../../../interfaces/common/product.interface';

@Component({
  selector: 'app-add-product-damage',
  templateUrl: './add-product-damage.component.html',
  styleUrls: ['./add-product-damage.component.scss']
})
export class AddProductDamageComponent implements OnInit, OnDestroy {
  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;
  disable = false;

  // Store Data
  isLoading: boolean = false;
  id?: string;
  damage?: any;

  // Products
  products: Product[] = [];
  searchProducts: Product[] = [];
  productSearchQuery: string = '';
  selectedProduct: Product = null;

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subReload: Subscription;

  constructor(
    private fb: FormBuilder,
    private productDamageService: ProductDamageService,
    private productService: ProductService,
    private uiService: UiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private reloadService: ReloadService,
    private vendorService: VendorService,
    public utilsService: UtilsService,
  ) { }

  ngOnInit(): void {
    // Get ID from route
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.initDataForm();
    this.getAllProducts();

    if (this.id) {
      this.getDamageById();
    }
  }

  /**
   * INIT FORM
   */
  private initDataForm() {
    this.dataForm = this.fb.group({
      product: [null, [Validators.required]],
      quantity: [null, [Validators.required, Validators.min(0.01)]],
      note: [null],
      date: [new Date(), [Validators.required]],
    });
  }

  /**
   * HTTP REQ HANDLE
   */
  private getAllProducts() {
    const mSelect = {
      _id: 1,
      name: 1,
      sku: 1,
      salePrice: 1,
      purchasePrice: 1,
      quantity: 1,
      status: 1,
      images: 1,
      category: 1,
      brand: 1,
      sizes: 1,
      colors: 1,
      model: 1,
      others: 1,
      isVariation: 1,
      regularPrice: 1,
      variation: 1,
      variation2: 1,
      discountType: 1,
      variationOptions: 1,
      variation2Options: 1,
      variationList: 1,
      discountAmount: 1,
      minimumWholesaleQuantity: 1,
      wholesalePrice: 1,
    };

    // Filter for active products only
    const filter: FilterData = {
      filter: {
        status: {$ne: 'trash'}
      },
      pagination: null,
      select: mSelect,
      sort: {createdAt: -1},
    };

    this.subDataOne = this.productService.getAllProducts(filter, null).subscribe({
      next: (res) => {
        if (res.success) {
          this.products = res.data || [];
          console.log('Products loaded:', this.products.length);
          if (this.products.length === 0) {
            this.uiService.message('No products found. Please add products first.', 'warn');
          }
        } else {
          console.error('Failed to load products:', res);
          this.uiService.message('Failed to load products', 'warn');
        }
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.uiService.message('Failed to load products', 'warn');
      }
    });
  }

  onProductSearch(query: string) {
    this.productSearchQuery = query;
    if (!query || query.trim().length < 1) {
      this.searchProducts = [];
      return;
    }
    const searchTerm = query.toLowerCase().trim();
    console.log('Searching for:', searchTerm, 'in', this.products.length, 'products');
    this.searchProducts = this.products.filter(p => {
      // Use getProductName utility to get full product name (includes colors, sizes, model, etc.)
      const productName = this.utilsService.getProductName(p)?.toLowerCase() || '';
      const name = p.name?.toLowerCase() || '';
      const sku = p.sku?.toLowerCase() || '';
      const parentSku = p.parentSku?.toLowerCase() || '';
      const barcode = p.barcode?.toLowerCase() || '';
      const productKeyword = Array.isArray(p.productKeyword)
        ? p.productKeyword.map(k => k?.toLowerCase() || '').join(' ')
        : '';
      const matches = productName.includes(searchTerm) ||
             name.includes(searchTerm) ||
             sku.includes(searchTerm) ||
             parentSku.includes(searchTerm) ||
             barcode.includes(searchTerm) ||
             productKeyword.includes(searchTerm);
      return matches;
    }).slice(0, 10);
    console.log('Search results:', this.searchProducts.length);
  }

  onSelectProduct(product: Product) {
    this.selectedProduct = product;
    this.dataForm.patchValue({ product: product._id });
    this.productSearchQuery = this.utilsService.getProductName(product) || product.name || '';
    this.searchProducts = [];
    console.log('Selected product:', product.name, 'Purchase Price:', product.costPrice || product.purchasePrice || 0);
  }

  private getDamageById() {
    this.isLoading = true;
    this.subDataThree = this.productDamageService.getProductDamageById(this.id)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.success) {
            this.damage = res.data;
            this.setFormValue();
          } else {
            this.uiService.message('Failed to load damage data', 'warn');
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error(err);
          this.uiService.message('Failed to load damage data', 'warn');
        }
      });
  }

  private setFormValue() {
    if (this.damage) {
      this.dataForm.patchValue({
        product: this.damage.product?._id,
        quantity: this.damage.quantity,
        note: this.damage.note,
        date: this.damage.date ? new Date(this.damage.date) : new Date(),
      });

      if (this.damage.product) {
        this.selectedProduct = this.damage.product as any;
        this.productSearchQuery = this.damage.product.name;
      }
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

    const formData = {
      ...this.dataForm.value,
      product: {
        _id: this.selectedProduct._id,
        name: this.selectedProduct.name,
        sku: this.selectedProduct.sku,
        purchasePrice: this.selectedProduct.costPrice || this.selectedProduct.purchasePrice || 0,
        salePrice: this.selectedProduct.salePrice || 0,
      }
    };

    if (this.id) {
      this.updateDamage(formData);
    } else {
      this.addDamage(formData);
    }
  }

  private addDamage(formData: any) {
    this.isLoading = true;
    this.subDataTwo = this.productDamageService.addProductDamage(formData)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.success) {
            this.uiService.message('Damage record added successfully', 'success');
            this.formElement.resetForm();
            this.initDataForm();
            this.reloadService.needRefreshData$();
            this.router.navigate(['/pos/product-damage/list']);
          } else {
            this.uiService.message('Failed to add damage record', 'warn');
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error(err);
          this.uiService.message(err.error?.message || 'Failed to add damage record', 'warn');
        }
      });
  }

  private updateDamage(formData: any) {
    this.isLoading = true;
    this.subDataTwo = this.productDamageService.updateProductDamageById(this.id, formData)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.success) {
            this.uiService.message('Damage record updated successfully', 'success');
            this.reloadService.needRefreshData$();
            this.router.navigate(['/pos/product-damage/list']);
          } else {
            this.uiService.message('Failed to update damage record', 'warn');
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error(err);
          this.uiService.message(err.error?.message || 'Failed to update damage record', 'warn');
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
    if (this.subReload) {
      this.subReload.unsubscribe();
    }
  }
}

