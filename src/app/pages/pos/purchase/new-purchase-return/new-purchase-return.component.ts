import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UiService } from '../../../../services/core/ui.service';
import { UtilsService } from '../../../../services/core/utils.service';
import { PurchaseService } from '../../../../services/common/purchase.service';
import { ShopInformationService } from '../../../../services/common/shop-information.service';
import { ShopInformation } from '../../../../interfaces/common/shop-information.interface';

@Component({
  selector: 'app-new-purchase-return',
  templateUrl: './new-purchase-return.component.html',
  styleUrls: ['./new-purchase-return.component.scss'],
})
export class NewPurchaseReturnComponent implements OnInit, OnDestroy {
  // Form
  dataForm: FormGroup;
  
  // Data
  purchase: any = null;
  purchaseId: string = null;
  returnProducts: any[] = [];
  shopInformation: ShopInformation;
  
  // State
  isLoading: boolean = false;
  isSearching: boolean = false;
  
  // Subscriptions
  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private uiService: UiService,
    private utilsService: UtilsService,
    private purchaseService: PurchaseService,
    private shopInformationService: ShopInformationService,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getShopInformation();
    
    // Check if purchase ID is passed
    this.purchaseId = this.route.snapshot.paramMap.get('id');
    if (this.purchaseId) {
      this.getPurchaseById(this.purchaseId);
    }
  }

  private initForm() {
    this.dataForm = this.fb.group({
      purchaseNo: [null, Validators.required],
      returnType: ['CREDIT', Validators.required],
      returnDate: [new Date(), Validators.required],
      reason: [null],
      note: [null],
    });
  }

  private getShopInformation() {
    const sub = this.shopInformationService.getShopInformation()
      .subscribe({
        next: res => {
          this.shopInformation = res.data;
        },
        error: err => console.log(err)
      });
    this.subscriptions.push(sub);
  }

  searchPurchase() {
    const purchaseNo = this.dataForm.get('purchaseNo')?.value;
    if (!purchaseNo) {
      this.uiService.message('Please enter purchase number', 'warn');
      return;
    }
    
    this.isSearching = true;
    const sub = this.purchaseService.getAllPurchases({
      filter: { purchaseNo: purchaseNo },
      pagination: null,
      select: null,
      sort: null
    }).subscribe({
      next: (res) => {
        this.isSearching = false;
        if (res.success && res.data && res.data.length > 0) {
          this.purchase = res.data[0];
          this.initReturnProducts();
        } else {
          this.uiService.message('Purchase not found', 'warn');
          this.purchase = null;
          this.returnProducts = [];
        }
      },
      error: (err) => {
        this.isSearching = false;
        console.error(err);
        this.uiService.message('Error searching purchase', 'warn');
      }
    });
    this.subscriptions.push(sub);
  }

  private getPurchaseById(id: string) {
    this.isLoading = true;
    const sub = this.purchaseService.getPurchaseById(id).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.success && res.data) {
          this.purchase = res.data;
          this.dataForm.patchValue({ purchaseNo: this.purchase.purchaseNo });
          this.initReturnProducts();
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
      }
    });
    this.subscriptions.push(sub);
  }

  private initReturnProducts() {
    if (!this.purchase?.products) return;
    
    this.returnProducts = this.purchase.products.map((p: any) => ({
      productId: p.productId,
      name: p.name,
      sku: p.sku,
      quantity: p.quantity,
      purchasePrice: p.purchasePrice,
      returnQty: 0,
      returnAmount: 0,
      selected: false,
    }));
  }

  onReturnQtyChange(index: number) {
    const product = this.returnProducts[index];
    if (product.returnQty > product.quantity) {
      product.returnQty = product.quantity;
      this.uiService.message('Return quantity cannot exceed purchased quantity', 'warn');
    }
    if (product.returnQty < 0) {
      product.returnQty = 0;
    }
    product.returnAmount = product.returnQty * product.purchasePrice;
    product.selected = product.returnQty > 0;
  }

  getGrandTotal(): number {
    return this.returnProducts.reduce((sum, p) => sum + (p.returnAmount || 0), 0);
  }

  getSelectedProducts(): any[] {
    return this.returnProducts.filter(p => p.returnQty > 0);
  }

  onSubmit() {
    if (!this.purchase) {
      this.uiService.message('Please search and select a purchase first', 'warn');
      return;
    }

    const selectedProducts = this.getSelectedProducts();
    if (selectedProducts.length === 0) {
      this.uiService.message('Please select at least one product to return', 'warn');
      return;
    }

    const returnDate = this.dataForm.get('returnDate')?.value || new Date();
    
    const data = {
      originalPurchaseId: this.purchase._id,
      originalPurchaseNo: this.purchase.purchaseNo,
      supplier: this.purchase.supplier,
      products: selectedProducts,
      returnType: this.dataForm.get('returnType')?.value || 'CREDIT',
      returnDate: returnDate,
      returnDateString: this.utilsService.getDateString(returnDate),
      month: this.utilsService.getDateMonth(false, returnDate),
      year: this.utilsService.getDateYear(returnDate),
      reason: this.dataForm.get('reason')?.value,
      note: this.dataForm.get('note')?.value,
      subTotal: this.getGrandTotal(),
      grandTotal: this.getGrandTotal(),
    };

    this.isLoading = true;
    const sub = this.purchaseService.addReturnPurchase(data).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.success) {
          this.uiService.message('Purchase return processed successfully', 'success');
          this.router.navigate(['/pos/purchase/purchase-return-list']);
        } else {
          this.uiService.message(res.message || 'Failed to process return', 'warn');
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
        this.uiService.message('Error processing return', 'warn');
      }
    });
    this.subscriptions.push(sub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub?.unsubscribe());
  }
}

