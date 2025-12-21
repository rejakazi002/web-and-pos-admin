import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { UiService } from '../../../../services/core/ui.service';
import { SupplierService } from '../../../../services/common/supplier.service';
import { PurchaseService } from '../../../../services/common/purchase.service';
import { UtilsService } from '../../../../services/core/utils.service';
import { ShopInformationService } from '../../../../services/common/shop-information.service';
import { ConfirmDialogComponent } from '../../../../shared/components/ui/confirm-dialog/confirm-dialog.component';
import { Supplier } from '../../../../interfaces/common/supplier.interface';
import { Purchase } from '../../../../interfaces/common/purchase.interface';
import { ShopInformation } from '../../../../interfaces/common/shop-information.interface';

@Component({
  selector: 'app-supplier-details',
  templateUrl: './supplier-details.component.html',
  styleUrls: ['./supplier-details.component.scss']
})
export class SupplierDetailsComponent implements OnInit, OnDestroy {
  // Store Data
  isLoading: boolean = true;
  supplierId: string;
  supplier: Supplier = null;
  supplierStats: any = null;
  purchaseHistory: Purchase[] = [];
  
  // Shop data
  shopInformation: ShopInformation;

  // Tabs
  selectedTab: number = 0;

  // Due Management
  dueAmount: number = 0;
  dueType: 'add' | 'subtract' = 'add';

  // Payment Management
  paymentAmount: number = 0;
  paymentMethod: string = 'cash';
  paymentReference: string = '';
  paymentNotes: string = '';

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subDataFour: Subscription;
  private subShopInfo: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private supplierService: SupplierService,
    private purchaseService: PurchaseService,
    private uiService: UiService,
    private utilsService: UtilsService,
    private shopInformationService: ShopInformationService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.supplierId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.supplierId) {
      this.getSupplierById();
      this.getSupplierStats();
      this.getPurchaseHistory();
      this.getShopInformation();
    } else {
      this.router.navigate(['/pos/supplier/supplier-list']);
    }
  }

  /**
   * HTTP REQ HANDLE
   */
  private getSupplierById() {
    this.isLoading = true;
    this.subDataOne = this.supplierService.getSupplierById(this.supplierId)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.success && res.data) {
            this.supplier = res.data;
          } else {
            this.uiService.message('Supplier not found', 'warn');
            this.router.navigate(['/pos/supplier/supplier-list']);
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Error loading supplier:', err);
          this.uiService.message('Failed to load supplier', 'warn');
        }
      });
  }

  private getSupplierStats() {
    this.subDataTwo = this.supplierService.getSupplierStats(this.supplierId)
      .subscribe({
        next: (res) => {
          if (res.success && res.data) {
            this.supplierStats = res.data;
          }
        },
        error: (err) => {
          console.error('Error loading supplier stats:', err);
        }
      });
  }

  private getPurchaseHistory() {
    this.subDataThree = this.purchaseService.getSupplierPurchaseHistory(this.supplierId)
      .subscribe({
        next: (res) => {
          if (res.success && res.data) {
            this.purchaseHistory = res.data || [];
          }
        },
        error: (err) => {
          console.error('Error loading purchase history:', err);
        }
      });
  }

  private getShopInformation() {
    this.subShopInfo = this.shopInformationService.getShopInformation()
      .subscribe({
        next: res => {
          this.shopInformation = res.data;
        },
        error: err => {
          console.log(err);
        }
      });
  }

  /**
   * UPDATE DUE
   */
  updateDue() {
    if (!this.dueAmount || this.dueAmount <= 0) {
      this.uiService.message('Please enter a valid amount', 'warn');
      return;
    }

    this.subDataFour = this.supplierService.updateSupplierDue(
      this.supplierId,
      this.dueAmount,
      this.dueType
    )
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.uiService.message(res.message || 'Due updated successfully', 'success');
            this.dueAmount = 0;
            this.getSupplierById();
            this.getSupplierStats();
          } else {
            this.uiService.message(res.message || 'Failed to update due', 'warn');
          }
        },
        error: (err) => {
          console.error('Error updating due:', err);
          this.uiService.message('Failed to update due', 'warn');
        }
      });
  }

  /**
   * ADD PAYMENT
   */
  addPayment() {
    if (!this.paymentAmount || this.paymentAmount <= 0) {
      this.uiService.message('Please enter a valid amount', 'warn');
      return;
    }

    this.subDataFour = this.supplierService.addSupplierPayment(
      this.supplierId,
      this.paymentAmount,
      this.paymentMethod,
      this.paymentReference,
      this.paymentNotes
    )
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.uiService.message(res.message || 'Payment recorded successfully', 'success');
            this.paymentAmount = 0;
            this.paymentMethod = 'cash';
            this.paymentReference = '';
            this.paymentNotes = '';
            this.getSupplierById();
            this.getSupplierStats();
          } else {
            this.uiService.message(res.message || 'Failed to record payment', 'warn');
          }
        },
        error: (err) => {
          console.error('Error recording payment:', err);
          this.uiService.message('Failed to record payment', 'warn');
        }
      });
  }

  ngOnDestroy() {
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
    if (this.subDataTwo) {
      this.subDataTwo.unsubscribe();
    }
    if (this.subDataThree) {
      this.subDataThree.unsubscribe();
    }
    if (this.subDataFour) {
      this.subDataFour.unsubscribe();
    }
    if (this.subShopInfo) {
      this.subShopInfo.unsubscribe();
    }
  }
}

