import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ResponsePayload } from '../../interfaces/core/response-payload.interface';
import { Point } from '../../interfaces/common/point.interface';
import { VendorService } from '../vendor/vendor.service';

const API_POINT = environment.apiBaseLink + '/api/point/';

@Injectable({
  providedIn: 'root'
})
export class PointService {

  constructor(
    private httpClient: HttpClient,
    private vendorService: VendorService
  ) {
  }

  /**
   * Get Shop ID from Vendor Service
   */
  private getShopId(): string | null {
    const shopId = this.vendorService.getShopId();
    if (!shopId) {
      console.error('❌ Shop ID is required for point operations');
    }
    return shopId;
  }

  /**
   * ADD/UPDATE POINT SETTINGS
   */
  addPoint(data: Point): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    return this.httpClient.post<ResponsePayload>(API_POINT + 'add', data, { params });
  }

  /**
   * GET POINT SETTINGS
   */
  getPoint(select?: string): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    if (select) {
      params = params.append('select', select);
    }
    
    return this.httpClient.get<ResponsePayload>(API_POINT + 'get', { params });
  }
}

