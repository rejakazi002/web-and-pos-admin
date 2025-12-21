import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UiService} from "../../../services/core/ui.service";
import {SettingService} from "../../../services/common/setting.service";
import {Title} from "@angular/platform-browser";
import {PageDataService} from "../../../services/core/page-data.service";
import {VendorService} from "../../../services/vendor/vendor.service";
import {ShopService} from "../../../services/common/shop.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-invoice-settings',
  templateUrl: './invoice-settings.component.html',
  styleUrl: './invoice-settings.component.scss'
})
export class InvoiceSettingsComponent implements OnInit, OnDestroy  {

  allowedShopIds = ['686f65db70f6c8aaf4232385','67b8a04ba827d974b010ccc3'];
  // Store Data from
  dataForm: FormGroup;
  invoiceSetting: any;
  isLoading: boolean = false;

  // Inject
  private readonly fb = inject(FormBuilder);
  private readonly uiService = inject(UiService);
  private readonly settingService = inject(SettingService);
  private readonly title = inject(Title);
  private readonly pageDataService = inject(PageDataService);
  protected readonly vendorService = inject(VendorService);
  private readonly shopService = inject(ShopService);


  // Subscriptions
  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    // Init Form
    this.initFormGroup();

    // Base Data
    this.setPageData();
    this.getSetting();
  }

  /**
   * Page Data
   * setPageData()
   */
  private setPageData(): void {
    this.title.setTitle('Invoice Setting');
    this.pageDataService.setPageData({
      title: 'Invoice Setting',
      navArray: [
        {name: 'Settings', url: `/settings`},
        {name: 'Invoice Setting', url: null},
      ]
    })
  }




  isAllowedShop(): boolean {
    const id = this.vendorService.getShopId();
    return !!id && this.allowedShopIds.includes(id);
  }


  /**
   * FORMS METHODS
   * initFormGroup()
   * setFormData()
   * onSubmit()
   */

  private initFormGroup() {
    this.dataForm = this.fb.group({
      selectedInvoice: ['invoice1'],
      isEnableInvoiceCourierId: [false],
      isDisableInvoicePriceSection: [false],
    });
  }

  private setFormData() {
    this.dataForm.patchValue({
      selectedInvoice: this.invoiceSetting?.selectedInvoice || 'invoice1', // default
      isEnableInvoiceCourierId: this.invoiceSetting?.isEnableInvoiceCourierId || false, // default
      isDisableInvoicePriceSection: this.invoiceSetting.isDisableInvoicePriceSection,

    });
  }


  onSubmit() {
    this.isLoading = true;
    const mData = {
      invoiceSetting: {...this.dataForm.value},
      // needRebuild: true
    }

    this.addSetting(mData);
  }

  selectInvoice(invoiceId: string) {
    this.dataForm.get('selectedInvoice')?.setValue(invoiceId);
  }



  /**
   * HTTP REQ HANDLE
   * getSetting()
   * addSetting()
   */

  private getSetting() {
    const subscription = this.settingService.getSetting('invoiceSetting')
      .subscribe({
        next: res => {
          if (res.data && res.data.invoiceSetting) {
            this.invoiceSetting = res.data.invoiceSetting;
            this.setFormData();
          }
        },
        error: err => {
          console.log(err)
        }
      });
    this.subscriptions.push(subscription);
  }

  private addSetting(data: any) {
    const subscription = this.settingService
      .addSetting(data)
      .subscribe({
        next: res => {
          this.isLoading = false;
          this.uiService.message(res.message, "success");
          this.checkShopBuildStatusById();
        },
        error: err => {
          this.isLoading = false;
          console.log(err);
        }
      });
    this.subscriptions.push(subscription);
  }


  private checkShopBuildStatusById() {
    this.shopService.checkShopUpdateStatusByInterval(1200)
      .subscribe({
        next: res => {
          if (res.data) {
            // this.buildStatus = res.data.updateStatus;
            // if (this.buildStatus === 'secure' || this.buildStatus === 'updated') {
            //   this.elapsedTime = this.totalTime;
            // }
          }
        },
        error: err => {
          console.log(err)
        }
      })
  }

  /**
   * ON Destroy
   */
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub?.unsubscribe());
  }

}
