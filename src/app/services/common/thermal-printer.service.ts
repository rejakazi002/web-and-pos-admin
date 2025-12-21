import { Injectable } from '@angular/core';
import { PrinterSettingsService } from './printer-settings.service';
import { Observable, from, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ThermalPrinterService {
  private printerSettings: any = null;

  constructor(
    private printerSettingsService: PrinterSettingsService
  ) {}

  /**
   * Load printer settings
   */
  loadSettings(): Observable<any> {
    return this.printerSettingsService.getPrinterSettings().pipe(
      map(res => {
        if (res.success) {
          this.printerSettings = res.data;
          return res.data;
        }
        return null;
      }),
      catchError(err => {
        console.error('Error loading printer settings:', err);
        return of(null);
      })
    );
  }

  /**
   * Generate ESC/POS commands for thermal printer
   */
  generateReceiptCommands(saleData: any, shopInfo: any): Observable<Uint8Array> {
    return this.loadSettings().pipe(
      map(settings => {
        if (!settings) {
          settings = this.getDefaultSettings();
        }

        // ESC/POS command builder
        const commands: number[] = [];

        // Initialize printer
        commands.push(0x1B, 0x40); // ESC @ - Initialize

        // Set paper size (58mm or 80mm)
        const paperWidth = settings.paperSize === '80mm' ? 80 : 58;
        if (paperWidth === 80) {
          commands.push(0x1D, 0x57, 0x02); // Set paper width to 80mm
        }

        // Header
        if (settings.showShopName !== false) {
          this.addText(commands, shopInfo?.siteName || shopInfo?.websiteName || 'Shop Name', { align: 'center', bold: true, size: 2 });
        }

        if (settings.showShopAddress !== false && shopInfo?.addresses?.[0]?.value) {
          this.addText(commands, shopInfo.addresses[0].value, { align: 'center' });
        }

        if (settings.showShopPhone !== false && shopInfo?.phones?.[0]?.value) {
          this.addText(commands, `Phone: ${shopInfo.phones[0].value}`, { align: 'center' });
        }

        this.addLine(commands);

        // Invoice Info
        if (settings.showInvoiceNumber !== false) {
          this.addText(commands, `Invoice: ${saleData.invoiceNo || 'N/A'}`);
        }

        if (settings.showDate !== false) {
          const date = new Date(saleData.soldDate || new Date()).toLocaleDateString();
          this.addText(commands, `Date: ${date}`);
        }

        if (settings.showTime !== false && saleData.soldTime) {
          this.addText(commands, `Time: ${saleData.soldTime}`);
        }

        // Customer Info
        if (settings.showCustomerInfo !== false) {
          if (saleData.customer?.name) {
            this.addText(commands, `Customer: ${saleData.customer.name}`);
          }
          if (saleData.customer?.phone) {
            this.addText(commands, `Phone: ${saleData.customer.phone}`);
          }
        }

        // Salesman Info
        if (settings.showSalesmanInfo !== false && saleData.salesman?.name) {
          this.addText(commands, `Salesman: ${saleData.salesman.name}`);
        }

        this.addLine(commands);

        // Products Table
        if (settings.showProductTable !== false && saleData.products) {
          this.addText(commands, 'Item                Qty  Price', { align: 'left' });
          this.addLine(commands);
          
          saleData.products.forEach((p: any) => {
            const name = (p.name || 'Product').substring(0, 18);
            const qty = (p.soldQuantity || 0).toString().padStart(3);
            const price = `${shopInfo?.currency || '৳'}${(p.salePrice || 0).toFixed(2)}`.padStart(8);
            this.addText(commands, `${name} ${qty} ${price}`);
          });
        }

        this.addLine(commands);

        // Totals
        if (settings.showTotals !== false) {
          const currency = shopInfo?.currency || '৳';
          this.addText(commands, `Sub Total: ${currency}${(saleData.subTotal || 0).toFixed(2)}`, { align: 'right' });

          if (saleData.discount > 0) {
            this.addText(commands, `Discount: -${currency}${saleData.discount.toFixed(2)}`, { align: 'right' });
          }

          if (saleData.vatAmount > 0) {
            this.addText(commands, `VAT: ${currency}${saleData.vatAmount.toFixed(2)}`, { align: 'right' });
          }

          this.addText(commands, `Total: ${currency}${(saleData.total || 0).toFixed(2)}`, { align: 'right', bold: true, size: 2 });
        }

        // Payment Info
        if (settings.showPaymentInfo !== false) {
          const currency = shopInfo?.currency || '৳';
          this.addText(commands, `Payment: ${saleData.paymentType || 'Cash'}`);
          this.addText(commands, `Received: ${currency}${(saleData.receivedFromCustomer || saleData.total || 0).toFixed(2)}`);

          if (saleData.receivedFromCustomer > saleData.total) {
            const change = saleData.receivedFromCustomer - saleData.total;
            this.addText(commands, `Change: ${currency}${change.toFixed(2)}`);
          }
        }

        this.addLine(commands);

        // Return Policy
        if (settings.showReturnPolicy !== false && settings.returnPolicyText) {
          this.addText(commands, 'Return Policy:', { align: 'center', bold: true });
          this.addText(commands, settings.returnPolicyText, { align: 'center', size: 0.8 });
        }

        // Signature Area
        if (settings.showSignatureArea !== false) {
          this.addText(commands, '');
          this.addText(commands, '_________________________');
          this.addText(commands, settings.signatureLabel || 'Customer Signature', { align: 'center' });
        }

        // Footer
        if (settings.footerText) {
          this.addText(commands, settings.footerText, { align: 'center' });
        }

        // Feed and cut
        commands.push(0x0A, 0x0A, 0x0A); // Feed 3 lines
        commands.push(0x1D, 0x56, 0x00); // Cut paper

        return new Uint8Array(commands);
      })
    );
  }

  /**
   * Add text with formatting
   */
  private addText(commands: number[], text: string, options: any = {}): void {
    // Set alignment
    if (options.align === 'center') {
      commands.push(0x1B, 0x61, 0x01); // ESC a 1 - Center align
    } else if (options.align === 'right') {
      commands.push(0x1B, 0x61, 0x02); // ESC a 2 - Right align
    } else {
      commands.push(0x1B, 0x61, 0x00); // ESC a 0 - Left align
    }

    // Set text size
    if (options.size === 2) {
      commands.push(0x1D, 0x21, 0x11); // Double width and height
    } else if (options.size === 0.8) {
      commands.push(0x1D, 0x21, 0x00); // Normal size
    }

    // Set bold
    if (options.bold) {
      commands.push(0x1B, 0x45, 0x01); // ESC E 1 - Bold on
    }

    // Add text
    const textBytes = new TextEncoder().encode(text);
    commands.push(...Array.from(textBytes));
    commands.push(0x0A); // Line feed

    // Reset formatting
    if (options.bold) {
      commands.push(0x1B, 0x45, 0x00); // ESC E 0 - Bold off
    }
    if (options.size === 2) {
      commands.push(0x1D, 0x21, 0x00); // Normal size
    }
    commands.push(0x1B, 0x61, 0x00); // Left align
  }

  /**
   * Add line separator
   */
  private addLine(commands: number[]): void {
    commands.push(0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x0A);
  }

  /**
   * Print directly to thermal printer (without preview)
   */
  printDirect(saleData: any, shopInfo: any): Observable<boolean> {
    return this.generateReceiptCommands(saleData, shopInfo).pipe(
      switchMap(commands => {
        return from(this.sendToPrinter(commands));
      }),
      catchError(err => {
        console.error('Print error:', err);
        return of(false);
      })
    );
  }

  /**
   * Send commands to printer
   */
  private async sendToPrinter(commands: Uint8Array): Promise<boolean> {
    try {
      if (!this.printerSettings) {
        await this.loadSettings().toPromise();
      }

      const printerType = this.printerSettings?.printerType || 'usb';

      if (printerType === 'webusb') {
        return await this.printViaWebUSB(commands);
      } else if (printerType === 'network') {
        return await this.printViaNetwork(commands);
      } else {
        // Default: try WebUSB, fallback to browser print
        const webUsbSuccess = await this.printViaWebUSB(commands);
        if (!webUsbSuccess) {
          // Fallback: trigger browser print dialog
          return false;
        }
        return webUsbSuccess;
      }
    } catch (error) {
      console.error('Print error:', error);
      return false;
    }
  }

  private async printViaNetwork(commands: Uint8Array): Promise<boolean> {
    const address = this.printerSettings?.printerAddress || '192.168.1.100';
    const port = this.printerSettings?.printerPort || 9100;

    try {
      // Note: Direct TCP connection from browser is not possible due to security restrictions
      // This would need a backend proxy or WebSocket connection
      // For now, we can try to use a backend API endpoint if available
      
      // Check if there's a backend print endpoint
      const printEndpoint = `/api/printer/print`;
      
      try {
        // Convert commands to base64 for transmission
        const base64Commands = btoa(String.fromCharCode(...commands));
        
        // Try to send via HTTP POST to backend
        const response = await fetch(printEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            address,
            port,
            commands: base64Commands,
          }),
        });

        if (response.ok) {
          return true;
        } else {
          console.warn('Backend print endpoint not available or failed');
          return false;
        }
      } catch (fetchError) {
        console.warn('Network printing requires backend proxy. Falling back to HTML print.');
        return false;
      }
    } catch (error) {
      console.error('Network print error:', error);
      return false;
    }
  }

  private async printViaWebUSB(commands: Uint8Array): Promise<boolean> {
    try {
      if (!('usb' in navigator)) {
        console.warn('WebUSB API not supported in this browser');
        return false;
      }

      // Request device access
      let device;
      try {
        device = await (navigator as any).usb.requestDevice({
          filters: [{ classCode: 7 }] // Printer class
        });
      } catch (error: any) {
        if (error.name === 'NotFoundError') {
          console.warn('No printer device found. Please connect a printer.');
        } else if (error.name === 'SecurityError') {
          console.warn('Permission denied. Please allow USB device access.');
        } else {
          console.error('Error requesting USB device:', error);
        }
        return false;
      }

      if (!device) {
        return false;
      }

      try {
        await device.open();
        await device.selectConfiguration(1);
        
        // Find the correct interface (usually 0 for printers)
        const interfaces = device.configuration.interfaces;
        let interfaceNumber = 0;
        let endpointNumber = 1;
        
        // Try to find the correct interface and endpoint
        for (const iface of interfaces) {
          if (iface.alternate.endpoints) {
            for (const endpoint of iface.alternate.endpoints) {
              if (endpoint.direction === 'out') {
                interfaceNumber = iface.interfaceNumber;
                endpointNumber = endpoint.endpointNumber;
                break;
              }
            }
          }
        }

        await device.claimInterface(interfaceNumber);

        // Send data in chunks (USB endpoint max packet size is usually 64 bytes)
        const chunkSize = 64;
        for (let i = 0; i < commands.length; i += chunkSize) {
          const chunk = commands.slice(i, i + chunkSize);
          await device.transferOut(endpointNumber, chunk);
        }

        // Wait a bit for the printer to process
        await new Promise(resolve => setTimeout(resolve, 500));

        await device.releaseInterface(interfaceNumber);
        await device.close();

        return true;
      } catch (deviceError: any) {
        console.error('Error communicating with printer:', deviceError);
        try {
          await device.close();
        } catch (closeError) {
          // Ignore close errors
        }
        return false;
      }
    } catch (error: any) {
      console.error('WebUSB print error:', error);
      return false;
    }
  }

  /**
   * Get default settings
   */
  private getDefaultSettings(): any {
    return {
      paperSize: '58mm',
      printerType: 'usb',
      showShopName: true,
      showShopAddress: true,
      showShopPhone: true,
      showInvoiceNumber: true,
      showDate: true,
      showTime: true,
      showCustomerInfo: true,
      showSalesmanInfo: true,
      showProductTable: true,
      showTotals: true,
      showPaymentInfo: true,
      showQRCode: true,
      qrCodeType: 'invoice',
      showBarcode: true,
      barcodeType: 'invoice',
      showReturnPolicy: true,
      returnPolicyText: 'No returns or exchanges after purchase.',
      showSignatureArea: false,
      signatureLabel: 'Customer Signature',
      footerText: 'Thank you for your business!',
      printWithoutPreview: false,
      copies: 1,
      autoPrint: false
    };
  }
}

