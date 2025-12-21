import { DatePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { OVERVIEW_FILTER } from '../../../core/utils/app-data';
import { ShopInformation } from '../../../interfaces/common/shop-information.interface';
import { Select } from '../../../interfaces/core/select';
import { FilterData } from '../../../interfaces/gallery/filter-data';
import { DashboardService } from '../../../services/common/dashboard.service';
import {
  ShopPackageInfo,
  ShopPackageService,
} from '../../../services/core/shop-package.service';
import { UtilsService } from '../../../services/core/utils.service';
import { VendorService } from '../../../services/vendor/vendor.service';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrl: './dashboard-card.component.scss',
  providers: [DatePipe],
})
export class DashboardCardComponent implements OnInit, OnDestroy {
  allowedShopIds = ['67de7097554f668b2dc66444', '679511745a429b7bb55421c4'];
  // Store Data

  private readonly NOTICE_HIDDEN_KEY = 'expire_notice_hidden';
  dashboardData: any;
  courierData: any;
  totalOrder: any;
  totalOrderCheckoutDate: any;
  totalProducts: any;
  defaultFilter: any;
  filter: any;
  isExpire: boolean = false;
  showExpireNotice: boolean = false;
  shopInfo: ShopInformation;
  shopPackageInfo: ShopPackageInfo | null = null;
  paymentBaseLink = environment.paymentBaseLink;
  protected readonly environment = environment;
  protected readonly overviewFilters: Select[] = OVERVIEW_FILTER;
  isDataLoaded: boolean = false;
  vendorId: any;

  // Active Filter Data
  selectedOverviewFilter: Select = null;

  // Date Filter
  today = new Date();
  dataFormDateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  // Inject
  private readonly dashboardService = inject(DashboardService);
  private readonly utilsService = inject(UtilsService);
  private readonly datePipe = inject(DatePipe);
  private readonly vendorService = inject(VendorService);
  private readonly shopPackageService = inject(ShopPackageService);
  protected readonly router = inject(Router);

  // Subscriptions
  private subscriptions: Subscription[] = [];
  private timeoutId: any;

  ngOnInit() {
    this.setDefaultFilter();
    this.getVendorDashboard();
    this.getDashboardProductCountByVendor();

    const sub = this.shopPackageService.shopPackageInfo$.subscribe((info) => {
      this.shopPackageInfo = info;

      const isNoticeHidden =
        sessionStorage.getItem(this.NOTICE_HIDDEN_KEY) === 'true';

      // Detect the default value emitted by the BehaviorSubject
      const isDefault =
        info &&
        info.currentBalance === 0 &&
        info.expireDay === 0 &&
        info.trialPeriod === 0 &&
        info.shopType === 'free';

      this.isExpire = Boolean(
        !isDefault &&
          this.shopPackageInfo &&
          this.shopPackageInfo.expireDay >= 0 &&
          this.shopPackageInfo.expireDay <= 3
      );

      this.showExpireNotice = !isNoticeHidden && this.isExpire;

      this.isDataLoaded = true;
    });

    this.subscriptions.push(sub);
  }

  /**
   * HTTP Req Handle
   * getVendorDashboard()
   */

  private getVendorDashboard() {
    const filterData: FilterData = {
      pagination: null,
      filter: this.filter,
    };

    const sub = this.dashboardService
      .getAllDashboardOrders(filterData, null)
      .subscribe({
        next: (res) => {
          this.dashboardData = res.data;
          this.courierData = res.courier;
          this.totalOrder = res.totalOrder;
          this.totalOrderCheckoutDate = res.totalOrderCheckoutDate;
        },
        error: (err) => {
          console.error('Error fetching dashboard orders:', err);
        },
      });

    this.subscriptions.push(sub);
  }

  private getDashboardProductCountByVendor() {
    const sub = this.dashboardService
      .getDashboardProductCountByVendor()
      .subscribe({
        next: (res) => {
          // this.dashboardCategoryData = res.data;
          // this.chartFunctionality();
          this.totalProducts = res.data.totalProducts;
        },
        error: (err) => {
          console.error('Error fetching product count:', err);
        },
      });

    this.subscriptions.push(sub);
  }

  /**
   * Filter
   * setDefaultFilter()
   * endChangeRegDateRange()
   * onFilterChange()
   * isFilterChange()
   * dateFilterTitle()
   * onClearFilter()
   */
  private setDefaultFilter() {
    this.selectedOverviewFilter = this.overviewFilters[0];

    const startDate = this.utilsService.getDateString(new Date());
    const endDate = this.utilsService.getDateString(new Date());

    this.defaultFilter = { checkoutDate: { $gte: startDate, $lte: endDate } };
    this.filter = this.defaultFilter;
  }

  endChangeRegDateRange(event: MatDatepickerInputEvent<any>) {
    if (event.value) {
      const startDate = this.utilsService.getDateString(
        this.dataFormDateRange.value.start
      );
      const endDate = this.utilsService.getDateString(
        this.dataFormDateRange.value.end
      );
      this.filter = { checkoutDate: { $gte: startDate, $lte: endDate } };
      // Re fetch Data
      this.getVendorDashboard();
    }
  }

  onFilterChange(type: 'overviewFilter', value: string) {
    if (type === 'overviewFilter') {
      this.selectedOverviewFilter = this.overviewFilters.find(
        (f) => f.value === value
      );
      let startDate: string, endDate: string;
      const today = new Date();
      switch (value) {
        case 'today':
          startDate = this.utilsService.getDateString(new Date());
          endDate = this.utilsService.getDateString(new Date());
          // this.filter = {checkoutDate: {$gte: startDate, $lte: endDate}};
          this.filter = { checkoutDate: { $gte: startDate, $lte: endDate } };
          break;
        case 'lastDays':
          const yesterday = new Date(today.setDate(today.getDate() - 1));
          startDate = this.utilsService.getDateString(yesterday);
          endDate = this.utilsService.getDateString(yesterday);
          this.filter = { checkoutDate: { $gte: startDate, $lte: endDate } };
          break;
        case 'thisWeek':
          const currentWeekDay = today.getDay(); // 0 (Sun) - 6 (Sat)
          const daysSinceSaturday = (currentWeekDay + 1) % 7; // 0 if Sat, 1 if Sun, ..., 6 if Fri
          const startOfWeek = new Date(
            today.setDate(today.getDate() - daysSinceSaturday)
          );
          startDate = this.utilsService.getDateString(startOfWeek);
          endDate = this.utilsService.getDateString(new Date());
          this.filter = { checkoutDate: { $gte: startDate, $lte: endDate } };
          break;
        case 'lastWeek': {
          const today = new Date();
          const currentDay = today.getDay(); // 0 = Sunday, 6 = Saturday

          // Calculate current week's Saturday (most recent past Saturday)
          const daysSinceSaturday = (currentDay + 1) % 7;
          const mostRecentSaturday = new Date(today);
          mostRecentSaturday.setDate(today.getDate() - daysSinceSaturday);
          mostRecentSaturday.setHours(0, 0, 0, 0);

          // Calculate last week's range (Saturday to Friday)
          const lastWeekStart = new Date(mostRecentSaturday);
          lastWeekStart.setDate(mostRecentSaturday.getDate() - 7);

          const lastWeekEnd = new Date(lastWeekStart);
          lastWeekEnd.setDate(lastWeekStart.getDate() + 6);

          startDate = this.utilsService.getDateString(lastWeekStart);
          endDate = this.utilsService.getDateString(lastWeekEnd);

          this.filter = { checkoutDate: { $gte: startDate, $lte: endDate } };
          break;
        }
        case 'last7Days':
          // আজকের দিন সহ 7 দিন (20, 19, 18, 17, 16, 15, 14)
          const start7Days = new Date();
          start7Days.setDate(start7Days.getDate() - 6); // 6 দিন আগে থেকে শুরু
          const end7Days = new Date(); // আজকের দিন
          startDate = this.utilsService.getDateString(start7Days);
          endDate = this.utilsService.getDateString(end7Days);
          this.filter = { checkoutDate: { $gte: startDate, $lte: endDate } };
          break;

        case 'last15Days': {
          // আজকের দিন সহ 15 দিন
          const start15Days = new Date();
          start15Days.setDate(start15Days.getDate() - 14); // 14 দিন আগে থেকে শুরু
          const end15Days = new Date(); // আজকের দিন
          startDate = this.utilsService.getDateString(start15Days);
          endDate = this.utilsService.getDateString(end15Days);
          this.filter = { checkoutDate: { $gte: startDate, $lte: endDate } };
          break;
        }

        case 'last30Days': {
          // আজকের দিন সহ 30 দিন
          const start30Days = new Date();
          start30Days.setDate(start30Days.getDate() - 29); // 29 দিন আগে থেকে শুরু
          const end30Days = new Date(); // আজকের দিন
          startDate = this.utilsService.getDateString(start30Days);
          endDate = this.utilsService.getDateString(end30Days);
          this.filter = { checkoutDate: { $gte: startDate, $lte: endDate } };
          break;
        }

        case 'thisMonth':
          // বর্তমান ক্যালেন্ডার মাস (1 তারিখ থেকে আজ পর্যন্ত)
          startDate = this.utilsService.getDateString(
            new Date(today.getFullYear(), today.getMonth(), 1)
          );
          endDate = this.utilsService.getDateString(today);
          this.filter = { checkoutDate: { $gte: startDate, $lte: endDate } };
          break;

        case 'lastMonth':
          // গত ক্যালেন্ডার মাস (1 তারিখ থেকে শেষ তারিখ পর্যন্ত)
          const lastMonth = new Date(
            today.getFullYear(),
            today.getMonth() - 1,
            1
          );
          const lastMonthEnd = new Date(
            today.getFullYear(),
            today.getMonth(),
            0
          ); // গত মাসের শেষ দিন
          startDate = this.utilsService.getDateString(lastMonth);
          endDate = this.utilsService.getDateString(lastMonthEnd);
          this.filter = { checkoutDate: { $gte: startDate, $lte: endDate } };
          break;
        default:
          startDate = this.utilsService.getDateString(new Date());
          endDate = this.utilsService.getDateString(new Date());
          this.filter = { checkoutDate: { $gte: startDate, $lte: endDate } };
          break;
      }
    }

    // Fetch Data
    this.getVendorDashboard();
  }

  get isFilterChange(): boolean {
    if (!this.filter) {
      return false;
    } else {
      return !this.utilsService.checkObjectDeepEqual(
        this.defaultFilter,
        this.filter
      );
    }
  }

  get dateFilterTitle() {
    if (
      this.dataFormDateRange.get('start').value &&
      this.dataFormDateRange.get('end').value
    ) {
      const startDate = this.datePipe.transform(
        this.dataFormDateRange.get('start').value,
        'mediumDate'
      );
      const endDate = this.datePipe.transform(
        this.dataFormDateRange.get('end').value,
        'mediumDate'
      );
      if (startDate === endDate) {
        return endDate;
      } else {
        return startDate + '-' + endDate;
      }
    } else {
      return 'Filter in Date';
    }
  }

  onClearFilter() {
    this.dataFormDateRange.reset();
    this.setDefaultFilter();
    this.getVendorDashboard();
  }

  /**
   * Access Control
   * isAccess()
   */
  isAccess(type: string): boolean {
    const isExist = this.vendorService.userMenu.find(
      (f) => f.routerLink === type
    );
    return !!isExist;
  }

  isAllowedShop(): boolean {
    const id = this.vendorService.getShopId();
    return !!id && this.allowedShopIds.includes(id);
  }

  closeExpireNotice() {
    this.isExpire = false;
    this.showExpireNotice = false; // <-- Add this line
    sessionStorage.setItem(this.NOTICE_HIDDEN_KEY, 'true');
  }

  payNow() {
    const url = `${
      this.paymentBaseLink
    }/shop-payment/${this.vendorService.getShopId()}`;
    window.open(url, '_blank');
  }

  goToOrders(orderType: string = null, extraParams: any = {}) {
    let startDate: string, endDate: string;

    if (
      this.dataFormDateRange.value.start &&
      this.dataFormDateRange.value.end
    ) {
      startDate = this.utilsService.getDateString(
        this.dataFormDateRange.value.start
      );
      endDate = this.utilsService.getDateString(
        this.dataFormDateRange.value.end
      );
    } else if (this.filter && this.filter.checkoutDate) {
      startDate = this.filter.checkoutDate.$gte;
      endDate = this.filter.checkoutDate.$lte;
    } else {
      startDate = this.utilsService.getDateString(new Date());
      endDate = this.utilsService.getDateString(new Date());
    }

    const queryParams: any = {
      ...extraParams,
      startDate,
      endDate,
    };
    if (orderType) {
      queryParams.orderType = orderType;
    }
    this.router.navigate(['/order/all-order'], { queryParams });
  }

  /**
   * ON Destroy
   */

  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this.subscriptions.forEach((sub) => sub?.unsubscribe());

    // Clear Timeout
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}
