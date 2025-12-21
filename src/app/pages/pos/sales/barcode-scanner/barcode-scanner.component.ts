import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { BarcodeFormat, Result } from '@zxing/library';
import { UiService } from '../../../../services/core/ui.service';

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.scss']
})
export class BarcodeScannerComponent implements OnInit {
  @ViewChild('scanner', { static: false }) scanner: ZXingScannerComponent;
  @Output() scanResult = new EventEmitter<string>();
  @Output() close = new EventEmitter<void>();

  hasPermission: boolean = false;
  availableDevices: MediaDeviceInfo[] = [];
  currentDevice: MediaDeviceInfo = null;
  scannerEnabled: boolean = false;
  hasDevices: boolean = false;
  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.EAN_13,
    BarcodeFormat.EAN_8,
    BarcodeFormat.UPC_A,
    BarcodeFormat.UPC_E,
    BarcodeFormat.QR_CODE
  ];

  manualBarcode: string = '';

  constructor(private uiService: UiService) {}

  ngOnInit(): void {
    this.checkPermissions();
  }

  async checkPermissions() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
      this.hasPermission = true;
      this.scannerEnabled = true;
    } catch (err) {
      this.hasPermission = false;
      this.uiService.message('Camera permission denied. Please enable camera access.', 'warn');
    }
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.hasDevices = true;
    this.availableDevices = devices;
    
    // Select back camera if available, otherwise first camera
    for (const device of devices) {
      if (/back|rear|environment/gi.test(device.label)) {
        this.currentDevice = device;
        return;
      }
    }
    this.currentDevice = devices[0] || null;
  }

  onScanSuccess(result: Result): void {
    const barcode = result.getText();
    if (barcode) {
      this.scanResult.emit(barcode);
      this.scannerEnabled = false; // Stop scanning after successful scan
      this.closeScanner();
    }
  }

  onScanError(error: any): void {
    // Handle scan errors silently
    console.log('Scan error:', error);
  }

  onManualSubmit(): void {
    if (this.manualBarcode.trim()) {
      this.scanResult.emit(this.manualBarcode.trim());
      this.manualBarcode = '';
      this.closeScanner();
    }
  }

  closeScanner(): void {
    this.scannerEnabled = false;
    this.close.emit();
  }

  toggleScanner(): void {
    this.scannerEnabled = !this.scannerEnabled;
  }
}

