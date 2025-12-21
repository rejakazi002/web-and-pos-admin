import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { SMS_PROVIDERS } from '../../../core/utils/app-data';
import { Select } from '../../../interfaces/core/select';
import { SettingService } from '../../../services/common/setting.service';
import { CountryService } from '../../../services/core/country.service';
import { PageDataService } from '../../../services/core/page-data.service';
import { UiService } from '../../../services/core/ui.service';

@Component({
  selector: 'app-sms-api',
  templateUrl: './sms.component.html',
  styleUrl: './sms.component.scss',
})
export class SmsComponent implements OnInit, OnDestroy {
  // Store Data
  readonly allSmsProviders: Select[] = SMS_PROVIDERS; // store all for reuse
  smsProviders: Select[] = [];
  protected smsSendingOption: any = {
    orderPlaced: false,
    orderConfirmed: false,
    orderDelivered: false,
    orderCanceled: false,
    adminNotification: false,
  };

  // SMS Custom Messages
  protected smsCustomMessages: any = {
    orderPlaced: '',
    orderConfirmed: '',
    orderDelivered: '',
    orderCanceled: '',
    adminNotification: '',
  };

  // Character counting for SMS
  protected smsCharacterCounts: any = {
    orderPlaced: 0,
    orderConfirmed: 0,
    orderDelivered: 0,
    orderCanceled: 0,
    adminNotification: 0,
  };

  protected smsPartCounts: any = {
    orderPlaced: 0,
    orderConfirmed: 0,
    orderDelivered: 0,
    orderCanceled: 0,
    adminNotification: 0,
  };

  // Dynamic Tags for SMS
  protected dynamicTags = [
    {
      key: '{OrderId}',
      label: 'Order ID',
      icon: 'tag',
      tooltip: 'Order ID (e.g., #ORD123456)',
    },
    {
      key: '{ProductName}',
      label: 'Product Name',
      icon: 'shopping_bag',
      tooltip: 'Product names (e.g., iPhone 15, AirPods Pro)',
    },
    {
      key: '{EstimateDelivery}',
      label: 'Estimate Delivery',
      icon: 'local_shipping',
      tooltip: 'Delivery date (e.g., 25/12/2024)',
    },
    {
      key: '{CustomerName}',
      label: 'Customer Name',
      icon: 'person',
      tooltip: 'Customer name (e.g., John Doe)',
    },
    {
      key: '{CustomerPhone}',
      label: 'Customer Phone',
      icon: 'phone',
      tooltip: 'Customer phone number (e.g., +8801712345678)',
    },
    {
      key: '{ShopName}',
      label: 'Shop Name',
      icon: 'store',
      tooltip: 'Your shop name (e.g., TechStore BD)',
    },
    {
      key: '{OrderTotal}',
      label: 'Order Total',
      icon: 'payments',
      tooltip: 'Order amount (e.g., ৳2,500)',
    },
  ];

  // Admin-specific dynamic tags
  protected adminDynamicTags = [
    {
      key: '{OrderId}',
      label: 'Order ID',
      icon: 'tag',
      tooltip: 'Order ID (e.g., #ORD123456)',
    },
    {
      key: '{ProductName}',
      label: 'Product Name',
      icon: 'shopping_bag',
      tooltip: 'Product names (e.g., iPhone 15, AirPods Pro)',
    },
    {
      key: '{CustomerName}',
      label: 'Customer Name',
      icon: 'person',
      tooltip: 'Customer name (e.g., John Doe)',
    },
    {
      key: '{CustomerPhone}',
      label: 'Customer Phone',
      icon: 'phone',
      tooltip: 'Customer phone number (e.g., +8801712345678)',
    },
    {
      key: '{ShopName}',
      label: 'Shop Name',
      icon: 'store',
      tooltip: 'Your shop name (e.g., TechStore BD)',
    },
    {
      key: '{OrderTotal}',
      label: 'Order Total',
      icon: 'payments',
      tooltip: 'Order amount (e.g., ৳2,500)',
    },
    {
      key: '{VendorName}',
      label: 'Vendor Name',
      icon: 'business',
      tooltip: 'Vendor name (e.g., TechStore BD)',
    },
    {
      key: '{OrderStatus}',
      label: 'Order Status',
      icon: 'info',
      tooltip: 'Order status (e.g., Pending, Confirmed, Delivered)',
    },
    {
      key: '{OrderDate}',
      label: 'Order Date',
      icon: 'calendar_today',
      tooltip: 'Order date (e.g., 25/12/2024)',
    },
  ];

  // Track expanded sections
  protected expandedSections: any = {
    orderPlaced: false,
    orderConfirmed: false,
    orderDelivered: false,
    orderCanceled: false,
    adminNotification: false,
  };

  // Track unsaved changes
  protected hasUnsavedChanges: boolean = false;
  protected isSavingCustomMessages: boolean = false;

  smsMethods: any[] = [];
  selectedIndex: number;
  formViewMode: 'add' | 'edit' | '' = '';
  isLoading: boolean = false;
  country: any;
  orderNotification: any;

  // Data Form
  dataForm?: FormGroup;

  // Inject
  private readonly fb = inject(FormBuilder);
  private readonly uiService = inject(UiService);
  private readonly settingService = inject(SettingService);
  private readonly title = inject(Title);
  private readonly pageDataService = inject(PageDataService);
  private readonly countryService = inject(CountryService);

  // Subscriptions
  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.countryService.getShopCountryInfo().subscribe((setting) => {
      this.country = setting?.country?.name || 'Bangladesh';
      if (this.country) {
        // Filter delivery types based on country
        this.filterSmsProviderByCountry();
      }
    });
    // Init Data Form
    this.initFormGroup();

    // Base Data
    this.setPageData();
    this.getSetting();
  }

  private filterSmsProviderByCountry(): void {
    if (!this.country || this.country === 'Bangladesh') {
      // If no country OR country is Bangladesh ➜ show Bangladesh providers
      this.smsProviders = this.allSmsProviders.filter(
        (provider) => provider.country === 'Bangladesh'
      );
    } else {
      // Otherwise ➜ show international providers only
      this.smsProviders = this.allSmsProviders.filter(
        (provider) => provider.country === 'international'
      );
    }
  }

  /**
   * Page Data
   * setPageData()
   */
  private setPageData(): void {
    this.title.setTitle('SMS Methods');
    this.pageDataService.setPageData({
      title: 'SMS Methods',
      navArray: [
        { name: 'Settings', url: `/settings` },
        { name: 'SMS Methods', url: null },
      ],
    });
  }

  /**
   * FORMS METHODS
   * initFormGroup()
   * onSubmit()
   */
  private initFormGroup() {
    this.dataForm = this.fb.group({
      providerName: [null, Validators.required],
      senderId: [null],
      secretKey: [null],
      apiKey: [null],
      clientId: [null],
      username: [null],
      password: [null],
      status: [null],
    });
  }

  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.message('Please complete all the required fields', 'warn');
      return;
    }

    if (this.formViewMode === 'add') {
      const data = {
        ...this.dataForm.value,
        ...{
          status: !this.smsMethods.length ? 'active' : 'inactive',
        },
      };
      this.smsMethods.push(data);
      this.selectedIndex = this.smsMethods.length - 1;
      this.addSetting();
    } else if (this.formViewMode === 'edit') {
      const fIndex = this.smsMethods.findIndex(
        (f) => f.providerName === this.dataForm.value.providerName
      );
      this.smsMethods[fIndex] = {
        ...this.smsMethods[fIndex],
        ...this.dataForm.value,
      };
      this.addSetting();
    }
  }

  /**
   * HTTP REQ HANDLE
   * addSetting()
   * getSetting()
   */

  private getSetting() {
    const subscription = this.settingService
      .getSetting('smsMethods smsSendingOption smsCustomMessages orderNotification')
      .subscribe({
        next: (res) => {
          if (res.data && res.data.smsMethods) {
            this.smsMethods = res.data.smsMethods;
            this.orderNotification = res.data.orderNotification;
            if (res.data.smsSendingOption) {
              this.patchSmsSendingOption(res.data.smsSendingOption);
            }
            if (res.data.smsCustomMessages) {
              this.patchSmsCustomMessages(res.data.smsCustomMessages);
            }
            // console.log('res.data.smsCustomMessages',res.data.smsCustomMessages)
            // if (this.smsMethods.length) {
            //   this.onSelectItem(0);
            // }

            if (this.smsMethods.length) {
              // 👉 Active থাকলে সেটি select হবে
              const activeIndex = this.smsMethods.findIndex(
                (m) => m.status === 'active'
              );
              if (activeIndex !== -1) {
                this.onSelectItem(activeIndex);
              } else {
                this.onSelectItem(0);
              }
            }
          }
        },
        error: (err) => {
          console.log(err);
        },
      });

    this.subscriptions.push(subscription);
  }

  private addSetting(others?: any) {
    this.isLoading = true;
    const data = {
      smsMethods: this.smsMethods,
    };

    const subscription = this.settingService
      .addSetting(others ?? data)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.success) {
            this.uiService.message(res.message, 'success');
          } else {
            this.uiService.message(res.message, 'warn');
          }

          if (this.formViewMode === 'add') {
            this.formViewMode = '';
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.log(err);
        },
      });
    this.subscriptions.push(subscription);
  }

  /**
   * UI Logics
   * onAddNewPaymentType()
   * toggleCheckbox()
   * onSelectItem()
   * isDisabledOpt()
   */
  onAddNewPaymentType() {
    this.formViewMode = 'add';
    const missingTypes = this.smsProviders.filter(
      (f) => !this.smsMethods.some((charge) => charge.providerName === f.value)
    );
    this.dataForm.reset();
    if (!missingTypes.length) {
      this.dataForm.patchValue({ providerName: this.smsProviders[0].value });
    } else {
      this.dataForm.patchValue({ providerName: missingTypes[0].value });
    }
  }

  // toggleCheckbox(index: number): void {
  //   this.smsMethods.forEach((method, i) => {
  //     method.status = i === index ? 'active' : 'inactive';
  //   });
  //   this.onSelectItem(index);
  //   this.addSetting();
  // }

  toggleCheckbox(index: number): void {
    this.smsMethods.forEach((method, i) => {
      method.status = i === index ? 'active' : 'inactive';
    });
    this.onSelectItem(index);
    this.addSetting();
  }

  onSelectItem(index: number) {
    this.formViewMode = 'edit';
    this.selectedIndex = index;
    this.dataForm.patchValue(this.smsMethods[this.selectedIndex]);
  }

  isDisabledOpt(value: string): boolean {
    return this.smsMethods.some((charge) => charge.providerName === value);
  }

  /**
   * Checkbox Object Control
   * smsOptionKeys()
   * formatLabel()
   * onSmsSendingOptChange()
   * patchSmsSendingOption()
   */

  get smsOptionKeys() {
    return Object.keys(this.smsSendingOption);
  }

  formatLabel(key: string): string {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  }

  onSmsSendingOptChange() {
    this.addSetting({ smsSendingOption: this.smsSendingOption });
  }

  private patchSmsSendingOption(apiData: any): void {
    Object.keys(this.smsSendingOption).forEach((key) => {
      if (apiData.hasOwnProperty(key)) {
        this.smsSendingOption[key] = apiData[key];
      }
    });
  }

  /**
   * Custom Message Methods
   * toggleSection()
   * insertTag()
   * onCustomMessageChange()
   * patchSmsCustomMessages()
   * getPreviewMessage()
   */

  toggleSection(key: string): void {
    this.expandedSections[key] = !this.expandedSections[key];
  }

  insertTag(key: string, tag: string): void {
    const currentMessage = this.smsCustomMessages[key] || '';
    this.smsCustomMessages[key] = currentMessage + tag;
    this.calculateSmsStats(key);
    this.hasUnsavedChanges = true;
  }

  onCustomMessageChange(key?: string): void {
    if (key) {
      this.calculateSmsStats(key);
    }
    this.hasUnsavedChanges = true;
  }

  /**
   * Save custom messages manually
   */
  saveCustomMessages(): void {
    this.isSavingCustomMessages = true;

    const data = {
      smsSendingOption: this.smsSendingOption,
      smsCustomMessages: this.smsCustomMessages,
    };

    const subscription = this.settingService.addSetting(data).subscribe({
      next: (res) => {
        this.isSavingCustomMessages = false;
        if (res.success) {
          this.hasUnsavedChanges = false;
          this.uiService.message('SMS messages saved successfully', 'success');
        } else {
          this.uiService.message(res.message, 'warn');
        }
      },
      error: (err) => {
        this.isSavingCustomMessages = false;
        this.uiService.message('Failed to save messages', 'wrong');
        console.log(err);
      },
    });

    this.subscriptions.push(subscription);
  }

  /**
   * Calculate SMS character count and parts
   */
  calculateSmsStats(key: string): void {
    const message = this.smsCustomMessages[key] || '';
    const previewMessage = this.getPreviewMessage(message);
    const length = previewMessage.length;

    this.smsCharacterCounts[key] = length;

    // Calculate SMS parts based on character count
    // Standard SMS: 160 chars per part
    // Unicode SMS (with special chars): 70 chars per part
    const hasUnicode = /[^\x00-\x7F]/.test(previewMessage);
    const singleSmsLimit = hasUnicode ? 70 : 160;
    const multiSmsLimit = hasUnicode ? 67 : 153;

    if (length === 0) {
      this.smsPartCounts[key] = 0;
    } else if (length <= singleSmsLimit) {
      this.smsPartCounts[key] = 1;
    } else {
      this.smsPartCounts[key] = Math.ceil(length / multiSmsLimit);
    }
  }

  /**
   * Get character count color class
   */
  getCharCountClass(key: string): string {
    const count = this.smsCharacterCounts[key];
    if (count === 0) return 'char-count-empty';
    if (count < 160) return 'char-count-good';
    if (count <= 320) return 'char-count-warning';
    return 'char-count-danger';
  }

  /**
   * Get SMS part count label
   */
  getSmsPartLabel(key: string): string {
    const parts = this.smsPartCounts[key];
    if (parts === 0) return '';
    if (parts === 1) return '1 SMS';
    return `${parts} SMS Parts`;
  }

  getPreviewMessage(template: string): string {
    if (!template || template.trim() === '') {
      return '';
    }

    return template
      .replace(/{OrderId}/g, '#ORD123456')
      .replace(/{ProductName}/g, 'iPhone 15, AirPods Pro')
      .replace(/{EstimateDelivery}/g, '25/12/2024')
      .replace(/{CustomerName}/g, 'John Doe')
      .replace(/{CustomerPhone}/g, '+8801712345678')
      .replace(/{ShopName}/g, 'TechStore BD')
      .replace(/{OrderTotal}/g, '৳2,500')
      .replace(/{VendorName}/g, 'TechStore BD')
      .replace(/{OrderStatus}/g, 'Pending')
      .replace(/{OrderDate}/g, '25/12/2024');
  }

  /**
   * Get dynamic tags based on notification type
   */
  getDynamicTags(key: string): any[] {
    if (key === 'adminNotification') {
      return this.adminDynamicTags;
    }
    return this.dynamicTags;
  }

  private patchSmsCustomMessages(apiData: any): void {
    if (apiData) {
      Object.keys(this.smsCustomMessages).forEach((key) => {
        if (apiData.hasOwnProperty(key)) {
          this.smsCustomMessages[key] = apiData[key];
          // Calculate stats for loaded messages
          this.calculateSmsStats(key);
        }
      });
    }
  }

  /**
   * ON Destroy
   */
  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub?.unsubscribe());
  }
}
