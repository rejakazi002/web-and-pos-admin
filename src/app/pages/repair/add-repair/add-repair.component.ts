import {Component, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {UiService} from '../../../services/core/ui.service';
import {RepairService} from '../../../services/common/repair.service';
import {BrandService} from '../../../services/common/brand.service';
import {ModelService} from '../../../services/common/model.service';
import {ProblemService} from '../../../services/common/problem.service';
import {ProductService} from '../../../services/common/product.service';
import {CustomerService} from '../../../services/common/customer.service';
import {Customer} from '../../../interfaces/common/customer.interface';
import {UtilsService} from '../../../services/core/utils.service';
import {Product, VariationList} from '../../../interfaces/common/product.interface';
import {ReloadService} from '../../../services/core/reload.service';
import {ShopInformationService} from '../../../services/common/shop-information.service';
import {PageDataService} from '../../../services/core/page-data.service';
import {Title} from '@angular/platform-browser';
import {adminBaseMixin} from '../../../mixin/admin-base.mixin';
import {FilterData} from '../../../interfaces/gallery/filter-data';
import {MatDialog} from '@angular/material/dialog';
import {PatternLockComponent} from '../../../shared/components/pattern-lock/pattern-lock.component';
import {SaleService} from '../../../services/common/sale.service';
import {Sale} from '../../../interfaces/common/sale.interface';

@Component({
  selector: 'app-add-repair',
  templateUrl: './add-repair.component.html',
  styleUrls: ['./add-repair.component.scss']
})
export class AddRepairComponent extends adminBaseMixin(Component) implements OnInit, OnDestroy {

  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;

  id?: string;
  repair?: any;
  repairData?: any;
  shopInformation: any;
  saleId?: string; // Store sale ID for updates


  // Dropdown data
  brands: any[] = [];
  models: any[] = [];
  problems: any[] = [];
  colors: any[] = []; // For future use if ColorService is added

  // Filtered data for dropdowns
  filterBrandData: any[] = [];
  filterModelData: any[] = [];
  filterProblemData: any[] = [];
  filterColorData: any[] = [];

  // Search controls
  brandSearchControl = new FormControl('');
  modelSearchControl = new FormControl('');

  @ViewChild('brandSearchInput', { static: false }) brandSearchInput: any;
  @ViewChild('modelSearchInput', { static: false }) modelSearchInput: any;

  // Parts functionality
  parts: any[] = [];
  allProducts: Product[] = [];
  productSearchQuery: string = '';
  searchProducts: Product[] = [];
  searchResultsWithVariations: any[] = [];

  today: Date = new Date();
  isLoading: boolean = false;

  private subscriptions: Subscription[] = [];

  private readonly fb = inject(FormBuilder);
  private readonly uiService = inject(UiService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly repairService = inject(RepairService);
  private readonly brandService = inject(BrandService);
  private readonly modelService = inject(ModelService);
  private readonly problemService = inject(ProblemService);
  private readonly productService = inject(ProductService);
  private readonly customerService = inject(CustomerService);
  private readonly utilsService = inject(UtilsService);
  private readonly reloadService = inject(ReloadService);
  private readonly shopInformationService = inject(ShopInformationService);
  private readonly router = inject(Router);
  private readonly pageDataService = inject(PageDataService);
  private readonly title = inject(Title);
  private readonly dialog = inject(MatDialog);
  private readonly saleService = inject(SaleService);

  ngOnInit(): void {
    this.initDataForm();
    this.setPageData();

    const subRoute = this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');
      if (this.id) {
        this.getRepairById();
      }
    });
    this.subscriptions.push(subRoute);

    // Reload subscriptions
    const subReload = this.reloadService.refreshData$.subscribe(() => {
      this.getAllBrand();
      this.getAllModel();
      this.getAllProblem();
    });
    this.subscriptions.push(subReload);

    this.getAllBrand();
    this.getAllModel();
    this.getAllProblem();
    this.getAllProducts();
    this.getShopInformation();
    this.setupSearch();
    this.setupBrandChangeListener();
  }

  private setupSearch() {
    // Brand search
    const subBrandSearch = this.brandSearchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((searchTerm: string) => {
        this.getAllBrand(searchTerm || '');
      });
    this.subscriptions.push(subBrandSearch);

    // Model search
    const subModelSearch = this.modelSearchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((searchTerm: string) => {
        const selectedBrandId = this.dataForm?.value?.brand;
        this.getAllModel(selectedBrandId, searchTerm || '');
      });
    this.subscriptions.push(subModelSearch);
  }

  /**
   * Handle brand select opened - focus search input
   */
  onBrandSelectOpened() {
    setTimeout(() => {
      if (this.brandSearchInput?.nativeElement) {
        this.brandSearchInput.nativeElement.focus();
      }
    }, 100);
  }

  /**
   * Handle model select opened - focus search input
   */
  onModelSelectOpened() {
    setTimeout(() => {
      if (this.modelSearchInput?.nativeElement) {
        this.modelSearchInput.nativeElement.focus();
      }
    }, 100);
  }

  private setupBrandChangeListener() {
    const subBrandChange = this.dataForm?.get('brand')?.valueChanges
      .subscribe((brandId: string) => {
        // Reset model selection when brand changes
        this.dataForm?.patchValue({ modelNo: null });
        // Filter models by selected brand
        this.getAllModel(brandId, this.modelSearchControl.value || '');
      });
    if (subBrandChange) {
      this.subscriptions.push(subBrandChange);
    }
  }

  private setPageData(): void {
    const pageTitle = this.id ? 'Edit Repair' : 'Add Repair';
    this.title.setTitle(pageTitle);
    this.pageDataService.setPageData({
      title: pageTitle,
      navArray: [
        {name: 'Dashboard', url: `/dashboard`},
        {name: 'Repair', url: `/repair`},
        {name: 'Repair List', url: `/repair/repair-list`},
        {name: pageTitle, url: ''},
      ]
    });
  }

  private initDataForm() {
    this.dataForm = this.fb.group({
      date: [new Date(), Validators.required],
      deliveredDate: [null],
      repairFor: [null],
      nricNo: [null],
      customerName: [null],
      phoneNo: [null, Validators.required],
      status: ['Pending'],
      brand: [null, Validators.required],
      modelNo: [null, Validators.required],
      color: [null], // Optional - ColorService not available
      imeiNo: [null],
      problem: [null, Validators.required],
      purchase: [null],
      condition: [null, Validators.required],
      password: [null],
      pattern: [null],
      amount: [null],
      description: [null],
      images: [null],
    });

    // Setup phone number listener to auto-add customer
    this.setupPhoneNumberListener();
  }

  private setupPhoneNumberListener() {
    const subPhoneNo = this.dataForm?.get('phoneNo')?.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe((phoneNo: string) => {
        if (phoneNo && phoneNo.length >= 10) {
          this.addCustomerIfNotExists(phoneNo);
        }
      });
    if (subPhoneNo) {
      this.subscriptions.push(subPhoneNo);
    }
  }

  private addCustomerIfNotExists(phoneNo: string) {
    const customerName = this.dataForm?.get('customerName')?.value || `Customer ${phoneNo}`;
    
    const customerData: Customer = {
      name: customerName,
      phone: phoneNo,
      customerGroup: 'General',
      walletBalance: 0,
      smsEnabled: true,
      emailEnabled: true,
    };

    const subscription = this.customerService.addCustomer(customerData)
      .subscribe({
        next: (res: any) => {
          if (res.success) {
            // Customer added successfully
            console.log('Customer added to list:', res);
          } else {
            // Customer might already exist, which is fine
            if (res.message && res.message.includes('already exists')) {
              console.log('Customer already exists:', res.message);
            }
          }
        },
        error: (error) => {
          // Silently handle errors (customer might already exist)
          console.log('Customer add error (might already exist):', error);
        }
      });
    this.subscriptions.push(subscription);
  }

  private setFormValue() {
    const patchData: any = {};
    
    if (this.repair?.date) {
      patchData.date = new Date(this.repair.date);
    }
    if (this.repair?.deliveredDate) {
      patchData.deliveredDate = new Date(this.repair.deliveredDate);
    }
    if (this.repair?.pattern) {
      patchData.pattern = this.repair.pattern;
    }
    
    if (Object.keys(patchData).length > 0) {
      this.dataForm.patchValue(patchData);
    }
    this.dataForm.patchValue(this.repair);

    if (this.repair?.brand) {
      const brandId = this.repair.brand._id || this.repair.brand;
      this.dataForm.patchValue({
        brand: brandId
      });
      // Load models for the selected brand
      this.getAllModel(brandId);
    }

    if (this.repair?.modelNo) {
      this.dataForm.patchValue({
        modelNo: this.repair.modelNo._id || this.repair.modelNo
      });
    }

    if (this.repair?.problem) {
      this.dataForm.patchValue({
        problem: this.repair.problem._id || this.repair.problem
      });
    }

    if (this.repair?.color) {
      this.dataForm.patchValue({
        color: this.repair.color._id || this.repair.color
      });
    }
  }

  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.message('Please fill all the required fields', 'warn');
      return;
    }

    let mData = {
      ...this.dataForm.value,
      ...{
        dateString: this.utilsService.getDateString(this.dataForm.value.date),
        month: this.utilsService.getDateMonth(false, this.dataForm.value.date),
        year: this.utilsService.getDateYear(new Date(this.dataForm.value.date)),
      }
    };

    // Set brand object
    if (this.dataForm.value.brand) {
      const selectedBrand = this.brands.find((f) => f._id === this.dataForm.value.brand);
      if (selectedBrand) {
        mData = {
          ...mData,
          brand: {
            _id: selectedBrand._id,
            name: selectedBrand.name,
          }
        };
      }
    }

    // Set model object
    if (this.dataForm.value.modelNo) {
      const selectedModel = this.models.find((f) => f._id === this.dataForm.value.modelNo);
      if (selectedModel) {
        mData = {
          ...mData,
          modelNo: {
            _id: selectedModel._id,
            name: selectedModel.name,
          }
        };
      }
    }

    // Set problem object
    if (this.dataForm.value.problem) {
      const selectedProblem = this.problems.find((f) => f._id === this.dataForm.value.problem);
      if (selectedProblem) {
        mData = {
          ...mData,
          problem: {
            _id: selectedProblem._id,
            name: selectedProblem.name,
          }
        };
      }
    }

    // Set color object if available
    if (this.dataForm.value.color && this.colors.length > 0) {
      const selectedColor = this.colors.find((f) => f._id === this.dataForm.value.color);
      if (selectedColor) {
        mData = {
          ...mData,
          color: {
            _id: selectedColor._id,
            name: selectedColor.name,
          }
        };
      }
    }

    // Add parts data separately
    const partsData = this.parts.map(part => ({
      product: {
        _id: part.productId,
        name: part.product.name,
        sku: part.product.sku,
        images: part.product.images || [],
      },
      quantity: part.quantity,
      unitPrice: part.unitPrice,
      totalPrice: part.totalPrice,
    }));

    // Calculate parts amount separately
    const partsAmount = this.getPartsTotal();
    
    console.log('Parts Data:', partsData);
    console.log('Parts Amount:', partsAmount);
    console.log('Parts Array:', this.parts);

    mData = {
      ...mData,
      parts: partsData,
      partsAmount: partsAmount,
      // Keep amount as repair amount (service charge)
    };
    
    console.log('Final mData:', mData);

    this.repairData = mData;

    if (this.repair) {
      this.updateRepairById(mData);
    } else {
      this.addRepair(mData);
    }
  }

  private getRepairById() {
    this.isLoading = true;
    const subscription = this.repairService.getRepairById(this.id)
      .subscribe({
        next: (res: any) => {
          this.isLoading = false;
          if (res.data) {
            this.repair = res.data;
            this.parts = this.repair.parts || [];
            this.saleId = this.repair.saleId || null; // Get existing saleId
            this.setFormValue();
          }
        },
        error: (error) => {
          this.isLoading = false;
          console.log(error);
        }
      });
    this.subscriptions.push(subscription);
  }

  private addRepair(data: any) {
    this.isLoading = true;
    const subscription = this.repairService.addRepair(data)
      .subscribe({
        next: (res: any) => {
          this.isLoading = false;
          if (res.success) {
            const repairId = res.data?._id;
            
            // Create sale for parts if parts exist
            if (this.parts && this.parts.length > 0) {
              this.createOrUpdateSaleForParts(data, repairId);
            }

            this.uiService.message(res.message || 'Repair added successfully', 'success');
            setTimeout(() => {
              this.formElement.resetForm();
              this.router.navigate(['/repair/repair-list']).then();
            }, 200);
          } else {
            this.uiService.message(res.message || 'Failed to add repair', 'warn');
          }
        },
        error: (error) => {
          this.isLoading = false;
          console.log(error);
        }
      });
    this.subscriptions.push(subscription);
  }

  private updateRepairById(data: any) {
    this.isLoading = true;
    const subscription = this.repairService.updateRepairById(this.repair._id, data)
      .subscribe({
        next: (res: any) => {
          this.isLoading = false;
          if (res.success) {
            // Update sale for parts if parts exist
            if (this.parts && this.parts.length > 0) {
              this.createOrUpdateSaleForParts(data, this.repair._id);
            } else {
              // If no parts, delete the sale
              this.deleteSaleForRepair();
            }

            this.uiService.message(res.message || 'Repair updated successfully', 'success');
            this.reloadService.needRefreshData$();
            setTimeout(() => {
              this.router.navigate(['/repair/repair-list']).then();
            }, 200);
          } else {
            this.uiService.message(res.message || 'Failed to update repair', 'warn');
          }
        },
        error: (error) => {
          this.isLoading = false;
          console.log(error);
        }
      });
    this.subscriptions.push(subscription);
  }

  private getShopInformation() {
    const subscription = this.shopInformationService.getShopInformation()
      .subscribe({
        next: (res: any) => {
          if (res.data) {
            this.shopInformation = res.data;
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
    this.subscriptions.push(subscription);
  }

  private getAllBrand(searchQuery?: string) {
    const mSelect = {
      name: 1,
    };

    const filter: FilterData = {
      filter: null,
      pagination: null,
      select: mSelect,
      sort: {createdAt: -1},
    };

    const searchTerm = searchQuery || this.brandSearchControl.value || '';

    // Use getAllBrands1 which uses get-all endpoint (doesn't require shop parameter)
    const subscription = this.brandService.getAllBrands1(filter, searchTerm || null)
      .subscribe({
        next: (res: any) => {
          if (res.success) {
            this.brands = res.data || [];
            this.filterBrandData = [...this.brands];
          } else {
            console.log('Brand loading failed:', res);
          }
        },
        error: (err) => {
          console.log('Brand loading error:', err);
          // Try fallback to getAllBrands if getAllBrands1 fails
          this.brandService.getAllBrands(filter, searchTerm || null)
            .subscribe({
              next: (res: any) => {
                if (res.success) {
                  this.brands = res.data || [];
                  this.filterBrandData = [...this.brands];
                }
              },
              error: (err2) => {
                console.log('Fallback brand loading error:', err2);
              }
            });
        },
      });
    this.subscriptions.push(subscription);
  }

  private getAllModel(brandId?: string, searchQuery?: string) {
    const mSelect = {
      name: 1,
      brand: 1,
    };

    const filter: FilterData = {
      filter: brandId ? { 'brand._id': brandId } : null,
      pagination: null,
      select: mSelect,
      sort: {createdAt: -1},
    };

    const searchTerm = searchQuery || this.modelSearchControl.value || '';

    // Use getAllModels1 which uses get-all endpoint (doesn't require shop parameter)
    const subscription = this.modelService.getAllModels1(filter, searchTerm || null)
      .subscribe({
        next: (res: any) => {
          if (res.success) {
            this.models = res.data || [];
            // Apply client-side filtering as backup
            this.filterModelsByBrand(brandId);
          } else {
            console.log('Model loading failed:', res);
          }
        },
        error: (err) => {
          console.log('Model loading error:', err);
          // Try fallback to getAllModels if getAllModels1 fails
          this.modelService.getAllModels(filter, searchTerm || null)
            .subscribe({
              next: (res: any) => {
                if (res.success) {
                  this.models = res.data || [];
                  // Apply client-side filtering as backup
                  this.filterModelsByBrand(brandId);
                }
              },
              error: (err2) => {
                console.log('Fallback model loading error:', err2);
              }
            });
        },
      });
    this.subscriptions.push(subscription);
  }

  private filterModelsByBrand(brandId?: string) {
    if (!brandId) {
      this.filterModelData = [...this.models];
      return;
    }

    // Filter models by brand - handle different brand object structures
    this.filterModelData = this.models.filter(model => {
      if (!model.brand) {
        return false;
      }
      
      // Handle brand as object with _id
      if (typeof model.brand === 'object' && model.brand._id) {
        return model.brand._id === brandId || model.brand._id.toString() === brandId;
      }
      
      // Handle brand as direct _id string
      if (typeof model.brand === 'string') {
        return model.brand === brandId;
      }
      
      return false;
    });
  }

  private getAllProblem() {
    const mSelect = {
      name: 1,
    };

    const filter: FilterData = {
      filter: null,
      pagination: null,
      select: mSelect,
      sort: {createdAt: -1},
    };

    // Use getAllProblems1 which uses get-all endpoint (doesn't require shop parameter)
    const subscription = this.problemService.getAllProblems1(filter, null)
      .subscribe({
        next: (res: any) => {
          if (res.success) {
            this.problems = res.data || [];
            this.filterProblemData = [...this.problems];
          } else {
            console.log('Problem loading failed:', res);
          }
        },
        error: (err) => {
          console.log('Problem loading error:', err);
          // Try fallback to getAllProblems if getAllProblems1 fails
          this.problemService.getAllProblems(filter, null)
            .subscribe({
              next: (res: any) => {
                if (res.success) {
                  this.problems = res.data || [];
                  this.filterProblemData = [...this.problems];
                }
              },
              error: (err2) => {
                console.log('Fallback problem loading error:', err2);
              }
            });
        },
      });
    this.subscriptions.push(subscription);
  }


  /**
   * Open Pattern Lock Dialog
   */
  openPatternLock() {
    const currentPattern = this.dataForm?.get('pattern')?.value || '';
    const dialogRef = this.dialog.open(PatternLockComponent, {
      width: '450px',
      maxWidth: '90vw',
      data: { pattern: currentPattern },
      disableClose: false
    });

    dialogRef.afterClosed().subscribe((pattern: string) => {
      if (pattern) {
        this.dataForm?.patchValue({ pattern: pattern });
        this.uiService.message('Pattern saved successfully', 'success');
      }
    });
  }

  /**
   * PARTS FUNCTIONALITY
   */
  private getAllProducts() {
    const mSelect = {
      _id: 1,
      name: 1,
      sku: 1,
      salePrice: 1,
      purchasePrice: 1,
      costPrice: 1,
      quantity: 1,
      images: 1,
      isVariation: 1,
      variationList: 1,
    };

    const filter: FilterData = {
      filter: { status: { $ne: 'trash' } },
      pagination: null,
      select: mSelect,
      sort: { createdAt: -1 },
    };

    const subscription = this.productService.getAllProducts(filter, null).subscribe({
      next: (res) => {
        if (res.success) {
          this.allProducts = res.data || [];
        }
      },
      error: (err) => console.error('Error loading products:', err)
    });
    this.subscriptions.push(subscription);
  }

  onProductSearch(query: string) {
    this.productSearchQuery = query;
    if (query && query.length > 0) {
      const searchTerm = query.toLowerCase().trim();
      this.searchProducts = this.allProducts.filter(p => {
        const name = this.utilsService.getProductName(p)?.toLowerCase() || '';
        const sku = p.sku?.toLowerCase() || '';
        return name.includes(searchTerm) || sku.includes(searchTerm);
      }).slice(0, 10);

      this.searchResultsWithVariations = [];
      this.searchProducts.forEach(product => {
        if (product.variationList && product.variationList.length > 0) {
          product.variationList.forEach((variation: VariationList) => {
            this.searchResultsWithVariations.push({
              product: product,
              variation: variation,
              isVariation: true,
              displayName: `${product.name} - ${variation.name || 'Variation'}`,
              price: variation.salePrice || variation.regularPrice || product.salePrice || 0,
              stock: variation.quantity || 0,
              sku: variation.sku || product.sku,
            });
          });
        } else {
          this.searchResultsWithVariations.push({
            product: product,
            variation: null,
            isVariation: false,
            displayName: this.utilsService.getProductName(product),
            price: product.salePrice || 0,
            stock: product.quantity || 0,
            sku: product.sku,
          });
        }
      });
    } else {
      this.searchProducts = [];
      this.searchResultsWithVariations = [];
    }
  }

  onSelectSearchItem(item: any) {
    const existingIndex = this.parts.findIndex(p => 
      p.productId === item.product._id && 
      (!item.isVariation || p.selectedVariationId === item.variation._id)
    );

    if (existingIndex === -1) {
      const unitPrice = item.isVariation 
        ? (item.variation.salePrice || item.variation.regularPrice || item.product.salePrice || 0)
        : (item.product.salePrice || 0);

      this.parts.push({
        productId: item.product._id,
        product: {
          _id: item.product._id,
          name: item.displayName,
          sku: item.sku,
          images: item.product.images || [],
        },
        selectedVariationId: item.isVariation ? item.variation._id : null,
        quantity: 1,
        unitPrice: unitPrice,
        totalPrice: unitPrice * 1,
      });
    } else {
      this.parts[existingIndex].quantity += 1;
      this.parts[existingIndex].totalPrice = this.parts[existingIndex].quantity * this.parts[existingIndex].unitPrice;
    }

    this.productSearchQuery = '';
    this.searchResultsWithVariations = [];
  }

  incrementPartQuantity(index: number) {
    this.parts[index].quantity += 1;
    this.parts[index].totalPrice = this.parts[index].quantity * this.parts[index].unitPrice;
  }

  decrementPartQuantity(index: number) {
    if (this.parts[index].quantity > 1) {
      this.parts[index].quantity -= 1;
      this.parts[index].totalPrice = this.parts[index].quantity * this.parts[index].unitPrice;
    }
  }

  updatePartQuantity(index: number, quantity: number) {
    if (quantity >= 1) {
      this.parts[index].quantity = quantity;
      this.parts[index].totalPrice = this.parts[index].quantity * this.parts[index].unitPrice;
    }
  }

  updatePartPrice(index: number, price: number) {
    if (price >= 0) {
      this.parts[index].unitPrice = price;
      this.parts[index].totalPrice = this.parts[index].quantity * this.parts[index].unitPrice;
    }
  }

  removePart(index: number) {
    this.parts.splice(index, 1);
  }

  getPartsTotal(): number {
    return this.parts.reduce((sum, part) => sum + (part.totalPrice || 0), 0);
  }

  getRepairAmount(): number {
    const amount = this.dataForm?.get('amount')?.value;
    return amount ? parseFloat(amount.toString()) : 0;
  }

  getTotalAmount(): number {
    const partsTotal = this.getPartsTotal();
    const repairAmount = this.getRepairAmount();
    return partsTotal + repairAmount;
  }

  /**
   * Create or update sale for repair parts
   */
  private createOrUpdateSaleForParts(repairData: any, repairId?: string) {
    // Only create/update sale if there are parts
    if (!this.parts || this.parts.length === 0) {
      // If no parts and sale exists, delete the sale
      if (this.saleId) {
        this.deleteSaleForRepair();
      }
      return;
    }

    // Convert parts to sale products format
    const saleProducts = this.parts.map(part => {
      const fullProduct = this.allProducts.find(p => p._id === part.productId);
      
      const productData: any = {
        _id: part.productId,
        name: part.product.name,
        sku: part.product.sku || '',
        salePrice: part.unitPrice,
        soldQuantity: part.quantity,
        saleType: 'Sale',
        itemDiscount: 0,
        itemDiscountType: 0,
        itemDiscountAmount: 0,
        purchasePrice: fullProduct?.costPrice || 0,
        costPrice: fullProduct?.costPrice || 0,
        quantity: fullProduct?.quantity || 0,
        images: part.product.images || [],
      };

      // Handle variation if exists
      if (part.selectedVariationId && fullProduct?.variationList) {
        const variation = fullProduct.variationList.find(
          (v: any) => v._id === part.selectedVariationId
        );
        if (variation) {
          productData.selectedVariationId = variation._id;
          productData.selectedVariation = variation;
          productData.variationName = variation.name;
          productData.purchasePrice = variation.costPrice || 0;
          productData.costPrice = variation.costPrice || 0;
        }
      }

      return productData;
    });

    // Calculate sale totals
    const subTotal = this.getPartsTotal();
    const totalPurchasePrice = saleProducts.reduce((sum, p) => {
      return sum + ((p.purchasePrice || 0) * (p.soldQuantity || 0));
    }, 0);

    // Prepare customer data
    const customerData = repairData.phoneNo ? {
      name: repairData.customerName || `Customer ${repairData.phoneNo}`,
      phone: repairData.phoneNo,
      address: null,
    } : null;

    // Prepare sale data
    const saleData: Sale = {
      customer: customerData,
      products: saleProducts,
      soldDate: repairData.date || new Date(),
      soldDateString: this.utilsService.getDateString(repairData.date || new Date()),
      soldTime: this.utilsService.getCurrentTime(),
      discount: 0,
      discountAmount: 0,
      discountType: 0,
      usePoints: 0,
      pointsDiscount: 0,
      vatAmount: 0,
      tax: 0,
      ait: 0,
      serviceCharge: 0,
      total: subTotal,
      subTotal: subTotal,
      totalPurchasePrice: totalPurchasePrice,
      paidAmount: subTotal,
      receivedFromCustomer: subTotal,
      paymentType: 'cash',
      status: 'Sale',
      referenceNo: repairId ? `Repair #${repairId.substring(0, 8)}` : 'Repair Parts', // Show repair reference
      month: this.utilsService.getDateMonth(false, repairData.date || new Date()),
      year: this.utilsService.getDateYear(repairData.date || new Date()),
    };

    // Add repair reference to sale
    (saleData as any).repairId = repairId;

    if (this.saleId) {
      // Update existing sale
      this.updateSaleForRepair(saleData);
    } else {
      // Create new sale
      this.createSaleForRepair(saleData, repairId);
    }
  }

  /**
   * Create sale for repair parts
   */
  private createSaleForRepair(saleData: Sale, repairId?: string) {
    const subscription = this.saleService.addSale(saleData)
      .subscribe({
        next: (res: any) => {
          if (res.success && res.data) {
            this.saleId = res.data._id;
            // Update repair with saleId
            if (repairId && this.saleId) {
              this.updateRepairWithSaleId(repairId, this.saleId);
            }
            console.log('Sale created for repair parts:', res.data);
          } else {
            console.error('Failed to create sale for repair:', res.message);
          }
        },
        error: (error) => {
          console.error('Error creating sale for repair:', error);
        }
      });
    this.subscriptions.push(subscription);
  }

  /**
   * Update sale for repair parts
   */
  private updateSaleForRepair(saleData: Sale) {
    if (!this.saleId) return;

    const subscription = this.saleService.updateSaleById(this.saleId, saleData)
      .subscribe({
        next: (res: any) => {
          if (res.success) {
            console.log('Sale updated for repair parts');
          } else {
            console.error('Failed to update sale for repair:', res.message);
          }
        },
        error: (error) => {
          console.error('Error updating sale for repair:', error);
        }
      });
    this.subscriptions.push(subscription);
  }

  /**
   * Update repair with saleId
   */
  private updateRepairWithSaleId(repairId: string, saleId: string) {
    const updateData = { saleId: saleId };
    const subscription = this.repairService.updateRepairById(repairId, updateData)
      .subscribe({
        next: (res: any) => {
          if (res.success) {
            console.log('Repair updated with saleId');
          }
        },
        error: (error) => {
          console.error('Error updating repair with saleId:', error);
        }
      });
    this.subscriptions.push(subscription);
  }

  /**
   * Delete sale if parts are removed
   */
  private deleteSaleForRepair() {
    if (!this.saleId) return;

    const subscription = this.saleService.deleteSaleById(this.saleId)
      .subscribe({
        next: (res: any) => {
          if (res.success) {
            this.saleId = null;
            console.log('Sale deleted for repair');
          }
        },
        error: (error) => {
          console.error('Error deleting sale for repair:', error);
        }
      });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub?.unsubscribe());
  }
}
