import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {registerLocaleData} from '@angular/common';
import localeBn from '@angular/common/locales/bn';
import {VendorService} from './services/vendor/vendor.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ShopPackageService} from './services/core/shop-package.service';
import {MatDialog} from '@angular/material/dialog';
import {ShopInformationService} from './services/common/shop-information.service';
import {
  SubscriptionExpireDialogComponent
} from './shared/dialog-view/subscription-expire-dialog/subscription-expire-dialog.component';
import {environment} from '../environments/environment';
import {Subscription, timer} from 'rxjs';
import {FilterData} from "./interfaces/gallery/filter-data";
import {ThemeService} from "./services/common/theme.service";
import {NewReleaseDialogComponent} from "./shared/dialog-view/new-release-dialog/new-release-dialog.component";
import {UiService} from "./services/core/ui.service";
import {CountryService} from "./services/core/country.service";
import {SettingService} from "./services/common/setting.service";
import {Setting} from "./interfaces/common/setting.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {

  // Select
  private readonly select: any = {
    name: 1,
    url: 1,
    note: 1,
    version: 1,
    createdAt: 1,
  }
  private readonly paymentBaseLink = environment.paymentBaseLink;
  private subscription: Subscription;
  protected loginSubscription: Subscription;
  // Store Data
  private setting: Setting;
  // Subscriptions
  private subscriptions: Subscription[] = [];

  private isReleaseDialogOpen = false;
  private isShopInfoLoaded = false;

  // Inject
  private readonly themeService = inject(ThemeService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly shopPackageService = inject(ShopPackageService);
  private readonly dialog = inject(MatDialog);
  private readonly shopInfoService = inject(ShopInformationService);
  private readonly vendorService = inject(VendorService);
  private readonly uiService = inject(UiService);
  private readonly settingService = inject(SettingService);
  private readonly countryService = inject(CountryService);

  constructor(
    private meta: Meta,
    private router: Router,

  ) {
    // Block search engine indexing
    this.googleNoIndex();
    // this.getSetting();
    // Register Bangla locale data
    registerLocaleData(localeBn, 'bn');

    // Attempt auto-login for user
    this.vendorService.autoUserLoggedIn();

    // Subscribe to login status changes
    this.loginSubscription = this.vendorService.getUserStatusListener().subscribe(
      (isLoggedIn) => {
        if (isLoggedIn) {
          this.handleUserLoggedIn('loginSubscription');
        }
      }
    );

    // If already logged in, initialize data
    if (this.vendorService.isUser) {
      this.handleUserLoggedIn('isUser');
    }

  }

  private handleUserLoggedIn(source: string): void {
    if (this.isShopInfoLoaded) {
      return;
    }

    this.isShopInfoLoaded = true;

    this.getShopInfo();
    this.getSetting();
    timer(5000).subscribe(() => {
      const storedId = localStorage.getItem('newReleaseId');
      if (!storedId) {
        this.getAllNewReleaseReport();
      }
    });

  }


  ngOnInit() {

    // Check My Session
    // this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd)
    // ).subscribe(() => {
    //   this.vendorService.checkMySession().subscribe({
    //     next: res => {
    //       if (!res.valid) {
    //         this.vendorService.logout();
    //         this.router.navigate(['/login']);
    //       }
    //     },
    //     error: err => {
    //       console.error('Session check failed:', err);
    //       this.uiService.message('Session validation failed. Please login again.', 'warn');
    //       // Fallback Logic 👉 ধরো server unreachable, তখনও logout করো
    //       this.vendorService.logout();
    //       this.router.navigate(['/login']);
    //     }
    //   });
    // });


    // this.getSetting();

    // console.log('App Component ngOnInit - Current login status:', this.vendorService.isUser);
    // Subscribe to shop package info changes
    this.subscription = this.shopPackageService.shopPackageInfo$.subscribe(info => {
      // Check if user is logged in before showing popup
      if (this.vendorService.isUser && info && info.expireDay < 0) {
        // console.log('Conditions met for popup - Opening...');
        this.openExpirePopup(info);
      }

    });
  }


  /**
   * HTTP Req Handle
   * getSetting()
   */

  private getSetting() {
    const subscription = this.settingService.getSetting('currency orderSetting productSetting  country -_id')
      .subscribe({
        next: (res) => {
          this.setting = res.data;
          if (this.setting.country) {
            this.countryService.setShopCountryInfo(this.setting);
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
    this.subscriptions?.push(subscription);
  }

  /**
   * HTTP REQ HANDLE
   * getAllNewReleaseReport()
   * getShopInfo()
   */

  private getAllNewReleaseReport() {

    // Only show new release dialog if deploymentType is 'default'
    if (environment.deploymentType !== 'default') {
      return;
    }

    if (this.isReleaseDialogOpen) {
      return;
    }

    const pagination: any = {
      pageSize: 2,
      currentPage: 1 - 1
    };


    const filterData: FilterData = {
      pagination: pagination,
      filter: {theme:this.vendorService.getThemeId()},
      select: this.select,
      sort: {createdAt: -1}
    }


    const subscription = this.themeService.getAllNewReleaseReport(filterData, null)
      .subscribe({
        next: res => {


          // this.totalData = res.count;

          // console.log("Received filter data", res.data);

          if (res.data?.length) {
            const latestRelease = res.data[0];
            const storedId = localStorage.getItem('newReleaseId');

            if (latestRelease?._id !== storedId) {
              this.isReleaseDialogOpen = true;  // 🔑 LOCK
              const dialogRef = this.dialog.open(NewReleaseDialogComponent, {
                width: '500px',
                data: latestRelease,
                panelClass: 'release-modal',
                disableClose: true
              });

              dialogRef.afterClosed().subscribe((confirmed: boolean) => {
                if (confirmed) {
                  localStorage.setItem('newReleaseId', latestRelease?._id);
                  this.isReleaseDialogOpen = false;  // 🔑 UNLOCK
                }
              });
            }
          }

        }, error: err => {
          // this.isLoadingData = false;
          console.log(err)
        }
      });
    this.subscriptions.push(subscription);
  }



  private getShopInfo() {
    // console.log('getShopInfo called');
    this.shopInfoService.getShopInformation().subscribe({
      next: (response: any) => {
        if (!response) {
          return;
        }

        const shopPackageInfo = {
          currentBalance: response.currentBalance ?? 0,
          expireDay: response.expireDay ?? 0,
          trialPeriod: response.fShopDomain?.trialPeriod ?? 0,
          shopType: response.shopType ?? 'free',
        };

        // console.log('Setting shop package info:', shopPackageInfo);
        this.shopPackageService.setShopPackageInfo(shopPackageInfo);
      },
      error: (err) => {
        console.error('Error fetching shop information:', err);
      }
    });
  }

  private openExpirePopup(shopPackageInfo: any) {
    // Only show subscription expire dialog if deploymentType is 'default'
    if (environment.deploymentType !== 'default') {
      return;
    }

    // console.log('Attempting to open popup with:', {
    //   expireDay: shopPackageInfo.expireDay,
    //   shopType: shopPackageInfo.shopType
    // });

    const dialogRef = this.dialog.open(SubscriptionExpireDialogComponent, {
      width: '600px',
      panelClass: 'subscription-expire-dialog',
      disableClose: true,
      data: {
        expireDays: Math.abs(shopPackageInfo.expireDay),
        shopType: shopPackageInfo.shopType ?? 'free',
      }
    });

    dialogRef.componentInstance.payClicked.subscribe(() => {
      this.payNow();
    });
  }

  private payNow() {
    const url = `${this.paymentBaseLink}/shop-payment/${this.vendorService.getShopId()}`;
    window.open(url, '_blank');
  }

  /**
   * SEO TITLE
   * SEO META TAGS
   */

  private googleNoIndex() {
    this.meta.updateTag({name: 'robots', content: 'noindex'});
    this.meta.updateTag({name: 'googlebot', content: 'noindex'});
  }


  ngOnDestroy() {
    // Clean up subscriptions
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
    this.subscriptions.forEach(sub => sub?.unsubscribe());
  }
}
