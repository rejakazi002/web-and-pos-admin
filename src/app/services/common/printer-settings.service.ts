import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ResponsePayload } from '../../interfaces/core/response-payload.interface';
import { VendorService } from '../vendor/vendor.service';

const API_PRINTER_SETTINGS = environment.apiBaseLink + '/api/printer-settings/';

@Injectable({
  providedIn: 'root'
})
export class PrinterSettingsService {
  constructor(
    private httpClient: HttpClient,
    private vendorService: VendorService
  ) {}

  private getShopId(): string | null {
    return this.vendorService.getShopId();
  }

  getPrinterSettings(): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    return this.httpClient.get<ResponsePayload>(API_PRINTER_SETTINGS, { params });
  }

  updatePrinterSettings(data: any): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    return this.httpClient.post<ResponsePayload>(API_PRINTER_SETTINGS, data, { params });
  }
}

