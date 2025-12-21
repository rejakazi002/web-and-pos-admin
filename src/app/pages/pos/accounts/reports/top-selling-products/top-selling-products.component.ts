import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ReportsService } from '../../../../../services/common/reports.service';
import { UiService } from '../../../../../services/core/ui.service';
import { ExportPrintService } from '../../../../../services/core/export-print.service';

@Component({
  selector: 'app-top-selling-products',
  templateUrl: './top-selling-products.component.html',
  styleUrls: ['./top-selling-products.component.scss'],
  providers: [DatePipe]
})
export class TopSellingProductsComponent implements OnInit {
  isLoading: boolean = true;
  topProducts: any[] = [];
  startDate: Date;
  endDate: Date = new Date();
  limit: number = 10;

  constructor(
    private reportsService: ReportsService,
    private uiService: UiService,
    private exportPrintService: ExportPrintService,
    private datePipe: DatePipe,
  ) {
    const today = new Date();
    this.endDate = today;
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    this.startDate = firstDay;
  }

  ngOnInit(): void {
    this.loadReport();
  }

  loadReport() {
    this.isLoading = true;
    const startStr = this.startDate.toISOString().split('T')[0];
    const endStr = this.endDate.toISOString().split('T')[0];
    this.reportsService.getTopSellingProducts(startStr, endStr, this.limit)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.success) {
            this.topProducts = res.data || [];
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Error loading top selling products:', err);
          this.uiService.message('Failed to load report', 'warn');
        }
      });
  }

  onDateRangeChange() {
    this.loadReport();
  }

  onLimitChange() {
    this.loadReport();
  }

  exportCSV() {
    if (this.topProducts.length === 0) {
      this.uiService.message('No data to export', 'warn');
      return;
    }

    const headers = ['Rank', 'Product Name', 'SKU', 'Quantity Sold', 'Total Sale Amount', 'Average Price'];
    const csvData = this.topProducts.map((item, index) => ({
      'Rank': index + 1,
      'Product Name': item.productName || '',
      'SKU': item.sku || '',
      'Quantity Sold': item.quantitySold || 0,
      'Total Sale Amount': (item.totalSaleAmount || 0).toFixed(2),
      'Average Price': (item.averagePrice || 0).toFixed(2)
    }));

    this.exportPrintService.exportCSV(csvData, 'Top_Selling_Products', headers);
    this.uiService.message('CSV exported successfully', 'success');
  }

  exportExcel() {
    if (this.topProducts.length === 0) {
      this.uiService.message('No data to export', 'warn');
      return;
    }

    const headers = ['Rank', 'Product Name', 'SKU', 'Quantity Sold', 'Total Sale Amount', 'Average Price'];
    const excelData = this.topProducts.map((item, index) => ({
      'Rank': index + 1,
      'Product Name': item.productName || '',
      'SKU': item.sku || '',
      'Quantity Sold': item.quantitySold || 0,
      'Total Sale Amount': (item.totalSaleAmount || 0).toFixed(2),
      'Average Price': (item.averagePrice || 0).toFixed(2)
    }));

    this.exportPrintService.exportExcel(excelData, 'Top_Selling_Products', 'Top Selling Products', headers);
    this.uiService.message('Excel exported successfully', 'success');
  }

  exportPDF() {
    if (this.topProducts.length === 0) {
      this.uiService.message('No data to export', 'warn');
      return;
    }

    const headers = ['Rank', 'Product Name', 'SKU', 'Quantity Sold', 'Total Sale Amount', 'Average Price'];
    const htmlContent = this.exportPrintService.generateHTMLTable(
      this.topProducts.map((item, index) => ({
        'Rank': index + 1,
        'Product Name': item.productName || '',
        'SKU': item.sku || '',
        'Quantity Sold': item.quantitySold || 0,
        'Total Sale Amount': (item.totalSaleAmount || 0).toFixed(2),
        'Average Price': (item.averagePrice || 0).toFixed(2)
      })),
      headers,
      'Top Selling Products'
    );

    this.exportPrintService.exportPDF(htmlContent, 'Top_Selling_Products');
    this.uiService.message('PDF exported successfully', 'success');
  }

  printReport() {
    if (this.topProducts.length === 0) {
      this.uiService.message('No data to print', 'warn');
      return;
    }

    const headers = ['Rank', 'Product Name', 'SKU', 'Quantity Sold', 'Total Sale Amount', 'Average Price'];
    const htmlContent = this.exportPrintService.generateHTMLTable(
      this.topProducts.map((item, index) => ({
        'Rank': index + 1,
        'Product Name': item.productName || '',
        'SKU': item.sku || '',
        'Quantity Sold': item.quantitySold || 0,
        'Total Sale Amount': (item.totalSaleAmount || 0).toFixed(2),
        'Average Price': (item.averagePrice || 0).toFixed(2)
      })),
      headers,
      'Top Selling Products'
    );

    this.exportPrintService.printReport(htmlContent, 'Top Selling Products');
  }

  showColumnsInfo() {
    this.uiService.message('Column visibility is not applicable for this report', 'warn');
  }
}

