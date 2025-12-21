import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ResponsePayload } from '../../interfaces/core/response-payload.interface';
import { FilterData } from '../../interfaces/gallery/filter-data';
import { VendorService } from '../vendor/vendor.service';

const API_STOCK_ADJUSTMENT = environment.apiBaseLink + '/api/stock-adjustment/';

@Injectable({
  providedIn: 'root'
})
export class StockAdjustmentService {

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
      console.error('❌ Shop ID is required for stock adjustment operations');
    }
    return shopId;
  }

  /**
   * ADD STOCK ADJUSTMENT
   */
  addStockAdjustment(data: any): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    return this.httpClient.post<ResponsePayload>(API_STOCK_ADJUSTMENT + 'add', data, { params });
  }

  /**
   * GET ALL STOCK ADJUSTMENTS
   */
  getAllStockAdjustments(filter: FilterData, searchQuery?: string): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    
    return this.httpClient.post<ResponsePayload>(API_STOCK_ADJUSTMENT + 'get-all', filter, { params });
  }

  /**
   * GET STOCK ADJUSTMENT BY ID
   */
  getStockAdjustmentById(id: string, select?: string): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    if (select) {
      params = params.append('select', select);
    }
    
    return this.httpClient.get<ResponsePayload>(API_STOCK_ADJUSTMENT + id, { params });
  }

  /**
   * UPDATE STOCK ADJUSTMENT BY ID
   */
  updateStockAdjustmentById(id: string, data: any): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    return this.httpClient.put<ResponsePayload>(API_STOCK_ADJUSTMENT + 'update/' + id, data, { params });
  }

  /**
   * DELETE STOCK ADJUSTMENT BY ID
   */
  deleteStockAdjustmentById(id: string): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    return this.httpClient.delete<ResponsePayload>(API_STOCK_ADJUSTMENT + 'delete/' + id, { params });
  }
}

