import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { UiService } from '../../../../services/core/ui.service';
import { CustomerService } from '../../../../services/common/customer.service';
import { MembershipCardService } from '../../../../services/common/membership-card.service';
import { UtilsService } from '../../../../services/core/utils.service';
import { ShopInformationService } from '../../../../services/common/shop-information.service';
import { ConfirmDialogComponent } from '../../../../shared/components/ui/confirm-dialog/confirm-dialog.component';
import { Customer } from '../../../../interfaces/common/customer.interface';
import { MembershipCard } from '../../../../interfaces/common/membership-card.interface';
import { ShopInformation } from '../../../../interfaces/common/shop-information.interface';
import { Sale } from '../../../../interfaces/common/sale.interface';
import { FilterData } from '../../../../interfaces/gallery/filter-data';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit, OnDestroy {
  // Store Data
  isLoading: boolean = true;
  customerId: string;
  customer: Customer = null;
  customerStats: any = null;
  purchaseHistory: Sale[] = [];
  membershipCard: MembershipCard = null;
  
  // Shop data
  shopInformation: ShopInformation;

  // Tabs
  selectedTab: number = 0;

  // Due Management
  dueAmount: number = 0;
  dueType: 'add' | 'subtract' = 'add';

  // Wallet Management
  walletAmount: number = 0;
  walletType: 'add' | 'subtract' | 'set' = 'add';

  // Points Management
  pointsAmount: number = 0;
  pointsType: 'add' | 'subtract' | 'set' = 'add';

  // Membership Card
  cardType: 'Silver' | 'Gold' | 'Platinum' | 'VIP' = 'Silver';
  expiryDate: Date = null;

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subDataFour: Subscription;
  private subDataFive: Subscription;
  private subShopInfo: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private membershipCardService: MembershipCardService,
    private uiService: UiService,
    private utilsService: UtilsService,
    private shopInformationService: ShopInformationService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.customerId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.customerId) {
      this.getCustomerById();
      this.getCustomerStats();
      this.getPurchaseHistory();
      this.getMembershipCard();
      this.getShopInformation();
    } else {
      this.router.navigate(['/pos/customer/customer-list']);
    }
  }

  /**
   * HTTP REQ HANDLE
   */
  private getCustomerById() {
    this.isLoading = true;
    this.subDataOne = this.customerService.getCustomerById(this.customerId)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.success && res.data) {
            this.customer = res.data;
          } else {
            this.uiService.message('Customer not found', 'warn');
            this.router.navigate(['/pos/customer/customer-list']);
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Error loading customer:', err);
          this.uiService.message('Failed to load customer', 'warn');
        }
      });
  }

  private getCustomerStats() {
    this.subDataTwo = this.customerService.getCustomerStats(this.customerId)
      .subscribe({
        next: (res) => {
          if (res.success && res.data) {
            this.customerStats = res.data;
          }
        },
        error: (err) => {
          console.error('Error loading customer stats:', err);
        }
      });
  }

  private getPurchaseHistory() {
    const filter: FilterData = {
      filter: {},
      pagination: { pageSize: 50, currentPage: 1 },
      select: {
        invoiceNo: 1,
        soldDate: 1,
        soldDateString: 1,
        soldTime: 1,
        total: 1,
        subTotal: 1,
        discount: 1,
        vatAmount: 1,
        paymentType: 1,
        status: 1,
        products: 1,
      },
      sort: { createdAt: -1 },
    };

    this.subDataThree = this.customerService.getCustomerPurchaseHistory(this.customerId, filter)
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

  private getMembershipCard() {
    this.subDataFive = this.membershipCardService.getMembershipCardByCustomer(this.customerId)
      .subscribe({
        next: (res) => {
          if (res.success && res.data) {
            this.membershipCard = res.data;
          } else {
            this.membershipCard = null;
          }
        },
        error: (err) => {
          console.error('Error loading membership card:', err);
          this.membershipCard = null;
        }
      });
  }

  /**
   * UPDATE DUE AMOUNT
   */
  updateDue() {
    if (this.dueAmount <= 0) {
      this.uiService.message('Please enter a valid amount', 'warn');
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'Confirm Due Update',
        message: `Are you sure you want to ${this.dueType === 'add' ? 'add' : 'subtract'} ${this.dueAmount} to/from due amount?`,
      },
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.isLoading = true;
        this.subDataFour = this.customerService.updateCustomerDue(
          this.customerId,
          this.dueAmount,
          this.dueType
        ).subscribe({
          next: (res) => {
            this.isLoading = false;
            if (res.success) {
              this.uiService.message('Due amount updated successfully', 'success');
              this.dueAmount = 0;
              this.getCustomerById();
            } else {
              this.uiService.message(res.message || 'Failed to update due amount', 'warn');
            }
          },
          error: (err) => {
            this.isLoading = false;
            console.error('Error updating due:', err);
            this.uiService.message('Failed to update due amount', 'warn');
          }
        });
      }
    });
  }

  /**
   * UPDATE WALLET BALANCE
   */
  updateWallet() {
    if (this.walletAmount <= 0 && this.walletType !== 'set') {
      this.uiService.message('Please enter a valid amount', 'warn');
      return;
    }

    const actionText = this.walletType === 'add' ? 'add' : (this.walletType === 'subtract' ? 'subtract' : 'set');
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'Confirm Wallet Update',
        message: `Are you sure you want to ${actionText} ${this.walletAmount} to/from wallet balance?`,
      },
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.isLoading = true;
        this.subDataFour = this.customerService.updateWalletBalance(
          this.customerId,
          this.walletAmount,
          this.walletType
        ).subscribe({
          next: (res) => {
            this.isLoading = false;
            if (res.success) {
              this.uiService.message('Wallet balance updated successfully', 'success');
              this.walletAmount = 0;
              this.getCustomerById();
            } else {
              this.uiService.message(res.message || 'Failed to update wallet balance', 'warn');
            }
          },
          error: (err) => {
            this.isLoading = false;
            console.error('Error updating wallet:', err);
            this.uiService.message('Failed to update wallet balance', 'warn');
          }
        });
      }
    });
  }

  /**
   * UPDATE USER POINTS
   */
  updatePoints() {
    if (this.pointsAmount <= 0 && this.pointsType !== 'set') {
      this.uiService.message('Please enter a valid amount', 'warn');
      return;
    }

    const actionText = this.pointsType === 'add' ? 'add' : (this.pointsType === 'subtract' ? 'subtract' : 'set');
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'Confirm Points Update',
        message: `Are you sure you want to ${actionText} ${this.pointsAmount} points?`,
      },
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.isLoading = true;
        // Update customer with new points value
        const currentPoints = this.customer?.userPoints || 0;
        let newPoints = currentPoints;
        
        if (this.pointsType === 'add') {
          newPoints = currentPoints + this.pointsAmount;
        } else if (this.pointsType === 'subtract') {
          newPoints = Math.max(0, currentPoints - this.pointsAmount);
        } else {
          newPoints = this.pointsAmount;
        }

        this.subDataFour = this.customerService.updateCustomerById(this.customerId, {
          userPoints: newPoints
        } as any).subscribe({
          next: (res) => {
            this.isLoading = false;
            if (res.success) {
              this.uiService.message('User points updated successfully', 'success');
              this.pointsAmount = 0;
              this.getCustomerById();
            } else {
              this.uiService.message(res.message || 'Failed to update user points', 'warn');
            }
          },
          error: (err) => {
            this.isLoading = false;
            console.error('Error updating points:', err);
            this.uiService.message('Failed to update user points', 'warn');
          }
        });
      }
    });
  }

  /**
   * CREATE MEMBERSHIP CARD
   */
  createMembershipCard() {
    if (!this.cardType) {
      this.uiService.message('Please select a card type', 'warn');
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'Create Membership Card',
        message: `Are you sure you want to create a ${this.cardType} membership card for this customer?`,
      },
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.isLoading = true;
        const cardData: any = {
          customer: this.customerId,
          cardType: this.cardType,
        };

        if (this.expiryDate) {
          cardData.expiryDate = this.expiryDate;
        }

        this.subDataFive = this.membershipCardService.addMembershipCard(cardData).subscribe({
          next: (res) => {
            this.isLoading = false;
            if (res.success) {
              this.uiService.message('Membership card created successfully', 'success');
              this.getMembershipCard();
              this.cardType = 'Silver';
              this.expiryDate = null;
            } else {
              this.uiService.message(res.message || 'Failed to create membership card', 'warn');
            }
          },
          error: (err) => {
            this.isLoading = false;
            console.error('Error creating membership card:', err);
            this.uiService.message('Failed to create membership card', 'warn');
          }
        });
      }
    });
  }

  /**
   * UPDATE MEMBERSHIP CARD STATUS
   */
  updateCardStatus(newStatus: 'active' | 'expired' | 'suspended') {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'Confirm Status Update',
        message: `Are you sure you want to change card status to ${newStatus}?`,
      },
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.isLoading = true;
        this.subDataFive = this.membershipCardService.updateMembershipCard(this.membershipCard._id, {
          status: newStatus
        } as any).subscribe({
          next: (res) => {
            this.isLoading = false;
            if (res.success) {
              this.uiService.message('Card status updated successfully', 'success');
              this.getMembershipCard();
            } else {
              this.uiService.message(res.message || 'Failed to update card status', 'warn');
            }
          },
          error: (err) => {
            this.isLoading = false;
            console.error('Error updating card status:', err);
            this.uiService.message('Failed to update card status', 'warn');
          }
        });
      }
    });
  }

  getCardTypeClass(cardType: string): string {
    switch (cardType) {
      case 'Silver':
        return 'silver-card';
      case 'Gold':
        return 'gold-card';
      case 'Platinum':
        return 'platinum-card';
      case 'VIP':
        return 'vip-card';
      default:
        return '';
    }
  }

  isExpired(date: Date): boolean {
    if (!date) return false;
    return new Date(date) < new Date();
  }

  /**
   * GET SHOP INFORMATION
   */
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
   * GET CUSTOMER GROUP BADGE CLASS
   */
  getGroupBadgeClass(group: string): string {
    switch (group) {
      case 'VIP':
        return 'vip-badge';
      case 'Wholesale':
        return 'wholesale-badge';
      default:
        return 'general-badge';
    }
  }

  /**
   * PRINT INVOICE
   */
  printInvoice(sale: Sale) {
    // Navigate to sale view with print
    this.router.navigate(['/pos/sales/new-sales/', sale._id], { queryParams: { view: true, print: true } });
  }

  /**
   * ON DESTROY
   */
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
    if (this.subDataFive) {
      this.subDataFive.unsubscribe();
    }
    if (this.subShopInfo) {
      this.subShopInfo.unsubscribe();
    }
  }
}

