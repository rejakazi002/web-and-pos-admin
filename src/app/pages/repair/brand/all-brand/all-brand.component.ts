import {AfterViewInit, Component, inject, OnDestroy, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {EMPTY, filter, map, Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {UiService} from '../../../../services/core/ui.service';
import {ReloadService} from '../../../../services/core/reload.service';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {Pagination} from '../../../../interfaces/core/pagination';
import {ConfirmDialogComponent} from '../../../../shared/components/ui/confirm-dialog/confirm-dialog.component';
import {BrandService} from '../../../../services/common/brand.service';
import {FilterData} from '../../../../interfaces/gallery/filter-data';
import {DataTableSelectionBase} from '../../../../mixin/data-table-select-base.mixin';
import {adminBaseMixin} from '../../../../mixin/admin-base.mixin';
import {PageDataService} from '../../../../services/core/page-data.service';
import {Title} from '@angular/platform-browser';
import {VendorService} from '../../../../services/vendor/vendor.service';

@Component({
  selector: 'app-all-brand',
  templateUrl: './all-brand.component.html',
  styleUrls: ['./all-brand.component.scss']
})
export class AllBrandComponent extends DataTableSelectionBase(adminBaseMixin(Component)) implements AfterViewInit, OnDestroy {

  @ViewChild('searchForm', {static: true}) private searchForm: NgForm;

  override allTableData: any[] = [];
  protected adminRole: any;

  isLoading: boolean = true;
  protected currentPage = 1;
  protected totalData = 0;
  protected dataPerPage = 10;

  filter: any = null;
  defaultFilter: any = null;
  searchQuery = null;
  private sortQuery = {createdAt: -1};
  private readonly select: any = {
    name: 1,
    createdAt: 1,
  }

  activeSort: number = null;
  activeFilter1: number = null;

  private subscriptions: Subscription[] = [];

  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly dialog = inject(MatDialog);
  private readonly uiService = inject(UiService);
  private readonly reloadService = inject(ReloadService);
  private readonly pageDataService = inject(PageDataService);
  private readonly title = inject(Title);
  private readonly vendorService = inject(VendorService);
  private readonly brandService = inject(BrandService);

  ngOnInit() {
    this.adminRole = this.vendorService.getUserRole();
    const subReload = this.reloadService.refreshData$.subscribe(() => {
      this.getAllBrands();
    });
    this.subscriptions.push(subReload);

    const subActivateRoute = this.activatedRoute.queryParamMap.subscribe(qParam => {
      if (qParam && qParam.get('page')) {
        this.currentPage = Number(qParam.get('page'));
      } else {
        this.currentPage = 1;
      }
      if (qParam && qParam.get('search')) {
        this.searchQuery = qParam.get('search');
      }
      this.getAllBrands();
    });
    this.subscriptions.push(subActivateRoute);

    this.setPageData();
  }

  ngAfterViewInit(): void {
    const formValue = this.searchForm.valueChanges;
    const subSearch = formValue.pipe(
      map((t: any) => t['searchTerm']),
      filter(() => this.searchForm.valid),
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe((searchTerm: string) => {
      if (searchTerm) {
        this.router.navigate([], {
          queryParams: {search: searchTerm},
          queryParamsHandling: 'merge'
        }).then();
      } else {
        this.router.navigate([], {
          queryParams: {search: null},
          queryParamsHandling: 'merge'
        }).then();
      }
    });
    this.subscriptions.push(subSearch);
  }

  private setPageData(): void {
    this.title.setTitle('Brand');
    this.pageDataService.setPageData({
      title: 'Brand',
      navArray: [
        {name: 'Dashboard', url: `/dashboard`},
        {name: 'Repair', url: `/repair`},
        {name: 'Brand', url: ''},
      ]
    })
  }

  private getAllBrands() {
    const pagination: Pagination = {
      pageSize: Number(this.dataPerPage),
      currentPage: Number(this.currentPage) - 1
    };

    const filterData: FilterData = {
      pagination: pagination,
      filter: this.filter,
      select: this.select,
      sort: this.sortQuery
    }

    const subscription = this.brandService.getAllBrands1(filterData, this.searchQuery)
      .subscribe({
        next: res => {
          this.allTableData = res.data;
          this.totalData = res.count ?? 0;
          if (this.allTableData && this.allTableData.length) {
            this.allTableData.forEach((m, i) => {
              const index = this.selectedIds.findIndex(f => f === m._id);
              this.allTableData[i].select = index !== -1;
            });
            this.checkSelectionData();
          }
          this.isLoading = false;
        },
        error: err => {
          this.isLoading = false;
          console.log(err)
        }
      });
    this.subscriptions.push(subscription);
  }

  private deleteMultipleBrandById() {
    const subscription = this.brandService.deleteMultipleBrandById(this.selectedIds)
      .subscribe({
        next: res => {
          if (res.success) {
            this.selectedIds = [];
            this.uiService.message(res.message, 'success');
            this.checkAndUpdateSelect();
            if (this.currentPage > 1) {
              this.router.navigate([], {queryParams: {page: 1}}).then();
            } else {
              this.reloadService.needRefreshData$();
            }
          } else {
            this.uiService.message(res.message, 'warn')
          }
        },
        error: err => {
          console.log(err)
        }
      });
    this.subscriptions.push(subscription);
  }

  sortData(query: any, type: number) {
    if (this.activeSort === type) {
      this.sortQuery = {createdAt: -1};
      this.activeSort = null;
    } else {
      this.sortQuery = query;
      this.activeSort = type;
    }
    this.getAllBrands();
  }

  onClearDataQuery(filter?: any) {
    this.activeSort = null;
    this.activeFilter1 = null;
    this.sortQuery = {createdAt: -1};
    this.filter = filter ?? null;
    this.reFetchData();
  }

  private reFetchData() {
    if (this.currentPage > 1) {
      this.router.navigate([], {queryParams: {page: 1}}).then();
    } else {
      this.getAllBrands();
    }
  }

  onClearSearch() {
    this.searchForm.reset();
    this.searchQuery = null;
    this.router.navigate([], {queryParams: {search: null}}).then();
  }

  get isFilterChange(): boolean {
    if (!this.filter) {
      return false;
    } else {
      return Object.keys(this.filter).length > 0;
    }
  }

  public openConfirmDialog(type: string, data?: any) {
    if (type === 'delete') {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        maxWidth: '400px',
        data: {
          title: 'Confirm Delete',
          message: 'Are you sure you want delete this data?'
        }
      });
      dialogRef.afterClosed().subscribe(dialogResult => {
        if (dialogResult) {
          this.deleteMultipleBrandById();
        }
      });
    }
  }

  public onPageChanged(event: any) {
    this.router.navigate([], {queryParams: {page: event}}).then();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub?.unsubscribe());
  }
}

