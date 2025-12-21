import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import JsBarcode from 'jsbarcode';
import { PrinterSettingsService } from '../../../services/common/printer-settings.service';

export interface BarcodePrintData {
  products: any[];
}

@Component({
  selector: 'app-barcode-print-dialog',
  templateUrl: './barcode-print-dialog.component.html',
  styleUrls: ['./barcode-print-dialog.component.scss']
})
export class BarcodePrintDialogComponent implements OnInit, OnDestroy {
  selectedProducts: any[] = [];
  printCount: number = 1;
  showPrice: boolean = true;
  shopInformation: any = {
    currency: '৳',
    siteName: 'Shop'
  };
  barcodeDataUrls: Map<string, string> = new Map(); // For preview (canvas images)
  barcodeSvgs: Map<string, string> = new Map(); // For print (SVG strings)
  selectedVariationByProduct: Record<string, string> = {};
  
  // Barcode label settings from printer settings
  barcodeSettings: any = {
    showProductName: true,
    showVariationName: true,
    showPrice: true,
    showShopName: true,
    showBarcodeCode: true,
    barcodeWidth: 2.5,
    barcodeHeight: 60
  };
  
  private subDataOne: Subscription;

  constructor(
    public dialogRef: MatDialogRef<BarcodePrintDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BarcodePrintData,
    private printerSettingsService: PrinterSettingsService
  ) {
    this.selectedProducts = data.products || [];
  }

  ngOnInit(): void {
    this.loadBarcodeSettings();
  }

  loadBarcodeSettings(): void {
    this.printerSettingsService.getPrinterSettings().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.barcodeSettings = {
            showProductName: res.data.barcodeLabelShowProductName !== undefined ? res.data.barcodeLabelShowProductName : true,
            showVariationName: res.data.barcodeLabelShowVariationName !== undefined ? res.data.barcodeLabelShowVariationName : true,
            showPrice: res.data.barcodeLabelShowPrice !== undefined ? res.data.barcodeLabelShowPrice : true,
            showShopName: res.data.barcodeLabelShowShopName !== undefined ? res.data.barcodeLabelShowShopName : true,
            showBarcodeCode: res.data.barcodeLabelShowBarcodeCode !== undefined ? res.data.barcodeLabelShowBarcodeCode : true,
            barcodeWidth: res.data.barcodeWidth || 2.5,
            barcodeHeight: res.data.barcodeHeight || 60
          };
          // Update showPrice checkbox based on settings
          this.showPrice = this.barcodeSettings.showPrice;
          // Regenerate barcodes with new settings
          this.generateBarcodes();
        }
      },
      error: (err) => {
        console.error('Error loading barcode settings:', err);
        // Use defaults and generate barcodes
        this.generateBarcodes();
      }
    });
  }

  /**
   * Resolve barcode value for a product, preferring product barcode, then SKU,
   * then variation-level barcode/SKU, avoiding fallback to _id to keep labels clean.
   */
  private getSelectedVariation(product: any): any {
    if (!product?.variationList?.length) return null;
    const selectedId = this.selectedVariationByProduct[product._id];
    return product.variationList.find((v: any) => v?._id === selectedId) || product.variationList[0];
  }

  onVariationChange(product: any): void {
    this.generateBarcodes();
  }

  private getVariationKey(product: any): string {
    const variation = this.getSelectedVariation(product);
    return variation ? `${product._id}:${variation._id}` : `${product._id}:base`;
  }

  private getBarcodeValue(product: any): string {
    if (!product) {
      return '';
    }
    const variation = this.getSelectedVariation(product);
    if (variation) {
      if (variation.barcode) return variation.barcode;
      if (variation.sku) return variation.sku;
    }
    if (product.barcode) return product.barcode;
    if (product.sku) return product.sku;
    const variationBarcode =
      product.variationList?.find((v: any) => v?.barcode)?.barcode ||
      product.variationList?.find((v: any) => v?.sku)?.sku;
    return variationBarcode || '';
  }

  getDisplayBarcode(product: any): string {
    return this.getBarcodeValue(product);
  }

  private getPriceValue(product: any): number {
    const variation = this.getSelectedVariation(product);
    if (variation) {
      return variation.salePrice ?? variation.regularPrice ?? variation.price ?? 0;
    }
    return product.salePrice ?? product.price ?? 0;
  }

  generateBarcodes(): void {
    this.barcodeDataUrls.clear();
    this.barcodeSvgs.clear();
    this.selectedProducts.forEach(product => {
      // If product has variations, generate barcode for each variation
      if (product?.variationList?.length) {
        product.variationList.forEach((variation: any) => {
          const barcodeValue = this.getVariationBarcode(variation);
          if (barcodeValue) {
            try {
              // Generate SVG for print (crystal clear, vector-based)
              const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
              JsBarcode(svg, barcodeValue, {
                format: 'CODE128',
                width: this.barcodeSettings.barcodeWidth,
                height: this.barcodeSettings.barcodeHeight,
                displayValue: false,
                fontSize: 0,
                font: 'Arial',
                textMargin: 0,
                margin: 8,
                background: '#ffffff',
                lineColor: '#000000',
                valid: function(valid) {
                  return valid;
                }
              });
              const key = `${product._id}:${variation._id}`;
              // Store SVG string for print
              this.barcodeSvgs.set(key, svg.outerHTML);
              
              // Also generate canvas for preview with dynamic size
              const canvas = document.createElement('canvas');
              // Calculate canvas size based on barcode height and width
              const canvasWidth = Math.max(400, this.barcodeSettings.barcodeWidth * 50);
              const canvasHeight = Math.max(100, this.barcodeSettings.barcodeHeight + 20);
              canvas.width = canvasWidth;
              canvas.height = canvasHeight;
              JsBarcode(canvas, barcodeValue, {
                format: 'CODE128',
                width: this.barcodeSettings.barcodeWidth,
                height: this.barcodeSettings.barcodeHeight,
                displayValue: false,
                fontSize: 0,
                font: 'Arial',
                textMargin: 0,
                margin: 8,
                background: '#ffffff',
                lineColor: '#000000'
              });
              this.barcodeDataUrls.set(key, canvas.toDataURL('image/png', 1.0));
            } catch (err) {
              console.error('Barcode generation error for variation:', variation._id, err);
            }
          }
        });
      } else {
        // If no variations, generate barcode for product
        const barcodeValue = this.getBarcodeValue(product);
        if (barcodeValue) {
            try {
              // Generate SVG for print (crystal clear, vector-based)
              const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
              JsBarcode(svg, barcodeValue, {
                format: 'CODE128',
                width: this.barcodeSettings.barcodeWidth,
                height: this.barcodeSettings.barcodeHeight,
                displayValue: false,
                fontSize: 0,
                font: 'Arial',
                textMargin: 0,
                margin: 8,
                background: '#ffffff',
                lineColor: '#000000',
                valid: function(valid) {
                  return valid;
                }
              });
              const key = `${product._id}:base`;
              // Store SVG string for print
              this.barcodeSvgs.set(key, svg.outerHTML);
              
              // Also generate canvas for preview with dynamic size
              const canvas = document.createElement('canvas');
              // Calculate canvas size based on barcode height and width
              const canvasWidth = Math.max(400, this.barcodeSettings.barcodeWidth * 50);
              const canvasHeight = Math.max(100, this.barcodeSettings.barcodeHeight + 20);
              canvas.width = canvasWidth;
              canvas.height = canvasHeight;
              JsBarcode(canvas, barcodeValue, {
                format: 'CODE128',
                width: this.barcodeSettings.barcodeWidth,
                height: this.barcodeSettings.barcodeHeight,
                displayValue: false,
                fontSize: 0,
                font: 'Arial',
                textMargin: 0,
                margin: 8,
                background: '#ffffff',
                lineColor: '#000000'
              });
              this.barcodeDataUrls.set(key, canvas.toDataURL('image/png', 1.0));
            } catch (err) {
              console.error('Barcode generation error for product:', product._id, err);
            }
        }
      }
    });
  }

  getVariationBarcode(variation: any): string {
    if (!variation) return '';
    if (variation.barcode) return variation.barcode;
    if (variation.sku) return variation.sku;
    return '';
  }

  onPrintCountChange(): void {
    if (this.printCount < 1) {
      this.printCount = 1;
    }
  }

  onGenerate(): void {
    this.generateBarcodes();
  }

  onPrint(): void {
    const printContent = document.getElementById('barcode-print-section');
    if (!printContent) {
      return;
    }

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      return;
    }

    const shopName = this.shopInformation?.websiteName || this.shopInformation?.websiteName || 'Shop';
    const currency = this.shopInformation?.currency || '৳';

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Barcode Print</title>
        <style>
          @media print {
            @page {
              size: 1.5in 1in;
              margin: 0;
            }
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            body {
              margin: 0;
              padding: 0;
            }
            html, body {
              height: auto;
              overflow: visible;
            }
            .barcode-wrapper {
              display: block;
            }
            .barcode-container {
              page-break-after: always;
              page-break-inside: avoid;
              break-after: page;
              break-inside: avoid;
            }
            .barcode-container:last-child {
              page-break-after: auto;
              break-after: auto;
            }
            img, .barcode-image, .barcode-svg, .barcode-svg svg {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .barcode-svg svg {
              shape-rendering: crispEdges;
            }
          }
          body {
            font-family: Arial, sans-serif;
            padding: 0;
            margin: 0;
          }
          .barcode-wrapper {
            display: block;
            width: 100%;
          }
          .barcode-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 1.5in;
            height: 1in;
            border: none;
            padding: 2mm;
            margin: 0 auto;
            text-align: center;
            page-break-inside: avoid;
            page-break-after: always;
            break-inside: avoid;
            break-after: page;
            box-sizing: border-box;
            overflow: hidden;
          }
          .barcode-container:last-child {
            page-break-after: auto;
            break-after: auto;
          }
          .product-name {
            font-size: 10px;
            font-weight: bold;
            margin-bottom: 1px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 100%;
            line-height: 1.3;
            flex-shrink: 0;
            color: #000;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
          }
          .variation-name {
            font-size: 9px;
            color: #000;
            margin-bottom: 0.5px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 100%;
            line-height: 1.3;
            flex-shrink: 0;
            font-weight: 600;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
          }
          .barcode-image, .barcode-svg {
            max-width: 100%;
            width: 100%;
            height: auto;
            max-height: 50px;
            min-height: 40px;
            margin: 2px 0;
            object-fit: contain;
            flex-shrink: 1;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .barcode-svg {
            display: block;
            margin: 2px auto;
          }
          .barcode-svg svg {
            width: 100%;
            height: auto;
            max-height: 50px;
          }
          .barcode-text {
            font-size: 9px;
            font-weight: bold;
            margin-top: 1px;
            color: #000;
            font-family: 'Courier New', monospace;
            letter-spacing: 0.5px;
            word-break: break-all;
            line-height: 1.2;
            flex-shrink: 0;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .price-info {
            font-size: 10px;
            font-weight: bold;
            margin-top: 1px;
            color: #000;
            line-height: 1.3;
            flex-shrink: 0;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
          }
          .shop-name {
            font-size: 8px;
            color: #000;
            margin-top: 1px;
            line-height: 1.3;
            flex-shrink: 0;
            font-weight: 600;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
          }
        </style>
      </head>
      <body>
        <div class="barcode-wrapper">
          ${this.generatePrintHTML(currency, shopName)}
        </div>
      </body>
      </html>
    `);

    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  }

  private generatePrintHTML(currency: string, shopName: string): string {
    let html = '';
    for (let i = 0; i < this.printCount; i++) {
      this.selectedProducts.forEach(product => {
        // If product has variations, print all variations
        if (product?.variationList?.length) {
          product.variationList.forEach((variation: any) => {
            const key = `${product._id}:${variation._id}`;
            const barcodeSvg = this.barcodeSvgs.get(key);
            const barcodeValue = this.getVariationBarcode(variation);
            if (barcodeSvg && barcodeValue) {
              const productName = (product.name || 'Product').substring(0, 30);
              const variationName = variation.name || '';
              const price = this.showPrice ? (variation.salePrice || variation.regularPrice || 0) : null;
          
              html += `
                <div class="barcode-container">
                  ${this.barcodeSettings.showProductName ? `<div class="product-name">${this.escapeHtml(productName)}</div>` : ''}
                  ${this.barcodeSettings.showVariationName && variationName ? `<div class="variation-name">${this.escapeHtml(variationName)}</div>` : ''}
                  <div class="barcode-svg">${barcodeSvg}</div>
                  ${this.barcodeSettings.showBarcodeCode ? `<div class="barcode-text">${this.escapeHtml(barcodeValue)}</div>` : ''}
       
                  ${this.barcodeSettings.showPrice && price !== null ? `<div class="price-info">${currency} ${price.toFixed(2)}</div>` : ''}
                  ${this.barcodeSettings.showShopName ? `<div class="shop-name">${this.escapeHtml(shopName)}</div>` : ''}
                </div>
              `;
            }
          });
        } else {
          // If no variations, print product barcode
          const key = `${product._id}:base`;
          const barcodeSvg = this.barcodeSvgs.get(key);
          const barcodeValue = this.getBarcodeValue(product);
          if (barcodeSvg && barcodeValue) {
            const productName = (product.name || 'Product').substring(0, 30);
            const price = this.showPrice ? this.getPriceValue(product) : null;
          
            html += `
              <div class="barcode-container">
                ${this.barcodeSettings.showProductName ? `<div class="product-name">${this.escapeHtml(productName)}</div>` : ''}
                <div class="barcode-svg">${barcodeSvg}</div>
                ${this.barcodeSettings.showBarcodeCode ? `<div class="barcode-text">${this.escapeHtml(barcodeValue)}</div>` : ''}

                ${this.barcodeSettings.showPrice && price !== null ? `<div class="price-info">${currency} ${price.toFixed(2)}</div>` : ''}
                ${this.barcodeSettings.showShopName ? `<div class="shop-name">${this.escapeHtml(shopName)}</div>` : ''}
              </div>
            `;
          }
        }
      });
    }
    return html;
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
  }
}

