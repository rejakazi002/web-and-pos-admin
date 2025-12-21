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
  selector: 'app-invoice4',
  templateUrl: './invoice4.component.html',
  styleUrl: './invoice4.component.scss'
})
export class Invoice4Component implements OnInit, OnDestroy {
  allowedShopIds = ['67de7097554f668b2dc66444'];
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
      if (this.id) {
        this.generateInvoiceById();
      }
    });
    this.subscriptions.push(subscription);

    this.setPageData();
    this.getSetting();

    // Listen for when the print dialog is closed or printing is done
    // window.onafterprint = () => {
    //   this.router.navigate(['/bill/all-bill']).then();
    // };

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
            const baseAmount = (this.invoice?.grandTotal ?? this.invoice?.subTotal ?? 0);
            if (!this.invoice.amountInWords) {
              this.invoice.amountInWords = this.amountToWordsBDT(baseAmount);
            }
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


  /** Convert 12345678.90 => "One Crore Twenty Three Lakh Forty Five Thousand Six Hundred Seventy Eight Taka and Ninety Paisa Only" */
  private amountToWordsBDT(n: number | string | null | undefined): string {
    const num = Number(n ?? 0);
    if (!isFinite(num) || num < 0) return 'Zero Taka Only';

    const ones = [
      '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six',
      'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve',
      'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
      'Seventeen', 'Eighteen', 'Nineteen'
    ];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    function twoDigits(n: number): string {
      if (n < 20) return ones[n];
      const t = Math.floor(n / 10), o = n % 10;
      return [tens[t], ones[o]].filter(Boolean).join(' ');
    }

    function threeDigits(n: number): string {
      const h = Math.floor(n / 100);
      const r = n % 100;
      const parts: string[] = [];
      if (h) parts.push(ones[h] + ' Hundred');
      if (r) parts.push(twoDigits(r));
      return parts.join(' ');
    }

    // Indian grouping: crore(10^7), lakh(10^5), thousand(10^3), hundred(10^2), rest
    const integer = Math.floor(num);
    const paise = Math.round((num - integer) * 100);

    const crore   = Math.floor(integer / 10000000);
    const lakh    = Math.floor((integer % 10000000) / 100000);
    const thousand= Math.floor((integer % 100000) / 1000);
    const hundred = Math.floor((integer % 1000) / 100);
    const rest    = integer % 100;

    const chunks: string[] = [];
    if (crore)    chunks.push(threeDigits(crore) + ' Crore');
    if (lakh)     chunks.push(threeDigits(lakh) + ' Lakh');
    if (thousand) chunks.push(threeDigits(thousand) + ' Thousand');
    if (hundred)  chunks.push(ones[hundred] + ' Hundred');
    if (rest)     chunks.push(twoDigits(rest));
    if (!chunks.length) chunks.push('Zero');

    const takaPart = chunks.join(' ').replace(/\s+/g, ' ').trim() + ' Taka';
    const paisaPart = paise ? `${twoDigits(paise)} Paisa` : '';
    return (takaPart + (paisaPart ? ' and ' + paisaPart : '') + ' Only').replace(/\s+/g, ' ').trim();
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
