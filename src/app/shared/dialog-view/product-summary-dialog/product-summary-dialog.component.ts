import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose} from "@angular/material/dialog";
import {MatTableModule} from "@angular/material/table";
import {MaterialModule} from "../../../material/material.module";

@Component({
  selector: 'app-product-summary-dialog',
  templateUrl: './product-summary-dialog.component.html',
  styleUrl: './product-summary-dialog.component.scss',
  standalone: true,
  imports: [

    MaterialModule,
    MatTableModule
  ]
})
export class ProductSummaryDialogComponent  {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { summary: Array<{ productName: string; totalQuantity: number }> }) {}

  downloadCsv(): void {
    const rows = this.data?.summary ?? [];

    // CSV Header
    const header = ['Product Name', 'Total Quantity'];

    // Escape helper (Excel-safe, quote wrapping + inner quotes double)
    const esc = (val: any): string => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    // Build CSV lines
    const lines: string[] = [];
    lines.push(header.map(esc).join(','));

    for (const r of rows) {
      const productName = r?.productName ?? '';
      const totalQty = r?.totalQuantity ?? 0;
      lines.push([esc(productName), esc(totalQty)].join(','));
    }

    // Excel-friendly: add BOM + CRLF line endings
    const csv = '\ufeff' + lines.join('\r\n');

    // Download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    a.href = url;
    a.download = `product-summary-${dd}-${mm}-${yyyy}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
