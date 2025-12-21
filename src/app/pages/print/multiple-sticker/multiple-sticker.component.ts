import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OrderService} from "../../../services/common/order.service";
import {Title} from "@angular/platform-browser";
import {PageDataService} from "../../../services/core/page-data.service";
import {SettingService} from "../../../services/common/setting.service";
import {VendorService} from "../../../services/vendor/vendor.service";
import {Subscription} from "rxjs";
import * as QRCode from 'qrcode';
@Component({
  selector: 'app-multiple-sticker',
  templateUrl: './multiple-sticker.component.html',
  styleUrl: './multiple-sticker.component.scss'
})
export class MultipleStickerComponent implements OnInit, OnDestroy {
  allowedShopIds = ['67de7097554f668b2dc66444','679511745a429b7bb55421c4'];
  // Store Data
  id: string;
  invoice: any;
  private intervalId: any;
  orderSetting: any;
  invoiceSetting: any;
  isDisableInvoicePriceSection: boolean;
  public qrImageUrl:any;
  // Loading Control
  isLoading: boolean = true;
  selectedInvoice: string;
  invoices: any[] = [];
  // Per-invoice QR storage: key = trackingId || orderId
  public qrByOrderId: Record<string, string> = {};
  // Inject
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly orderService = inject(OrderService);
  private readonly title = inject(Title);
  private readonly pageDataService = inject(PageDataService);
  private readonly settingService = inject(SettingService);
  private readonly vendorService = inject(VendorService);

  // Subscriptions
  private subscriptions: Subscription[] = [];

  ngOnInit() {
    const subscription = this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');
      // if (this.id) {
      //   this.generateInvoiceById();
      // }
    });
    this.subscriptions.push(subscription);

    this.setPageData();
    this.getSetting();

    // Listen for when the print dialog is closed or printing is done
    // window.onafterprint = () => {
    //   this.router.navigate(['/bill/all-bill']).then();
    // };
    const nav = history.state as { ids?: string[],selectedInvoice?: string };
    const ids = nav?.ids?.length ? nav.ids : (this.id ? [this.id] : []);
    this.selectedInvoice = nav?.selectedInvoice ?? 'invoice6';

    if (this.selectedInvoice === 'invoice6') {
      this.orderService.generateInvoices(ids).subscribe({
        next: (res) => {
          this.invoices = res?.data ?? [];
          this.isLoading = false;
          // Generate QR for each invoice
          this.generateAllQRCodes(this.invoices);

          // If you want auto print after all data is rendered:
          setTimeout(() => window.print(), 200);
        },
        error: () => {
          this.isLoading = false;
        },
      });
    }else {
      this.router.navigate(['/']);
    }
  }

  private async generateAllQRCodes(invoices: any[]) {
    const tasks = invoices.map(async (inv) => {
      const key =  inv?.orderId || inv?.phoneNo;
      if (!key) return;
      // Avoid regenerating
      if (this.qrByOrderId[key]) return;
      this.qrByOrderId[key] = await QRCode.toDataURL(String(key));
    });
    await Promise.all(tasks);
  }
  /**
   * Page Data
   * setPageData()
   */
  private setPageData(): void {
    this.title.setTitle('Invoice');
    this.pageDataService.setPageData({
      title: 'Invoice',
      navArray: [
        {name: 'Dashboard', url: `/dashboard`},
        {name: 'Invoice', url: null},
      ]
    })
  }

  isAllowedShop(): boolean {
    const id = this.vendorService.getShopId();
    return !!id && this.allowedShopIds.includes(id);
  }
  /**
   * HTTP Req Handle
   * generateInvoiceById()
   */

  generateInvoiceById() {
    const subscription = this.orderService.generateInvoiceById(this.id)
      .subscribe({
        next: (res) => {
          this.invoice = res.data;
          this.isLoading = false;
          if (this.invoice) {
            this.title.setTitle(`Invoice #${this.invoice.orderId}`);
            QRCode.toDataURL(this.invoice.trackingId?? this.invoice.orderId).then(url => {
              this.qrImageUrl = url; // use in <img [src]="qrImageUrl">
            });
            // Automatically trigger the print dialog
            setTimeout(() => {
              this.printInvoice();
            }, 0)
          }
        },
        error: (err) => {
          console.log(err)
        }
      });
    this.subscriptions.push(subscription);
  }

  private getSetting() {
    const subscription = this.settingService.getSetting('orderSetting invoiceSetting')
      .subscribe({
        next: res => {
          if (res.data && res.data.orderSetting) {
            this.orderSetting = res.data;
            this.invoiceSetting = res.data.invoiceSetting;
            console.log(this.invoiceSetting);
            this.isDisableInvoicePriceSection = this.invoiceSetting?.isDisableInvoicePriceSection;
          }
        },
        error: err => {
          console.log(err)
        }
      });

    this.subscriptions.push(subscription);
  }

  getTotaQuantity(data:any){
    let qty = 0
    data.forEach(mm=> {
      qty +=   mm.quantity
    })
    return qty
  }
  /**
   * Print Method
   * printInvoice()
   * checkImagesLoadedPeriodically()
   */

  protected printInvoice(): void {
    // window.print();
    /** When Image Need Loaded **/
    this.checkImagesLoadedPeriodically()
  }

  private checkImagesLoadedPeriodically() {
    const images: NodeListOf<HTMLImageElement> = document.querySelectorAll('img');
    this.intervalId = setInterval(() => {
      const allImagesLoaded = Array.from(images).every((img) => img.complete && img.naturalHeight > 0);
      if (allImagesLoaded) {
        clearInterval(this.intervalId);
        window.print();
      }
    }, 500);
  }

  /**
   * ON Destroy
   */
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub?.unsubscribe());
    // Clean up the event listener
    window.onafterprint = null;

    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

}
