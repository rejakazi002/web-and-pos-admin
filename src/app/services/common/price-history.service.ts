import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ResponsePayload } from '../../interfaces/core/response-payload.interface';
import { FilterData } from '../../interfaces/gallery/filter-data';
import { VendorService } from '../vendor/vendor.service';

const API_PRICE_HISTORY = environment.apiBaseLink + '/api/price-history/';

@Injectable({
  providedIn: 'root'
})
export class PriceHistoryService {

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
      console.error('❌ Shop ID is required for price history operations');
    }
    return shopId;
  }

  /**
   * GET ALL PRICE HISTORY
   */
  getAllPriceHistory(filter: FilterData, searchQuery?: string): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    
    return this.httpClient.post<ResponsePayload>(API_PRICE_HISTORY + 'get-all', filter, { params });
  }

  /**
   * GET PRICE HISTORY BY PRODUCT
   */
  getPriceHistoryByProduct(productId: string): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    return this.httpClient.get<ResponsePayload>(API_PRICE_HISTORY + 'product/' + productId, { params });
  }
}

