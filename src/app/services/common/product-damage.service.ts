import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ResponsePayload } from '../../interfaces/core/response-payload.interface';
import { FilterData } from '../../interfaces/gallery/filter-data';
import { VendorService } from '../vendor/vendor.service';

const API_PRODUCT_DAMAGE = environment.apiBaseLink + '/api/product-damage/';

@Injectable({
  providedIn: 'root'
})
export class ProductDamageService {

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
      console.error('❌ Shop ID is required for product damage operations');
    }
    return shopId;
  }

  /**
   * ADD PRODUCT DAMAGE
   */
  addProductDamage(data: any): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    return this.httpClient.post<ResponsePayload>(API_PRODUCT_DAMAGE + 'add', data, { params });
  }

  /**
   * GET ALL PRODUCT DAMAGES
   */
  getAllProductDamages(filter: FilterData, searchQuery?: string): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    
    return this.httpClient.post<ResponsePayload>(API_PRODUCT_DAMAGE + 'get-all', filter, { params });
  }

  /**
   * GET PRODUCT DAMAGE BY ID
   */
  getProductDamageById(id: string, select?: string): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    if (select) {
      params = params.append('select', select);
    }
    
    return this.httpClient.get<ResponsePayload>(API_PRODUCT_DAMAGE + id, { params });
  }

  /**
   * GET PRODUCT DAMAGE BY DATE
   */
  getProductDamageByDate(date: string, select?: string): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    params = params.append('date', date);
    
    if (select) {
      params = params.append('select', select);
    }
    
    return this.httpClient.get<ResponsePayload>(API_PRODUCT_DAMAGE + 'get-by-date', { params });
  }

  /**
   * UPDATE PRODUCT DAMAGE BY ID
   */
  updateProductDamageById(id: string, data: any): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    return this.httpClient.put<ResponsePayload>(API_PRODUCT_DAMAGE + 'update/' + id, data, { params });
  }

  /**
   * DELETE PRODUCT DAMAGE BY ID
   */
  deleteProductDamageById(id: string, checkUsage: boolean = false): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    params = params.append('checkUsage', checkUsage.toString());
    
    return this.httpClient.delete<ResponsePayload>(API_PRODUCT_DAMAGE + 'delete/' + id, { params });
  }

  /**
   * DELETE MULTIPLE PRODUCT DAMAGES
   */
  deleteMultipleProductDamagesById(ids: string[], checkUsage: boolean = false): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    params = params.append('checkUsage', checkUsage.toString());
    
    return this.httpClient.post<ResponsePayload>(API_PRODUCT_DAMAGE + 'delete-multiple', { ids }, { params });
  }
}

