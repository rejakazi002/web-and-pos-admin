import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ThermalPrinterService } from '../../../../services/common/thermal-printer.service';
import { PrinterSettingsService } from '../../../../services/common/printer-settings.service';
import * as QRCode from 'qrcode';
import JsBarcode from 'jsbarcode';

@Component({
  selector: 'app-receipt-template',
  templateUrl: './receipt-template.component.html',
  styleUrls: ['./receipt-template.component.scss']
})
export class ReceiptTemplateComponent implements OnInit, OnChanges {
  @Input() saleData: any;
  @Input() shopInfo: any;
  @Input() printerSettings: any;

  qrCodeDataUrl: string = '';
  barcodeDataUrl: string = '';

  constructor(
    private thermalPrinterService: ThermalPrinterService,
    private printerSettingsService: PrinterSettingsService
  ) {}

  ngOnInit(): void {
    if (this.saleData && this.printerSettings) {
      this.generateQRCode();
      this.generateBarcode();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['saleData'] || changes['printerSettings']) {
      if (this.saleData && this.printerSettings) {
        this.generateQRCode();
        this.generateBarcode();
      }
    }
  }

  generateQRCode(): void {
    if (!this.printerSettings?.showQRCode) {
      this.qrCodeDataUrl = '';
      return;
    }

    let qrData = '';
    if (this.printerSettings.qrCodeType === 'invoice') {
      qrData = this.saleData?.invoiceNo || '';
    } else if (this.printerSettings.qrCodeType === 'url') {
      qrData = this.shopInfo?.domain || '';
    } else if (this.printerSettings.qrCodeType === 'custom') {
      qrData = this.printerSettings.qrCodeCustomText || '';
    }

    if (qrData) {
      QRCode.toDataURL(qrData, {
        width: 200,
        margin: 2
      }).then(url => {
        this.qrCodeDataUrl = url;
      }).catch(err => {
        console.error('QR Code generation error:', err);
      });
    }
  }

  generateBarcode(): void {
    if (!this.printerSettings?.showBarcode) {
      this.barcodeDataUrl = '';
      return;
    }

    let barcodeData = '';
    if (this.printerSettings.barcodeType === 'invoice') {
      barcodeData = this.saleData?.invoiceNo || '';
    } else if (this.printerSettings.barcodeType === 'custom') {
      barcodeData = this.printerSettings.barcodeCustomText || '';
    }

    if (barcodeData) {
      try {
        const canvas = document.createElement('canvas');
        JsBarcode(canvas, barcodeData, {
          format: 'CODE128',
          width: 2,
          height: 50,
          displayValue: true
        });
        this.barcodeDataUrl = canvas.toDataURL();
      } catch (err) {
        console.error('Barcode generation error:', err);
      }
    }
  }

  printReceipt(): void {
    if (this.printerSettings?.printWithoutPreview) {
      this.thermalPrinterService.printDirect(this.saleData, this.shopInfo).subscribe({
        next: (success) => {
          if (success) {
            console.log('Receipt printed successfully');
          } else {
            // Fallback to browser print
            window.print();
          }
        },
        error: (err) => {
          console.error('Print error:', err);
          // Fallback to browser print
          window.print();
        }
      });
    } else {
      window.print();
    }
  }

  getCustomStyles(): any {
    if (this.printerSettings?.customCss) {
      // Parse custom CSS and apply as inline styles
      // For now, return empty object - custom CSS should be in component SCSS
      return {};
    }
    return {};
  }
}

