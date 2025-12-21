import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ADMIN_MENU_DB } from '../../core/db/admin-menu.db';
import { PageDataService } from '../../services/core/page-data.service';
import { DataTableSelectionBase } from '../../mixin/data-table-select-base.mixin';
import { NOTIFICATION_DASHBOARD_DB } from '../../core/db/notification-dashboard.db';
import { VendorService } from '../../services/vendor/vendor.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent extends DataTableSelectionBase(Component) implements OnInit {

  // Static Data
  readonly adminMenu = ADMIN_MENU_DB;
  notifications = NOTIFICATION_DASHBOARD_DB;

  // Permission state
  hasDashboardPermission = true;
  isPermissionChecked = false;

  private readonly pageDataService = inject(PageDataService);
  private readonly vendorService = inject(VendorService);
  private readonly title = inject(Title);
  private readonly platformId = inject(PLATFORM_ID);

  async ngOnInit() {
    // owner হলে ড্যাশবোর্ড পারমিশন ধরে নেই
    const role = this.vendorService.getUserRole?.();
    if (role === 'owner') {
      this.hasDashboardPermission = true;
      this.finishInit();
      return;
    }

    // SSR হলে স্টোরেজ নেই—ব্রাউজারে এসে রিয়াল-চেক হবে
    if (!isPlatformBrowser(this.platformId)) {
      this.hasDashboardPermission = true;
      this.finishInit();
      return;
    }

    // ব্রাউজারে—পারমিশন চেক (ডেটা আসা পর্যন্ত কয়েকবার চেষ্টা)
    await this.checkDashboardPermissionWithRetry();
    this.finishInit();
  }

  private finishInit() {
    this.setPageData();
    this.isPermissionChecked = true;
  }

  /**
   * Permissions চেক (retry সহ)
   *  - vendor-data/permission সঙ্গে সঙ্গে না পেলে 10 বার পর্যন্ত 100ms করে চেষ্টা করবে
   */
  private async checkDashboardPermissionWithRetry(): Promise<void> {
    const readPermission = (): boolean | null => {
      try {
        // sessionStorage না থাকলে বা এখনো সেট না হলে null
        const raw = sessionStorage.getItem('vendor-data');
        if (!raw || raw === 'undefined' || raw === 'null') {
          return null;
        }

        const allowed: string[] | null = this.vendorService.getUserPagePermissions?.() ?? null;
        if (Array.isArray(allowed)) {
          if (allowed.length === 0) return false;
          const set = new Set(allowed.map(k => (k || '').toLowerCase()));
          return set.has('dashboard');
        }
        // allowed null/undefined হলে এখনও প্রস্তুত না—retry করা হবে
        return null;
      } catch {
        // কোনো কারণে ব্যর্থ হলে null দিয়ে retry করতে দিই
        return null;
      }
    };

    let attempts = 0;
    let result: boolean | null = readPermission();

    while (result === null && attempts < 10) {
      await new Promise(res => setTimeout(res, 100)); // 100ms
      attempts++;
      result = readPermission();
    }

    // অনেক চেষ্টা করেও না পেলে—সেফ ডিফল্ট: true (ড্যাশবোর্ড দেখাই),
    // চাইলে এখানে false করে “Welcome” দেখাতেও পারেন।
    this.hasDashboardPermission = (result ?? true);
  }

  /**
   * Page Data
   */
  private setPageData(): void {
    if (this.hasDashboardPermission) {
      this.title.setTitle('Dashboard');
      this.pageDataService.setPageData({
        title: 'Dashboard',
        navArray: [
          { name: 'Dashboard', url: `/dashboard` },
          { name: 'Dashboard', url: 'https://www.youtube.com/embed/QusKeCi-Oyo' },
        ]
      });
    } else {
      this.title.setTitle('Welcome');
      this.pageDataService.setPageData({
        title: 'Welcome',
        navArray: [
          { name: 'Welcome', url: `/dashboard` },
        ]
      });
    }
  }
}
