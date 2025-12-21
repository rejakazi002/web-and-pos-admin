import {AfterViewInit, Component, inject, OnDestroy, ViewChild} from '@angular/core';
import {DataTableSelectionBase} from "../../../mixin/data-table-select-base.mixin";
import {FormControl, FormGroup, NgForm} from "@angular/forms";
import {Select} from "../../../interfaces/core/select";
import {DATA_STATUS, TABLE_TAB_DATA} from "../../../core/utils/app-data";
import {debounceTime, distinctUntilChanged, map, filter, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {UiService} from "../../../services/core/ui.service";
import {ReloadService} from "../../../services/core/reload.service";
import {Clipboard} from "@angular/cdk/clipboard";
import {ExpenseService} from "../../../services/common/expense.service";
import {ExpenseCategoryService} from "../../../services/common/expense-category.service";
import {PageDataService} from "../../../services/core/page-data.service";
import {Title} from "@angular/platform-browser";
import {Pagination} from "../../../interfaces/core/pagination";
import {FilterData} from "../../../interfaces/gallery/filter-data";
import {ConfirmDialogComponent} from "../../../shared/components/ui/confirm-dialog/confirm-dialog.component";
import {
  TableDetailsDialogComponent
} from "../../../shared/dialog-view/table-details-dialog/table-details-dialog.component";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {DatePipe} from "@angular/common";
import {ShopInformationService} from "../../../services/common/shop-information.service";
import {ShopInformation} from "../../../interfaces/common/shop-information.interface";
import {ExpenseCategory} from "../../../interfaces/common/expense-category.interface";

@Component({
  selector: 'app-all-expense',
  templateUrl: './all-expense.component.html',
  styleUrl: './all-expense.component.scss',
  providers: [DatePipe],
})
export class AllExpenseComponent extends DataTableSelectionBase(Component) implements AfterViewInit, OnDestroy {

  // Decorator
  @ViewChild('searchForm', {static: true}) private searchForm: NgForm;
  period: 'weekly'|'monthly'|'yearly' = 'monthly';
  from = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  to = new Date();
  summary: any;
  report: any[] = [];
  // Store Data
  override allTableData: any[] = [];
  allSummary: any;
  protected categories: ExpenseCategory[] = [];
  selectedCategoryId: string | null = null;

  // Business Information
  businessInfo = {
    name: 'Your Business Name',
    address: 'Your Business Address, City, Country',
    phone: '+880 1234 567890',
    email: 'info@yourbusiness.com',
    website: 'www.yourbusiness.com'
  };

  // Show/Hide invoice
  showInvoice = false;
  protected dataStatus: Select[] = DATA_STATUS;
  protected tableTabData: Select[] = TABLE_TAB_DATA;
  protected selectedTab: string = this.tableTabData[0].value;

  // Gallery View
  protected isGalleryOpen: boolean = false;
  protected galleryImages: string[] = [];
  protected selectedImageIndex: number = 0;

  // Pagination
  protected currentPage = 1;
  protected totalData = 0;
  protected dataPerPage = 10;

  // Filter
  filter: any = null;
  defaultFilter: any = null;
  searchQuery = null;
  private sortQuery = {createdAt: -1};
  private readonly select: any = {
    name: 1,
    category: 1,
    amount: 1,
    date: 1,
    images: 1,
    description: 1,
    status: 1,
    priority: 1,
  }
  // Active Filter Data
  selectedOverviewFilter: Select = null;
  // Loading
  isLoading: boolean = true;
  dataFormDateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  today = new Date();
  // Active Data Store
  activeSort: number = null;
  activeFilter1: number = null;
  shopInformation: ShopInformation;
  fShopDomain: any;

  // Subscriptions
  private subscriptions: Subscription[] = [];

  // Inject
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly dialog = inject(MatDialog);
  private readonly uiService = inject(UiService);
  private readonly reloadService = inject(ReloadService);
  private readonly clipboard = inject(Clipboard);
  private readonly expenseService = inject(ExpenseService);
  private readonly expenseCategoryService = inject(ExpenseCategoryService);
  private readonly pageDataService = inject(PageDataService);
  private readonly title = inject(Title);
  private readonly datePipe = inject(DatePipe);
  private readonly shopInformationService = inject(ShopInformationService);
  // private shopInformationService: ShopInformationService;

  ngOnInit() {

    // Reload Data
    const subReload = this.reloadService.refreshData$.subscribe(() => {
      this.getAllAllExpenses();
    });
    this.subscriptions.push(subReload);

    // Get Data from Param
    const subActivateRoute = this.activatedRoute.queryParamMap.subscribe(qParam => {
      if (qParam && qParam.get('page')) {
        this.currentPage = Number(qParam.get('page'));
      } else {
        this.currentPage = 1;
      }
      if (qParam && qParam.get('search')) {
        this.searchQuery = qParam.get('search');
      }

      this.getAllAllExpenses();
    });
    this.subscriptions.push(subActivateRoute);

    // Base Data
    this.setPageData();
    this.initImageGalleryView();
    this.getShopInformation();
    this.getAllCategories();

    // this.load();

  }

  private getShopInformation() {
    const subscription = this.shopInformationService.getShopInformation()
      .subscribe(
        (res) => {
          this.shopInformation = res.data;
          this.fShopDomain = res.fShopDomain;
          // console.log('shopInformation', this.shopInformation);
        },
        (err) => {
          console.log(err);
        }
      );
    this.subscriptions.push(subscription);
  }

  private getAllCategories() {
    const pagination: Pagination = {
      pageSize: 100,
      currentPage: 0
    };

    const filterData: FilterData = {
      pagination: pagination,
      filter: { status: { $ne: 'trash' } },
      select: { name: 1, _id: 1 },
      sort: { createdAt: -1 }
    };

    const subscription = this.expenseCategoryService.getAllCategories(filterData)
      .subscribe({
        next: res => {
          this.categories = res.data;
        },
        error: err => {
          console.log(err);
        }
      });
    this.subscriptions.push(subscription);
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
        // Update query params with the new search term
        this.router.navigate([], {
          queryParams: {search: searchTerm},
          queryParamsHandling: 'merge'
        }).then();
      } else {
        // Remove search query param when input is empty
        this.router.navigate([], {
          queryParams: {search: null},
          queryParamsHandling: 'merge'
        }).then();
      }
    });

    this.subscriptions.push(subSearch);
  }

  onClearFilter() {
    this.dataFormDateRange.reset();
    this.selectedCategoryId = null;
    this.filter = null;
    this.reFetchData();
  }

  onCategoryFilterChange(categoryId: string | null) {
    this.selectedCategoryId = categoryId;
    if (categoryId) {
      this.filter = { ...this.filter, 'category.name': categoryId };
    } else {
      if (this.filter) {
        delete this.filter['category.name'];
      }
    }
    this.reFetchData();
  }

  endChangeRegDateRange(event: MatDatepickerInputEvent<any>) {
    if (event.value && this.dataFormDateRange.value.start && this.dataFormDateRange.value.end) {
      const startDate = this.utilsService.getDateString(
        this.dataFormDateRange.value.start
      );
      const endDate = this.utilsService.getDateString(
        this.dataFormDateRange.value.end
      );
      this.filter = { date: { $gte: startDate, $lte: endDate } };
      // Re fetch Data
      this.reFetchData();
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

  load() {
    const params = { from: this.from?.toISOString(), to: this.to?.toISOString(), period: this.period };
    this.expenseService.summary(params).subscribe(res => this.summary = res.data);
    this.expenseService.report(params).subscribe(res => this.report = res.data);

    console.log('params',params)
  }
  /**
   * Base Init Methods
   * initImageGalleryView()
   */
  private initImageGalleryView() {
    const subGalleryImageView = this.activatedRoute.queryParamMap.subscribe((qParam) => {
      if (!qParam.get('gallery-image-view')) {
        this.closeGallery();
      }
    });
    this.subscriptions.push(subGalleryImageView);
  }


  /**
   * Page Data
   * setPageData()
   */
  private setPageData(): void {
    this.title.setTitle('Expense');
    this.pageDataService.setPageData({
      title: 'Expense',
      navArray: [
        {name: 'Dashboard', url: `/dashboard`},
        {name: 'Expense', url: null},
      ]
    })
  }


  /**
   * Handle Tab
   * onTabChange()
   */
  onTabChange(data: string) {
    this.selectedTab = data;
    if (data === 'all') {
      this.filter = null;
    } else {
      this.filter = {status: data}
    }
    this.onClearSelection();
    this.onClearDataQuery(this.filter);
  }


  /**
   * HTTP REQ HANDLE
   * getAllCategories()
   * getAllCategories()
   * deleteMultipleExpenseById()
   * updateMultipleUserById()
   */

  private getAllAllExpenses() {
    const pagination: Pagination = {
      pageSize: Number(this.dataPerPage),
      currentPage: Number(this.currentPage) - 1
    };

    const filterData: FilterData = {
      pagination: pagination,
      filter: {
        ...this.filter,
        ...(this.filter?.status ? {} : {status: {$ne: 'trash'}})
      },
      select: this.select,
      sort: this.sortQuery
    }

    const subscription = this.expenseService.getAllExpenses(filterData, this.searchQuery)
      .subscribe({
        next: res => {
          this.allTableData = res.data;
          this.allSummary = res?.categorySummary;
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

  private deleteMultipleExpenseById() {
    const subscription = this.expenseService.deleteMultipleExpenseById(this.selectedIds)
      .subscribe({
        next: res => {
          if (res.success) {
            this.selectedIds = [];
            this.uiService.message(res.message, 'success');
            this.checkAndUpdateSelect();
            // fetch Data
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

  private updateMultipleExpenseById(data: any) {
    const subscription = this.expenseService.updateMultipleExpenseById(this.selectedIds, data)
      .subscribe({
        next: res => {
          if (res.success) {
            this.selectedIds = [];
            this.checkAndUpdateSelect();
            this.reloadService.needRefreshData$();
            this.uiService.message(res.message, 'success');
          } else {
            this.uiService.message(res.message, 'wrong')
          }
        },
        error: err => {
          console.log(err)
        }
      });
    this.subscriptions.push(subscription);
  }

  /**
   * Filter & Sort Methods
   * reFetchData()
   * sortData()
   * filterData()
   * onClearDataQuery()
   * onClearSearch()
   * isFilterChange()
   */

  private reFetchData() {
    if (this.currentPage > 1) {
      this.router.navigate([], {queryParams: {page: 1}}).then();
    } else {
      this.getAllAllExpenses();
    }
  }

  sortData(query: any, type: number) {
    if (this.activeSort === type) {
      this.sortQuery = {createdAt: -1};
      this.activeSort = null;
    } else {
      this.sortQuery = query;
      this.activeSort = type;
    }
    this.getAllAllExpenses();
  }

  filterData(value: any, type: 'expense', index: number,) {
    switch (type) {
      case 'expense': {
        if (value) {
          this.filter = {...this.filter, ...{'expense._id': value}};
          this.activeFilter1 = index;
        } else {
          delete this.filter['expense._id'];
          this.activeFilter1 = null;
        }

        break;
      }
      default: {
        break;
      }
    }
    // Re fetch Data
    this.reFetchData();
  }

  onClearDataQuery(filter?: any) {
    this.activeSort = null;
    this.activeFilter1 = null;
    this.sortQuery = {createdAt: -1};
    this.filter = filter ?? null;
    // Re fetch Data
    this.reFetchData();
  }

  onClearSearch() {
    this.searchForm.reset();
    this.searchQuery = null;
    this.router.navigate([], {queryParams: {search: null}}).then();
  }

  get isFilterChange(): boolean {
    return (this.filter !== null && Object.keys(this.filter).length > 0) || this.selectedCategoryId !== null;
  }


  /**
   * COMPONENT DIALOG VIEW
   * openConfirmDialog()
   * openDetailsDialog()
   */
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
          this.deleteMultipleExpenseById();
        }
      });
    } else if (type === 'edit') {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        maxWidth: '400px',
        data: {
          title: 'Confirm Edit',
          message: 'Are you sure you want edit this data?'
        }
      });
      dialogRef.afterClosed().subscribe(dialogResult => {
        if (dialogResult) {
          this.updateMultipleExpenseById(data);
        }
      });
    }
  }

  openDetailsDialog(_id: string): void {
    const fData = this.allTableData.find(f => f._id === _id);
    this.dialog.open(TableDetailsDialogComponent, {
      data: fData,
      maxWidth: '800px',
      height: 'auto',
      maxHeight: '90vh'
    });
  }

  /**
   * PAGINATION CHANGE
   * onPageChanged()
   */
  public onPageChanged(event: any) {
    this.router.navigate([], {queryParams: {page: event}}).then();
  }

  /**
   * Gallery Image View
   * openGallery()
   * closeGallery()
   * copyToClipboard()
   */
  openGallery(event: any, images: string[], index?: number): void {
    event.stopPropagation();

    if (index) {
      this.selectedImageIndex = index;
    }
    this.galleryImages = images;
    this.isGalleryOpen = true;
    this.router.navigate([], {queryParams: {'gallery-image-view': true}, queryParamsHandling: 'merge'}).then();
  }

  closeGallery(): void {
    this.isGalleryOpen = false;
    this.router.navigate([], {queryParams: {'gallery-image-view': null}, queryParamsHandling: 'merge'}).then();
  }


  /**
   * Ui Essential
   * getStatusClass()
   * copyToClipboard()
   */
  getStatusClass(status: string) {
    if (status === 'publish') {
      return 'capsule-green';
    } else if (status === 'draft') {
      return 'capsule-orange';
    } else {
      return 'capsule-red';
    }
  }


  copyToClipboard($event: any, text: any): void {
    $event.stopPropagation();
    this.clipboard.copy(text);
    this.uiService.message('Text copied successfully.', 'success');
  }

  getCategoryColor(index: number): string {
    const colors = [
      'linear-gradient(90deg, #4caf50, #45a049)',
      'linear-gradient(90deg, #2196f3, #1976d2)',
      'linear-gradient(90deg, #ff9800, #f57c00)',
      'linear-gradient(90deg, #9c27b0, #7b1fa2)',
      'linear-gradient(90deg, #f44336, #d32f2f)',
      'linear-gradient(90deg, #00bcd4, #0097a7)',
      'linear-gradient(90deg, #795548, #5d4037)',
      'linear-gradient(90deg, #607d8b, #455a64)'
    ];
    return colors[index % colors.length];
  }

  // Invoice Report Methods
  getDateRangeText(): string {
    if (this.dataFormDateRange.value.start && this.dataFormDateRange.value.end) {
      const startDate = this.datePipe.transform(this.dataFormDateRange.value.start, 'mediumDate');
      const endDate = this.datePipe.transform(this.dataFormDateRange.value.end, 'mediumDate');
      return `${startDate} - ${endDate}`;
    }
    return 'All Time';
  }

  getCurrentDate(): string {
    return this.datePipe.transform(new Date(), 'fullDate');
  }

  downloadPDFReport(): void {
    if (!this.allSummary || !this.allTableData.length) {
      this.uiService.message('No data available for PDF generation', 'warn');
      return;
    }

    // For now, we'll use browser's print functionality
    // In a real implementation, you would call a backend API to generate PDF
    this.uiService.message('PDF generation will be implemented with backend API', 'success');

    // Alternative: Use html2pdf library
    // this.generatePDFWithHtml2Pdf();
  }

  printReport(): void {
    if (!this.allSummary || !this.allTableData.length) {
      this.uiService.message('No data available for printing', 'warn');
      return;
    }

    // Get the invoice content
    const printContent = document.getElementById('invoice-content');
    if (!printContent) {
      this.uiService.message('Print content not found', 'warn');
      return;
    }

    // Create a new window for printing
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (!printWindow) {
      this.uiService.message('Unable to open print window. Please allow popups.', 'warn');
      return;
    }

    // Write the HTML content to the new window
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Expense Report - ${this.businessInfo.name}</title>
          <meta charset="utf-8">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              font-family: 'Arial', sans-serif;
              margin: 20px;
              line-height: 1.6;
              color: #333;
            }
            .invoice-container {
              max-width: 800px;
              margin: 0 auto;
              background: white;
            }
            .invoice-header {
              display: flex;
              justify-content: space-between;
              margin-bottom: 30px;
              padding-bottom: 20px;
              border-bottom: 2px solid #4caf50;
            }
            .business-info {
              flex: 1;
            }
            .business-name {
              font-size: 28px;
              font-weight: bold;
              margin-bottom: 15px;
              color: #333;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            .business-details p {
              margin: 5px 0;
              color: #666;
            }
            .business-details strong {
              color: #333;
            }
            .invoice-details {
              text-align: right;
            }
            .invoice-title {
              color: #4caf50;
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 15px;
              text-transform: uppercase;
              letter-spacing: 2px;
            }
            .invoice-meta p {
              margin: 5px 0;
              color: #666;
            }
            .invoice-meta strong {
              color: #333;
            }
            .invoice-summary {
              margin-bottom: 30px;
              padding: 20px;
              background: #f8f9fa;
              border-radius: 8px;
              border-left: 4px solid #4caf50;
            }
            .invoice-summary h3 {
              margin-bottom: 15px;
              color: #333;
              font-size: 18px;
            }
            .summary-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 15px;
              margin-bottom: 20px;
            }
            .summary-item {
              padding: 15px;
              border: 1px solid #ddd;
              border-radius: 5px;
              background: white;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .summary-item .label {
              color: #666;
              font-weight: 500;
            }
            .summary-item .value {
              color: #4caf50;
              font-weight: bold;
              font-size: 16px;
            }
            .category-breakdown-section,
            .transactions-section {
              margin-bottom: 30px;
            }
            .category-breakdown-section h3,
            .transactions-section h3 {
              margin-bottom: 15px;
              color: #333;
              font-size: 18px;
              padding-bottom: 8px;
              border-bottom: 2px solid #4caf50;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
              background: white;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            th, td {
              padding: 12px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }
            th {
              background-color: #4caf50;
              color: white;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            td:last-child {
              text-align: right;
            }
            .total-row {
              background-color: #f8f9fa;
              font-weight: bold;
              border-top: 2px solid #4caf50;
            }
            .total-row td {
              color: #333;
              font-size: 16px;
            }
            .status-badge {
              padding: 4px 12px;
              border-radius: 20px;
              font-size: 12px;
              font-weight: 500;
              text-transform: uppercase;
            }
            .status-publish {
              background: #e8f5e8;
              color: #4caf50;
            }
            .status-draft {
              background: #fff3e0;
              color: #ff9800;
            }
            .status-trash {
              background: #ffebee;
              color: #f44336;
            }
            .invoice-footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 2px solid #f0f0f0;
              text-align: center;
            }
            .footer-note {
              color: #666;
              font-size: 14px;
              margin-bottom: 15px;
              font-style: italic;
            }
            .footer-signature p {
              color: #333;
              font-weight: 600;
              margin: 0;
            }
            @media print {
              body { margin: 0; }
              .invoice-container { box-shadow: none; }
            }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);

    // Close the document and trigger print
    printWindow.document.close();

    // Wait for content to load, then print
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();

      // Close the window after printing (optional)
      printWindow.onafterprint = () => {
        printWindow.close();
      };
    }, 500);

    this.uiService.message('Print dialog opened', 'success');
  }

  // Print only invoice content like order invoice
  printReportDirect(): void {
    if (!this.allSummary || !this.allTableData.length) {
      this.uiService.message('No data available for printing', 'warn');
      return;
    }

    // Create a new window for printing only the invoice
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (!printWindow) {
      this.uiService.message('Unable to open print window. Please allow popups.', 'warn');
      return;
    }

    // Generate invoice HTML content dynamically
    const invoiceHTML = this.generateInvoiceHTML();

    // Write the invoice content to the new window
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Expense Report - ${this.businessInfo.name}</title>
          <meta charset="utf-8">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              font-family: 'Arial', sans-serif;
              margin: 0;
              padding: 20px;
              line-height: 1.6;
              color: #333;
              background: white;
            }
            .invoice-container {
              max-width: 800px;
              margin: 0 auto;
              background: white;
            }
            .invoice-header {
              display: flex;
              justify-content: space-between;
              margin-bottom: 30px;
              padding-bottom: 20px;
              border-bottom: 2px solid #4caf50;
            }
            .business-info {
              flex: 1;
            }
            .business-name {
              font-size: 28px;
              font-weight: bold;
              margin-bottom: 15px;
              color: #333;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            .business-details p {
              margin: 5px 0;
              color: #666;
            }
            .business-details strong {
              color: #333;
            }
            .invoice-details {
              text-align: right;
            }
            .invoice-title {
              color: #4caf50;
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 15px;
              text-transform: uppercase;
              letter-spacing: 2px;
            }
            .invoice-meta p {
              margin: 5px 0;
              color: #666;
            }
            .invoice-meta strong {
              color: #333;
            }
            .invoice-summary {
              margin-bottom: 30px;
              padding: 20px;
              background: #f8f9fa;
              border-radius: 8px;
              border-left: 4px solid #4caf50;
            }
            .invoice-summary h3 {
              margin-bottom: 15px;
              color: #333;
              font-size: 18px;
            }
            .summary-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 15px;
              margin-bottom: 20px;
            }
            .summary-item {
              padding: 15px;
              border: 1px solid #ddd;
              border-radius: 5px;
              background: white;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .summary-item .label {
              color: #666;
              font-weight: 500;
            }
            .summary-item .value {
              color: #4caf50;
              font-weight: bold;
              font-size: 16px;
            }
            .category-breakdown-section,
            .transactions-section {
              margin-bottom: 30px;
            }
            .category-breakdown-section h3,
            .transactions-section h3 {
              margin-bottom: 15px;
              color: #333;
              font-size: 18px;
              padding-bottom: 8px;
              border-bottom: 2px solid #4caf50;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
              background: white;
              border-radius: 8px;
              overflow: hidden;
              /*box-shadow: 0 2px 10px rgba(0,0,0,0.1);*/
            }
            th, td {
              padding: 12px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }
            th {
              background-color: #4caf50;
              color: white;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            td:last-child {
              text-align: right;
            }
            .total-row {
              background-color: #f8f9fa;
              font-weight: bold;
              border-top: 2px solid #4caf50;
            }
            .total-row td {
              color: #333;
              font-size: 16px;
            }
            .status-badge {
              padding: 4px 12px;
              border-radius: 20px;
              font-size: 12px;
              font-weight: 500;
              text-transform: uppercase;
            }
            .status-publish {
              background: #e8f5e8;
              color: #4caf50;
            }
            .status-draft {
              background: #fff3e0;
              color: #ff9800;
            }
            .status-trash {
              background: #ffebee;
              color: #f44336;
            }
            .invoice-footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 2px solid #f0f0f0;
              text-align: center;
            }
            .footer-note {
              color: #666;
              font-size: 14px;
              margin-bottom: 15px;
              font-style: italic;
            }
            .footer-signature p {
              color: #333;
              font-weight: 600;
              margin: 0;
            }
            @media print {
              body { margin: 0; padding: 10px; }
              .invoice-container { box-shadow: none; }
              @page { margin: 0.5in; }
            }
          </style>
        </head>
        <body>
          ${invoiceHTML}
        </body>
      </html>
    `);

    // Close the document and trigger print
    printWindow.document.close();

    // Wait for content to load, then print
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();

      // Close the window after printing
      printWindow.onafterprint = () => {
        printWindow.close();
      };
    }, 500);

    this.uiService.message('Invoice print dialog opened', 'success');
  }

  // Generate invoice HTML content dynamically
  private generateInvoiceHTML(): string {
    const currentDate = this.getCurrentDate();
    const dateRange = this.getDateRangeText();

    // Generate category breakdown table
    const categoryRows = this.allSummary.byCategory.map(category =>
      `<tr>
        <td>${category.categoryName}</td>
        <td>${category.totalCount}</td>
        <td>${this.formatCurrency(category.totalAmount)}</td>
        <td>${((category.totalAmount / this.allSummary.grandTotal) * 100).toFixed(1)}%</td>
      </tr>`
    ).join('');

    // Generate transaction rows
    const transactionRows = this.allTableData.map(transaction =>
      `<tr>
        <td>${this.datePipe.transform(transaction.date, 'mediumDate')}</td>
        <td>${transaction.category?.name || 'Uncategorized'}</td>
        <td>${transaction.description || '-'}</td>
        <td>${this.formatCurrency(transaction.amount)}</td>
        <td><span class="status-badge status-${transaction.status}">${transaction.status}</span></td>
      </tr>`
    ).join('');

    return `
      <div class="invoice-container">
        <!-- Invoice Header -->
        <div class="invoice-header">
          <div class="business-info">
            <h1 class="business-name"><img style="max-width: 150px" src="${this.shopInformation?.logoPrimary}" alt=""></h1>
            <div class="business-details">
              <p><strong>Address:</strong> ${this.shopInformation?.addresses[0]?.value}</p>
              <p><strong>Phone:</strong> ${this.shopInformation?.phones[0]?.value}</p>
              <p><strong>Email:</strong> ${this.shopInformation?.emails[0]?.value}</p>
            </div>
          </div>
          <div class="invoice-details">
            <h2 class="invoice-title">EXPENSE REPORT</h2>
            <div class="invoice-meta">
              <p><strong>Report Period:</strong> ${dateRange}</p>
              <p><strong>Generated On:</strong> ${currentDate}</p>
              <p><strong>Total Categories:</strong> ${this.allSummary.categoryCount}</p>
              <p><strong>Total Transactions:</strong> ${this.allSummary.grandCount}</p>
            </div>
          </div>
        </div>

        <!-- Summary Section -->
        <div class="invoice-summary">
          <h3>Expense Summary</h3>
          <div class="summary-grid">
            <div class="summary-item">
              <span class="label">Total Amount:</span>
              <span class="value">${this.formatCurrency(this.allSummary.grandTotal)}</span>
            </div>
            <div class="summary-item">
              <span class="label">Total Transactions:</span>
              <span class="value">${this.allSummary.grandCount}</span>
            </div>
            <div class="summary-item">
              <span class="label">Categories:</span>
              <span class="value">${this.allSummary.categoryCount}</span>
            </div>
          </div>
        </div>

        <!-- Category Breakdown -->
        <div class="category-breakdown-section">
          <h3>Expense by Category</h3>
          <div class="category-table">
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Transactions</th>
                  <th>Amount</th>
                  <th>Percentage</th>
                </tr>
              </thead>
              <tbody>
                ${categoryRows}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Detailed Transactions -->
        <div class="transactions-section">
          <h3>Detailed Transactions</h3>
          <div class="transactions-table">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${transactionRows}
              </tbody>
              <tfoot>
                <tr class="total-row">
                  <td colspan="3"><strong>Total</strong></td>
                  <td><strong>${this.formatCurrency(this.allSummary.grandTotal)}</strong></td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <!-- Footer -->
        <div class="invoice-footer">
          <p class="footer-note">
            This report was generated automatically on ${currentDate}.
            For any questions regarding this report, please contact us.
          </p>
          <div class="footer-signature">
            <p>Generated by: ${this.fShopDomain?.domain}</p>
          </div>
        </div>
      </div>
    `;
  }

  // Helper method to format currency
  private formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  }

  // Toggle invoice view
  toggleInvoiceView(): void {
    this.showInvoice = !this.showInvoice;
  }

  // Method to update business information (you can call this from settings)
  updateBusinessInfo(info: any): void {
    this.businessInfo = { ...this.businessInfo, ...info };
  }

  /**
   * ON Destroy
   */
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub?.unsubscribe());
  }
}
