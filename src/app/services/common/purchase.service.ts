import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ResponsePayload } from '../../interfaces/core/response-payload.interface';
import { FilterData } from '../../interfaces/gallery/filter-data';
import { Purchase } from '../../interfaces/common/purchase.interface';
import { VendorService } from '../vendor/vendor.service';

const API_PURCHASE = environment.apiBaseLink + '/api/purchase/';
const API_RETURN_PURCHASE = environment.apiBaseLink + '/api/return-purchase/';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

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
      console.error('❌ Shop ID is required for purchase operations');
    }
    return shopId;
  }

  /**
   * ADD PURCHASE
   */
  addPurchase(data: any): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    return this.httpClient.post<ResponsePayload>(API_PURCHASE + 'add', data, { params });
  }

  /**
   * GET ALL PURCHASES
   */
  getAllPurchases(filterData: FilterData, searchQuery?: string): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    if (searchQuery) {
      params = params.append('search', searchQuery);
    }
    
    return this.httpClient.post<ResponsePayload>(API_PURCHASE + 'get-all', filterData, { params });
  }

  /**
   * GET PURCHASE BY ID
   */
  getPurchaseById(id: string, select?: string): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    if (select) {
      params = params.append('select', select);
    }
    
    return this.httpClient.get<ResponsePayload>(API_PURCHASE + id, { params });
  }

  /**
   * UPDATE PURCHASE BY ID
   */
  updatePurchaseById(id: string, data: Partial<Purchase>): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    return this.httpClient.put<ResponsePayload>(API_PURCHASE + 'update/' + id, data, { params });
  }

  /**
   * DELETE PURCHASE BY ID
   */
  deletePurchaseById(id: string): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    return this.httpClient.delete<ResponsePayload>(API_PURCHASE + 'delete/' + id, { params });
  }

  /**
   * GET SUPPLIER PURCHASE HISTORY
   */
  getSupplierPurchaseHistory(supplierId: string): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    return this.httpClient.post<ResponsePayload>(API_PURCHASE + 'supplier-history/' + supplierId, {}, { params });
  }

  /**
   * CALCULATE PROFIT MARGIN
   */
  calculateProfitMargin(productId: string, purchasePrice: number, suggestedMargin?: number): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    params = params.append('productId', productId);
    params = params.append('purchasePrice', purchasePrice.toString());
    
    if (suggestedMargin) {
      params = params.append('suggestedMargin', suggestedMargin.toString());
    }
    
    return this.httpClient.post<ResponsePayload>(API_PURCHASE + 'calculate-profit', {}, { params });
  }

  // ============== RETURN PURCHASE METHODS ==============

  /**
   * ADD RETURN PURCHASE
   */
  addReturnPurchase(data: any): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    return this.httpClient.post<ResponsePayload>(API_RETURN_PURCHASE + 'add', data, { params });
  }

  /**
   * GET ALL RETURN PURCHASES
   */
  getAllReturnPurchases(filterData: FilterData, searchQuery?: string): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    
    return this.httpClient.post<ResponsePayload>(API_RETURN_PURCHASE + 'get-all', filterData, { params });
  }

  /**
   * GET RETURN PURCHASE BY ID
   */
  getReturnPurchaseById(id: string, select?: string): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    if (select) {
      params = params.append('select', select);
    }
    
    return this.httpClient.get<ResponsePayload>(API_RETURN_PURCHASE + id, { params });
  }

  /**
   * DELETE RETURN PURCHASE BY ID
   */
  deleteReturnPurchaseById(id: string): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    return this.httpClient.delete<ResponsePayload>(API_RETURN_PURCHASE + 'delete/' + id, { params });
  }

  /**
   * DELETE MULTIPLE RETURN PURCHASES
   */
  deleteMultipleReturnPurchaseById(ids: string[]): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    return this.httpClient.post<ResponsePayload>(API_RETURN_PURCHASE + 'delete-multiple', { ids }, { params });
  }
}

