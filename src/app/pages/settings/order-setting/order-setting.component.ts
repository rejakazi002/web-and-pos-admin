import { Clipboard } from '@angular/cdk/clipboard';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { SettingService } from '../../../services/common/setting.service';
import { CountryService } from '../../../services/core/country.service';
import { PageDataService } from '../../../services/core/page-data.service';
import { ReloadService } from '../../../services/core/reload.service';
import { UiService } from '../../../services/core/ui.service';
import { VendorService } from '../../../services/vendor/vendor.service';
import { YoutubeVideoShowComponent } from '../../../shared/dialog-view/youtube-video-show/youtube-video-show.component';

@Component({
  selector: 'app-order-setting',
  templateUrl: './order-setting.component.html',
  styleUrl: './order-setting.component.scss',
})
export class OrderSettingComponent implements OnInit, OnDestroy {
  allowedShopIds = [
    '6875e087618cd365fb9160db',
    // Amder Test er Jonno nicher id Gulo
    '67b8a04ba827d974b010ccc3',
    '679511745a429b7bb55421c4',
    '67a8615b53a1da782b9acad9',
  ];

  // Allowed shop IDs for Sub Area option
  allowedShopIdSubArea = [
    // Allowed shop IDs for Sub Area option
    '68e9515beea7e36ac90d31f8', // hanoi bd
    '679511745a429b7bb55421c4', // Test ID
  ];

  // Allowed shop IDs for Checkout Message option
  allowedShopIdsCheckoutNote = [
    '68e9515beea7e36ac90d31f8', // hanoi bd
    '679511745a429b7bb55421c4', // Test ID
  ];
  // Store Data from param
  dataForm: FormGroup;
  orderSetting: any;

  // Dynamic placeholders for success page message
  dynamicPlaceholders = [
    { key: '{{orderId}}', description: 'Order ID' },
    // { key: '{{CUSTOMER_NAME}}', description: 'Customer Name' },
    // { key: '{{CUSTOMER_PHONE}}', description: 'Customer Phone Number' },
    // { key: '{{CUSTOMER_EMAIL}}', description: 'Customer Email' },
    // { key: '{{ORDER_DATE}}', description: 'Order Date' },
    // { key: '{{ORDER_TIME}}', description: 'Order Time' },
    // { key: '{{TOTAL_AMOUNT}}', description: 'Total Order Amount' },
    // { key: '{{PAYMENT_METHOD}}', description: 'Payment Method' },
    // { key: '{{DELIVERY_ADDRESS}}', description: 'Delivery Address' },
    // { key: '{{SHOP_NAME}}', description: 'Shop Name' },
    // { key: '{{TRACKING_ID}}', description: 'Tracking ID (if available)' },
    // { key: '{{ESTIMATED_DELIVERY}}', description: 'Estimated Delivery Date' }
  ];

  // Inject
  private readonly fb = inject(FormBuilder);
  private readonly uiService = inject(UiService);
  private readonly settingService = inject(SettingService);
  private readonly vendorService = inject(VendorService);
  private readonly title = inject(Title);
  private readonly pageDataService = inject(PageDataService);
  private readonly clipboard = inject(Clipboard);
  private readonly reloadService = inject(ReloadService);
  private readonly countryService = inject(CountryService);
  private readonly dialog = inject(MatDialog);

  // Subscriptions
  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    // Init Form
    this.initFormGroup();

    // Base Data
    this.setPageData();
    this.getSetting();

    // Check if current shop is allowed for subArea option
    this.checkSubAreaPermission();

    // Check if current shop is allowed for checkout message option
    this.checkCheckoutMessagePermission();
  }

  /**
   * Page Data
   * setPageData()
   */
  private setPageData(): void {
    this.title.setTitle('Order Setting');
    this.pageDataService.setPageData({
      title: 'Order Setting',
      navArray: [
        { name: 'Settings', url: `/settings` },
        {
          name: 'Order Setting',
          url: 'https://www.youtube.com/embed/vcn15ymZp3g',
        },
      ],
    });
  }

  /**
   * FORMS METHODS
   * initFormGroup()
   * setFormData()
   * onSubmit()
   */
  private initFormGroup() {
    this.dataForm = this.fb.group({
      isEnableOrderNote: [false],
      isSLEnable: [true],
      isProductSkuEnable: [false],
      isEnableOtp: [false],
      appEmail: [null],
      appPassword: [null],
      isEnablePersonalNotification: [false],
      isEnableSMSNotification: [false],
      isEnableEmailNotification: [false],
      isEnablePrescriptionOrder: [false],
      isEnableIncompleteOrder: [false],
      orderPhoneValidation: [false],
      isEnableHomeRecentOrder: [false],
      isSwapPaymentAndOrderItem: [false],
      isEnableOutsideBd: [false],
      isEnableSingleIpBlock: [false],
      isEnableIpWiseOrderLimitAndBlockTime: [false],
      isEnableOrderSuccessPageOrderId: [false],
      ipWiseOrderBlockTime: [null],
      ipWiseOrderLimit: [null],
      isEnablePreviousOrderCount: [false],
      isEnableCheckoutOrderModal: [false],
      maxLength: [null],
      minLength: [null],
      successPageMessage: [null],
      deliveryOptionType: this.fb.group({
        selection: ['division'],
      }),
      deliveryOptionTitle: [null],
      insideCityText: [null],
      outsideCityText: [null],
      isEnableCheckoutMessage: [false],
      checkoutMessage: [null],
    });
  }

  private setFormData() {
    let selection = this.orderSetting.deliveryOptionType
      ? this.orderSetting.deliveryOptionType?.isEnableDivision
        ? 'division'
        : this.orderSetting.deliveryOptionType
            .isEnableInsideCitySubAreaOutsideCity
        ? 'subArea'
        : 'insideCity'
      : 'division';

    // If subArea is selected but current shop is not allowed for subArea, reset to division
    if (selection === 'subArea' && !this.isAllowedShopForSubArea()) {
      selection = 'division';
    }

    // Check checkout message permission
    let isEnableCheckoutMessage =
      this.orderSetting?.orderSetting?.isEnableCheckoutMessage || false;
    let checkoutMessage =
      this.orderSetting?.orderSetting?.checkoutMessage || null;

    // If checkout message is enabled but current shop is not allowed, disable it
    if (isEnableCheckoutMessage && !this.isAllowedShopForCheckoutMessage()) {
      isEnableCheckoutMessage = false;
      checkoutMessage = null;
    }

    this.dataForm.patchValue({
      isEnableOrderNote: this.orderSetting.orderSetting.isEnableOrderNote,
      isEnableCheckoutOrderModal: this.orderSetting.orderSetting.isEnableCheckoutOrderModal,
      isEnablePrescriptionOrder:
        this.orderSetting.orderSetting.isEnablePrescriptionOrder,
      isSLEnable: this.orderSetting.orderSetting.isSLEnable,
      isProductSkuEnable: this.orderSetting.orderSetting.isProductSkuEnable,
      isEnableOrderSuccessPageOrderId:
        this.orderSetting.orderSetting.isEnableOrderSuccessPageOrderId,
      isEnableOtp: this.orderSetting.orderSetting.isEnableOtp,
      isEnableSingleIpBlock:
        this.orderSetting.orderSetting.isEnableSingleIpBlock,
      isEnableIpWiseOrderLimitAndBlockTime:
        this.orderSetting.orderSetting.isEnableIpWiseOrderLimitAndBlockTime,
      ipWiseOrderBlockTime: this.orderSetting.orderSetting.ipWiseOrderBlockTime,
      ipWiseOrderLimit: this.orderSetting.orderSetting.ipWiseOrderLimit,
      isEnablePreviousOrderCount:
        this.orderSetting.orderSetting.isEnablePreviousOrderCount,
      isEnableSMSNotification:
        this.orderSetting.orderNotification.isEnableSMSNotification,
      isEnableEmailNotification:
        this.orderSetting.orderNotification.isEnableEmailNotification,
      isEnablePersonalNotification:
        this.orderSetting.orderNotification.isEnablePersonalNotification,
      appEmail: this.orderSetting.orderNotification.appEmail,
      appPassword: this.orderSetting.orderNotification.appPassword,
      isEnableIncompleteOrder:
        this.orderSetting.incompleteOrder.isEnableIncompleteOrder,
      isEnableHomeRecentOrder:
        this.orderSetting.orderSetting.isEnableHomeRecentOrder,
      isEnableOutsideBd:
        this.orderSetting?.orderPhoneValidation?.isEnableOutsideBd,
      maxLength: this.orderSetting?.orderPhoneValidation?.maxLength,
      minLength: this.orderSetting?.orderPhoneValidation?.minLength,
      isSwapPaymentAndOrderItem:
        this.orderSetting?.orderSetting.isSwapPaymentAndOrderItem,
      successPageMessage:
        this.orderSetting?.orderSetting?.successPageMessage || null,
      deliveryOptionType: {
        selection: selection,
      },
      deliveryOptionTitle:
        this.orderSetting?.deliveryOptionType?.deliveryOptionTitle,
      insideCityText: this.orderSetting?.deliveryOptionType?.insideCityText,
      outsideCityText: this.orderSetting?.deliveryOptionType?.outsideCityText,
      subAreaText: this.orderSetting?.deliveryOptionType?.subAreaText,
      isEnableCheckoutMessage: isEnableCheckoutMessage,
      checkoutMessage: checkoutMessage,
    });
  }

  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.message('Please complete all the required fields', 'warn');
      return;
    }

    const deliveryType = this.dataForm.value.deliveryOptionType.selection;

    const mData = {
      orderSetting: {
        isEnableOrderNote: this.dataForm.value.isEnableOrderNote,
        isEnableCheckoutOrderModal: this.dataForm.value.isEnableCheckoutOrderModal,
        isEnablePrescriptionOrder:
          this.dataForm.value.isEnablePrescriptionOrder,
        isSLEnable: this.dataForm.value.isSLEnable,
        isProductSkuEnable: this.dataForm.value.isProductSkuEnable,
        isEnableOrderSuccessPageOrderId:
          this.dataForm.value.isEnableOrderSuccessPageOrderId,
        isEnableOtp: this.dataForm.value.isEnableOtp,
        isDisableInvoicePriceSection:
          this.dataForm.value.isDisableInvoicePriceSection,
        isEnableHomeRecentOrder: this.dataForm.value.isEnableHomeRecentOrder,
        isSwapPaymentAndOrderItem:
          this.dataForm.value.isSwapPaymentAndOrderItem,
        isEnablePreviousOrderCount:
          this.dataForm.value.isEnablePreviousOrderCount,
        isEnableSingleIpBlock: this.dataForm.value.isEnableSingleIpBlock,
        isEnableIpWiseOrderLimitAndBlockTime:
          this.dataForm.value.isEnableIpWiseOrderLimitAndBlockTime,
        ipWiseOrderBlockTime: this.dataForm.value.ipWiseOrderBlockTime,
        ipWiseOrderLimit: this.dataForm.value.ipWiseOrderLimit,
        successPageMessage: this.dataForm.value.successPageMessage,
        isEnableCheckoutMessage: this.dataForm.value.isEnableCheckoutMessage,
        checkoutMessage: this.dataForm.value.checkoutMessage,
      },
      orderNotification: {
        isEnableSMSNotification: this.dataForm.value.isEnableSMSNotification,
        isEnableEmailNotification:
          this.dataForm.value.isEnableEmailNotification,
        isEnablePersonalNotification:
          this.dataForm.value.isEnablePersonalNotification,
        appEmail: this.dataForm.value.appEmail,
        appPassword: this.dataForm.value.appPassword,
      },
      incompleteOrder: {
        isEnableIncompleteOrder: this.dataForm.value.isEnableIncompleteOrder,
      },
      orderPhoneValidation: {
        isEnableOutsideBd: this.dataForm.value.isEnableOutsideBd,
        maxLength: this.dataForm.value.maxLength,
        minLength: this.dataForm.value.minLength,
      },
      deliveryOptionType: {
        isEnableDivision: deliveryType === 'division',
        isEnableInsideCityOutsideCity: deliveryType === 'insideCity',
        isEnableInsideCitySubAreaOutsideCity: deliveryType === 'subArea',
        deliveryOptionTitle: this.dataForm.value.deliveryOptionTitle,
        insideCityText: this.dataForm.value.insideCityText,
        outsideCityText: this.dataForm.value.outsideCityText,
        subAreaText: this.dataForm.value.subAreaText,
      },
    };

    this.addSetting(mData);
  }

  /**
   * HTTP REQ HANDLE
   * getSetting()
   * addSetting()
   */

  private getSetting() {
    const subscription = this.settingService
      .getSetting(
        'orderPhoneValidation productSetting orderSetting deliveryOptionType orderNotification incompleteOrder currency country'
      )
      .subscribe({
        next: (res) => {
          if (res.data && res.data.orderSetting) {
            this.orderSetting = res.data;
            this.setFormData();

            this.countryService.setShopCountryInfo(res.data);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });

    this.subscriptions.push(subscription);
  }

  private addSetting(data: any) {
    const subscription = this.settingService.addSetting(data).subscribe({
      next: (res) => {
        this.uiService.message(res.message, 'success');
        this.reloadService.needRefreshIncompleteOrder$();
        this.getSetting();
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.subscriptions.push(subscription);
  }

  get csvUrl() {
    return `${
      environment.ftpBaseLink
    }/upload/csv/${this.vendorService.getShopId()}/datafeed.csv`;
  }

  onCopyCsv() {
    this.clipboard.copy(this.csvUrl);
    this.uiService.message('Url Copied!', 'success');
  }

  isAllowedShop(): boolean {
    const id = this.vendorService.getShopId();
    return !!id && this.allowedShopIds.includes(id);
  }

  isAllowedShopForSubArea(): boolean {
    const id = this.vendorService.getShopId();
    return !!id && this.allowedShopIdSubArea.includes(id);
  }

  isAllowedShopForCheckoutMessage(): boolean {
    const id = this.vendorService.getShopId();
    return !!id && this.allowedShopIdsCheckoutNote.includes(id);
  }

  private checkSubAreaPermission(): void {
    // If current shop is not allowed for subArea and form has subArea selected, reset to division
    if (
      !this.isAllowedShopForSubArea() &&
      this.dataForm?.get('deliveryOptionType')?.get('selection')?.value ===
        'subArea'
    ) {
      this.dataForm
        .get('deliveryOptionType')
        ?.get('selection')
        ?.setValue('division');
    }
  }

  private checkCheckoutMessagePermission(): void {
    // If current shop is not allowed for checkout message and form has it enabled, disable it
    if (
      !this.isAllowedShopForCheckoutMessage() &&
      this.dataForm?.get('isEnableCheckoutMessage')?.value === true
    ) {
      this.dataForm.get('isEnableCheckoutMessage')?.setValue(false);
      this.dataForm.get('checkoutMessage')?.setValue(null);
    }
  }

  /**
   * Insert placeholder into the success page message
   */
  insertPlaceholder(placeholder: string) {
    const currentValue = this.dataForm.get('successPageMessage')?.value || '';
    const newValue = currentValue + placeholder;
    this.dataForm.get('successPageMessage')?.setValue(newValue);
  }

  /**
   * Insert sample message with placeholders
   */
  insertSampleMessage() {
    const sampleMessage = `
      <h2>THANK YOU</h2>
      <h3>YOUR ORDER IS PLACED</h3>
      <p>We received your order and will begin processing it soon. Your order information appears below.</p>
      <p>Your order Number {{orderId}}</p>
    `;
    this.dataForm.get('successPageMessage')?.setValue(sampleMessage);
  }

  //   nsertSampleMessage() {
  //     const sampleMessage = `
  //       <h2>🎉 Order Placed Successfully!</h2>
  //       <p>Dear {{CUSTOMER_NAME}},</p>
  //       <p>Thank you for your order! Your order ID is <strong>{{ORDER_ID}}</strong></p>
  // <!--      <p><strong>Order Details:</strong></p>-->
  // <!--      <ul>-->
  // <!--        <li>Order Date: {{ORDER_DATE}} at {{ORDER_TIME}}</li>-->
  // <!--        <li>Total Amount: {{TOTAL_AMOUNT}}</li>-->
  // <!--        <li>Payment Method: {{PAYMENT_METHOD}}</li>-->
  // <!--        <li>Delivery Address: {{DELIVERY_ADDRESS}}</li>-->
  // <!--      </ul>-->
  // <!--      <p>We will contact you at {{CUSTOMER_PHONE}} for delivery updates.</p>-->
  //       <p>Thank you for shopping with {{SHOP_NAME}}!</p>
  //     `;
  //     this.dataForm.get('successPageMessage')?.setValue(sampleMessage);
  //   }

  /**
   * On Click
   * openYoutubeVideoDialog()
   */
  public openYoutubeVideoDialog(event: MouseEvent, url: string) {
    if (url == null) {
      this.uiService.message('There is no video', 'warn');
      return;
    }
    event.stopPropagation();
    const dialogRef = this.dialog.open(YoutubeVideoShowComponent, {
      data: { url: url },
      panelClass: ['theme-dialog', 'no-padding-dialog'],
      width: '98%',
      maxWidth: '700px',
      height: 'auto',
      maxHeight: '100vh',
      autoFocus: false,
      disableClose: false,
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult && dialogResult.data) {
      }
    });
  }

  /**
   * ON Destroy
   */
  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub?.unsubscribe());
  }

  protected readonly onchange = onchange;
}
