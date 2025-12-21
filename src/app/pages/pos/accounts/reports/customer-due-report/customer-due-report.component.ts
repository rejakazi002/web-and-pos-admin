import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ReportsService } from '../../../../../services/common/reports.service';
import { UiService } from '../../../../../services/core/ui.service';
import { ExportPrintService } from '../../../../../services/core/export-print.service';

@Component({
  selector: 'app-customer-due-report',
  templateUrl: './customer-due-report.component.html',
  styleUrls: ['./customer-due-report.component.scss'],
  providers: [DatePipe]
})
export class CustomerDueReportComponent implements OnInit {
  isLoading: boolean = true;
  customerDues: any[] = [];
  totalDue: number = 0;
  totalCustomers: number = 0;

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
    this.reportsService.getCustomerDueReport()
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.success) {
            this.customerDues = res.data?.customers || [];
            this.totalDue = res.data?.totalDue || 0;
            this.totalCustomers = res.data?.totalCustomers || 0;
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Error loading customer due report:', err);
          this.uiService.message('Failed to load report', 'warn');
        }
      });
  }

  exportCSV() {
    if (this.customerDues.length === 0) {
      this.uiService.message('No data to export', 'warn');
      return;
    }

    const headers = ['Customer Name', 'Phone', 'Total Sales', 'Total Paid', 'Total Due', 'Transactions', 'Last Sale Date'];
    const csvData = this.customerDues.map(item => ({
      'Customer Name': item.customerName || 'N/A',
      'Phone': item.customerPhone || '-',
      'Total Sales': (item.totalSales || 0).toFixed(2),
      'Total Paid': (item.totalPaid || 0).toFixed(2),
      'Total Due': (item.totalDue || 0).toFixed(2),
      'Transactions': item.transactionCount || 0,
      'Last Sale Date': item.lastSaleDate ? this.datePipe.transform(item.lastSaleDate, 'short') : '-'
    }));

    this.exportPrintService.exportCSV(csvData, 'Customer_Due_Report', headers);
    this.uiService.message('CSV exported successfully', 'success');
  }

  exportExcel() {
    if (this.customerDues.length === 0) {
      this.uiService.message('No data to export', 'warn');
      return;
    }

    const headers = ['Customer Name', 'Phone', 'Total Sales', 'Total Paid', 'Total Due', 'Transactions', 'Last Sale Date'];
    const excelData = this.customerDues.map(item => ({
      'Customer Name': item.customerName || 'N/A',
      'Phone': item.customerPhone || '-',
      'Total Sales': (item.totalSales || 0).toFixed(2),
      'Total Paid': (item.totalPaid || 0).toFixed(2),
      'Total Due': (item.totalDue || 0).toFixed(2),
      'Transactions': item.transactionCount || 0,
      'Last Sale Date': item.lastSaleDate ? this.datePipe.transform(item.lastSaleDate, 'short') : '-'
    }));

    this.exportPrintService.exportExcel(excelData, 'Customer_Due_Report', 'Customer Due Report', headers);
    this.uiService.message('Excel exported successfully', 'success');
  }

  exportPDF() {
    if (this.customerDues.length === 0) {
      this.uiService.message('No data to export', 'warn');
      return;
    }

    const headers = ['Customer Name', 'Phone', 'Total Sales', 'Total Paid', 'Total Due', 'Transactions', 'Last Sale Date'];
    const summaryHTML = `
      <div style="margin: 20px 0; padding: 15px; background: #f5f5f5; border-radius: 5px;">
        <h3>Summary</h3>
        <p><strong>Total Due Amount:</strong> ${(this.totalDue || 0).toFixed(2)}</p>
        <p><strong>Total Customers with Due:</strong> ${this.totalCustomers || 0}</p>
      </div>
    `;
    const htmlContent = this.exportPrintService.generateHTMLTable(
      this.customerDues.map(item => ({
        'Customer Name': item.customerName || 'N/A',
        'Phone': item.customerPhone || '-',
        'Total Sales': (item.totalSales || 0).toFixed(2),
        'Total Paid': (item.totalPaid || 0).toFixed(2),
        'Total Due': (item.totalDue || 0).toFixed(2),
        'Transactions': item.transactionCount || 0,
        'Last Sale Date': item.lastSaleDate ? this.datePipe.transform(item.lastSaleDate, 'short') : '-'
      })),
      headers,
      'Customer Due Report'
    );

    this.exportPrintService.exportPDF(summaryHTML + htmlContent, 'Customer_Due_Report');
    this.uiService.message('PDF exported successfully', 'success');
  }

  printReport() {
    if (this.customerDues.length === 0) {
      this.uiService.message('No data to print', 'warn');
      return;
    }

    const headers = ['Customer Name', 'Phone', 'Total Sales', 'Total Paid', 'Total Due', 'Transactions', 'Last Sale Date'];
    const summaryHTML = `
      <div style="margin: 20px 0; padding: 15px; background: #f5f5f5; border-radius: 5px;">
        <h3>Summary</h3>
        <p><strong>Total Due Amount:</strong> ${(this.totalDue || 0).toFixed(2)}</p>
        <p><strong>Total Customers with Due:</strong> ${this.totalCustomers || 0}</p>
      </div>
    `;
    const htmlContent = this.exportPrintService.generateHTMLTable(
      this.customerDues.map(item => ({
        'Customer Name': item.customerName || 'N/A',
        'Phone': item.customerPhone || '-',
        'Total Sales': (item.totalSales || 0).toFixed(2),
        'Total Paid': (item.totalPaid || 0).toFixed(2),
        'Total Due': (item.totalDue || 0).toFixed(2),
        'Transactions': item.transactionCount || 0,
        'Last Sale Date': item.lastSaleDate ? this.datePipe.transform(item.lastSaleDate, 'short') : '-'
      })),
      headers,
      'Customer Due Report'
    );

    this.exportPrintService.printReport(summaryHTML + htmlContent, 'Customer Due Report');
  }

  showColumnsInfo() {
    this.uiService.message('Column visibility is not applicable for this report', 'warn');
  }
}

