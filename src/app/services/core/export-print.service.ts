import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExportPrintService {

  constructor() { }

  /**
   * Export data to CSV
   */
  exportCSV(data: any[], filename: string, headers?: string[]): void {
    if (!data || data.length === 0) {
      console.warn('No data to export');
      return;
    }

    // Get headers from first object if not provided
    const csvHeaders = headers || Object.keys(data[0]);
    
    // Escape helper (Excel-safe, quote wrapping + inner quotes double)
    const esc = (val: any): string => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    // Build CSV lines
    const lines: string[] = [];
    lines.push(csvHeaders.map(esc).join(','));

    for (const row of data) {
      const values = csvHeaders.map(header => {
        // Direct property access (headers should match data object keys)
        const value = row[header] !== undefined ? row[header] : '';
        return esc(value);
      });
      lines.push(values.join(','));
    }

    // Excel-friendly: add BOM + CRLF line endings
    const csv = '\ufeff' + lines.join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}_${new Date().getTime()}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  /**
   * Export data to Excel
   */
  exportExcel(data: any[], filename: string, sheetName: string = 'Sheet1', headers?: string[]): void {
    if (!data || data.length === 0) {
      console.warn('No data to export');
      return;
    }

    // Prepare data for Excel
    const keys = headers || Object.keys(data[0]);
    const excelData = data.map(row => {
      const excelRow: any = {};
      keys.forEach(key => {
        // Direct property access (keys should match data object keys)
        excelRow[key] = row[key] !== undefined && row[key] !== null ? row[key] : '';
      });
      return excelRow;
    });

    // Create workbook and worksheet
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    
    // Write file
    XLSX.writeFile(wb, `${filename}_${new Date().getTime()}.xlsx`);
  }

  /**
   * Export HTML content to PDF (downloads as PDF file)
   */
  exportPDF(htmlContent: string, filename: string): void {
    // Load jsPDF and html2canvas from CDN if not available
    this.loadPDFLibraries().then(() => {
      this.generatePDF(htmlContent, filename);
    }).catch(() => {
      // Fallback to print dialog
      this.fallbackToPrint(htmlContent, filename);
    });
  }

  /**
   * Load PDF generation libraries from CDN
   */
  private loadPDFLibraries(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Check if libraries are already loaded
      if ((window as any).html2canvas && (window as any).jspdf) {
        resolve();
        return;
      }

      let loadedCount = 0;
      const totalLibraries = 2;

      const checkComplete = () => {
        loadedCount++;
        if (loadedCount === totalLibraries) {
          resolve();
        }
      };

      // Load html2canvas
      if (!(window as any).html2canvas) {
        const html2canvasScript = document.createElement('script');
        html2canvasScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
        html2canvasScript.onload = checkComplete;
        html2canvasScript.onerror = () => reject(new Error('Failed to load html2canvas'));
        document.head.appendChild(html2canvasScript);
      } else {
        checkComplete();
      }

      // Load jsPDF
      if (!(window as any).jspdf) {
        const jspdfScript = document.createElement('script');
        jspdfScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        jspdfScript.onload = checkComplete;
        jspdfScript.onerror = () => reject(new Error('Failed to load jsPDF'));
        document.head.appendChild(jspdfScript);
      } else {
        checkComplete();
      }
    });
  }

  /**
   * Generate and download PDF
   */
  private generatePDF(htmlContent: string, filename: string): void {
    // Create a temporary container for the HTML content
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.width = '210mm'; // A4 width
    container.style.padding = '20px';
    container.style.fontFamily = 'Arial, sans-serif';
    container.innerHTML = htmlContent;
    document.body.appendChild(container);

    const html2canvas = (window as any).html2canvas;
    const { jsPDF } = (window as any).jspdf;

    html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    }).then((canvas: HTMLCanvasElement) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if needed
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Download PDF
      pdf.save(`${filename}_${new Date().getTime()}.pdf`);
      
      // Cleanup
      document.body.removeChild(container);
    }).catch((error: any) => {
      console.error('PDF generation error:', error);
      document.body.removeChild(container);
      // Fallback to print dialog
      this.fallbackToPrint(htmlContent, filename);
    });
  }

  /**
   * Fallback method: Open print dialog (user can save as PDF)
   */
  private fallbackToPrint(htmlContent: string, filename: string): void {
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (!printWindow) {
      console.error('Unable to open print window. Please allow popups.');
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${filename}</title>
          <meta charset="utf-8">
          <style>
            @media print {
              @page { margin: 0.5in; }
              body { margin: 0; padding: 10px; }
            }
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
              line-height: 1.6;
              color: #333;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            th, td {
              padding: 8px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }
            th {
              background-color: #4caf50;
              color: white;
              font-weight: 600;
            }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    
    // Trigger print dialog
    setTimeout(() => {
      printWindow.print();
    }, 250);
  }

  /**
   * Print HTML content
   */
  printReport(htmlContent: string, title: string = 'Report'): void {
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (!printWindow) {
      console.error('Unable to open print window. Please allow popups.');
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <meta charset="utf-8">
          <style>
            @media print {
              @page { margin: 0.5in; }
              body { margin: 0; padding: 10px; }
            }
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
              line-height: 1.6;
              color: #333;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            th, td {
              padding: 8px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }
            th {
              background-color: #4caf50;
              color: white;
              font-weight: 600;
            }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    
    // Trigger print dialog
    setTimeout(() => {
      printWindow.print();
    }, 250);
  }

  /**
   * Generate HTML table from data
   */
  generateHTMLTable(data: any[], headers: string[], title: string = 'Report'): string {
    // Get data keys from first row
    const dataKeys = data && data.length > 0 ? Object.keys(data[0]) : [];
    
    let html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
            line-height: 1.6;
            color: #333;
          }
          h1 {
            text-align: center;
            color: #2196f3;
            margin-bottom: 10px;
          }
          .report-info {
            text-align: center;
            color: #666;
            margin-bottom: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          th {
            background-color: #2196f3;
            color: white;
            padding: 12px;
            text-align: left;
            font-weight: 600;
            border: 1px solid #1976d2;
          }
          td {
            padding: 10px 12px;
            border: 1px solid #e0e0e0;
          }
          tr:nth-child(even) {
            background-color: #f8f9fa;
          }
          tr:hover {
            background-color: #e3f2fd;
          }
          @media print {
            body { margin: 0; padding: 10px; }
            table { page-break-inside: auto; }
            tr { page-break-inside: avoid; page-break-after: auto; }
          }
        </style>
      </head>
      <body>
        <h1>${this.escapeHtml(title)}</h1>
        <div class="report-info">Generated on: ${new Date().toLocaleString()}</div>
        <table>
          <thead>
            <tr>
              ${headers.map(h => `<th>${this.escapeHtml(String(h))}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
    `;
    
    data.forEach(row => {
      html += '<tr>';
      // Match headers with data keys by index
      headers.forEach((header, index) => {
        const key = dataKeys[index] || header.toLowerCase().replace(/\s+/g, '');
        const value = row[key] !== undefined && row[key] !== null ? row[key] : '-';
        html += `<td>${this.escapeHtml(String(value))}</td>`;
      });
      html += '</tr>';
    });

    html += `
          </tbody>
        </table>
      </body>
      </html>
    `;

    return html;
  }

  /**
   * Escape HTML special characters
   */
  private escapeHtml(text: string): string {
    const map: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  }

  /**
   * Get nested value from object (e.g., 'customer.name')
   */
  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, prop) => {
      if (current && typeof current === 'object') {
        // Handle array of objects (e.g., 'customer.name' when customer is object)
        if (Array.isArray(current)) {
          return current.map(item => item?.[prop]).filter(Boolean).join(', ');
        }
        return current[prop];
      }
      return null;
    }, obj);
  }
}

