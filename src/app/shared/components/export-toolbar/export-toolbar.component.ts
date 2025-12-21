import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ExportPrintService } from '../../../services/core/export-print.service';

export interface ColumnVisibility {
  key: string;
  label: string;
  visible: boolean;
}

@Component({
  selector: 'app-export-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTooltipModule
  ],
  templateUrl: './export-toolbar.component.html',
  styleUrls: ['./export-toolbar.component.scss']
})
export class ExportToolbarComponent {
  @Input() data: any[] = [];
  @Input() filename: string = 'export';
  @Input() title: string = 'Report';
  @Input() headers: string[] = [];
  @Input() columns: ColumnVisibility[] = [];
  @Input() tableElement?: HTMLElement;
  @Output() columnVisibilityChange = new EventEmitter<ColumnVisibility[]>();

  showColumnMenu = false;

  constructor(private exportPrintService: ExportPrintService) {}

  exportCSV(): void {
    if (!this.data || this.data.length === 0) {
      alert('No data to export');
      return;
    }
    // Map headers to data keys if columns are provided
    const dataKeys = this.getDataKeys();
    this.exportPrintService.exportCSV(this.data, this.filename, dataKeys);
  }

  exportExcel(): void {
    if (!this.data || this.data.length === 0) {
      alert('No data to export');
      return;
    }
    // Map headers to data keys if columns are provided
    const dataKeys = this.getDataKeys();
    this.exportPrintService.exportExcel(this.data, this.filename, 'Sheet1', dataKeys);
  }

  exportPDF(): void {
    if (!this.data || this.data.length === 0) {
      alert('No data to export');
      return;
    }

    // Generate HTML table with proper headers
    const headerLabels = this.getHeaderLabels();
    const htmlContent = this.exportPrintService.generateHTMLTable(
      this.data,
      headerLabels,
      this.title
    );

    // Export as PDF
    this.exportPrintService.exportPDF(htmlContent, this.filename);
  }

  printReport(): void {
    if (!this.data || this.data.length === 0) {
      alert('No data to print');
      return;
    }

    // Generate HTML table with proper headers
    const headerLabels = this.getHeaderLabels();
    const htmlContent = this.exportPrintService.generateHTMLTable(
      this.data,
      headerLabels,
      this.title
    );

    // Print
    this.exportPrintService.printReport(htmlContent, this.title);
  }

  private getDataKeys(): string[] {
    // If columns are provided, use their keys
    if (this.columns && this.columns.length > 0) {
      return this.columns
        .filter(col => col.visible)
        .map(col => col.key);
    }
    // Otherwise use headers as keys (if headers match data keys)
    if (this.headers && this.headers.length > 0) {
      return this.headers;
    }
    // Fallback: use keys from first data object
    if (this.data && this.data.length > 0) {
      return Object.keys(this.data[0]);
    }
    return [];
  }

  private getHeaderLabels(): string[] {
    // If columns are provided, use their labels
    if (this.columns && this.columns.length > 0) {
      return this.columns
        .filter(col => col.visible)
        .map(col => col.label);
    }
    // Otherwise use provided headers
    if (this.headers && this.headers.length > 0) {
      return this.headers;
    }
    // Fallback: use keys from first data object
    if (this.data && this.data.length > 0) {
      return Object.keys(this.data[0]);
    }
    return [];
  }

  toggleColumnVisibility(column: ColumnVisibility): void {
    column.visible = !column.visible;
    this.columnVisibilityChange.emit(this.columns);
  }

  toggleColumnMenu(): void {
    this.showColumnMenu = !this.showColumnMenu;
  }
}

