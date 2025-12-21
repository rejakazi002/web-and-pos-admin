import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ReportsService } from '../../../../../services/common/reports.service';
import { UiService } from '../../../../../services/core/ui.service';
import { ExportPrintService } from '../../../../../services/core/export-print.service';

@Component({
  selector: 'app-inventory-valuation',
  templateUrl: './inventory-valuation.component.html',
  styleUrls: ['./inventory-valuation.component.scss'],
  providers: [DatePipe]
})
export class InventoryValuationComponent implements OnInit {
  isLoading: boolean = true;
  inventoryData: any;

  constructor(
    private reportsService: ReportsService,
    private uiService: UiService,
    private exportPrintService: ExportPrintService,
    private datePipe: DatePipe,
  ) {}

  ngOnInit(): void {
    this.loadReport();
  }

  loadReport() {
    this.isLoading = true;
    this.reportsService.getInventoryValuation()
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.success) {
            this.inventoryData = res.data;
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Error loading inventory valuation:', err);
          this.uiService.message('Failed to load report', 'warn');
        }
      });
  }

  exportCSV() {
    if (!this.inventoryData?.products || this.inventoryData.products.length === 0) {
      this.uiService.message('No data to export', 'warn');
      return;
    }

    const headers = ['Product Name', 'SKU', 'Category', 'Quantity', 'Purchase Price', 'Sale Price', 'Valuation'];
    const csvData = this.inventoryData.products.map(item => ({
      'Product Name': item.productName || 'N/A',
      'SKU': item.sku || '-',
      'Category': item.category || '-',
      'Quantity': item.quantity || 0,
      'Purchase Price': (item.purchasePrice || 0).toFixed(2),
      'Sale Price': (item.salePrice || 0).toFixed(2),
      'Valuation': (item.valuation || 0).toFixed(2)
    }));

    this.exportPrintService.exportCSV(csvData, 'Inventory_Valuation', headers);
    this.uiService.message('CSV exported successfully', 'success');
  }

  exportExcel() {
    if (!this.inventoryData?.products || this.inventoryData.products.length === 0) {
      this.uiService.message('No data to export', 'warn');
      return;
    }

    const headers = ['Product Name', 'SKU', 'Category', 'Quantity', 'Purchase Price', 'Sale Price', 'Valuation'];
    const excelData = this.inventoryData.products.map(item => ({
      'Product Name': item.productName || 'N/A',
      'SKU': item.sku || '-',
      'Category': item.category || '-',
      'Quantity': item.quantity || 0,
      'Purchase Price': (item.purchasePrice || 0).toFixed(2),
      'Sale Price': (item.salePrice || 0).toFixed(2),
      'Valuation': (item.valuation || 0).toFixed(2)
    }));

    this.exportPrintService.exportExcel(excelData, 'Inventory_Valuation', 'Inventory Valuation', headers);
    this.uiService.message('Excel exported successfully', 'success');
  }

  exportPDF() {
    if (!this.inventoryData?.products || this.inventoryData.products.length === 0) {
      this.uiService.message('No data to export', 'warn');
      return;
    }

    const headers = ['Product Name', 'SKU', 'Category', 'Quantity', 'Purchase Price', 'Sale Price', 'Valuation'];
    const summaryHTML = `
      <div style="margin: 20px 0; padding: 15px; background: #f5f5f5; border-radius: 5px;">
        <h3>Summary</h3>
        <p><strong>Total Valuation:</strong> ${(this.inventoryData.totalValuation || 0).toFixed(2)}</p>
        <p><strong>Total Products:</strong> ${this.inventoryData.totalProducts || 0}</p>
      </div>
    `;
    const htmlContent = this.exportPrintService.generateHTMLTable(
      this.inventoryData.products.map(item => ({
        'Product Name': item.productName || 'N/A',
        'SKU': item.sku || '-',
        'Category': item.category || '-',
        'Quantity': item.quantity || 0,
        'Purchase Price': (item.purchasePrice || 0).toFixed(2),
        'Sale Price': (item.salePrice || 0).toFixed(2),
        'Valuation': (item.valuation || 0).toFixed(2)
      })),
      headers,
      'Inventory Valuation'
    );

    this.exportPrintService.exportPDF(summaryHTML + htmlContent, 'Inventory_Valuation');
    this.uiService.message('PDF exported successfully', 'success');
  }

  printReport() {
    if (!this.inventoryData?.products || this.inventoryData.products.length === 0) {
      this.uiService.message('No data to print', 'warn');
      return;
    }

    const headers = ['Product Name', 'SKU', 'Category', 'Quantity', 'Purchase Price', 'Sale Price', 'Valuation'];
    const summaryHTML = `
      <div style="margin: 20px 0; padding: 15px; background: #f5f5f5; border-radius: 5px;">
        <h3>Summary</h3>
        <p><strong>Total Valuation:</strong> ${(this.inventoryData.totalValuation || 0).toFixed(2)}</p>
        <p><strong>Total Products:</strong> ${this.inventoryData.totalProducts || 0}</p>
      </div>
    `;
    const htmlContent = this.exportPrintService.generateHTMLTable(
      this.inventoryData.products.map(item => ({
        'Product Name': item.productName || 'N/A',
        'SKU': item.sku || '-',
        'Category': item.category || '-',
        'Quantity': item.quantity || 0,
        'Purchase Price': (item.purchasePrice || 0).toFixed(2),
        'Sale Price': (item.salePrice || 0).toFixed(2),
        'Valuation': (item.valuation || 0).toFixed(2)
      })),
      headers,
      'Inventory Valuation'
    );

    this.exportPrintService.printReport(summaryHTML + htmlContent, 'Inventory Valuation');
  }

  showColumnsInfo() {
    this.uiService.message('Column visibility is not applicable for Inventory Valuation', 'warn');
  }
}

