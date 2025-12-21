import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ResponsePayload } from '../../interfaces/core/response-payload.interface';
import { VendorService } from '../vendor/vendor.service';

const API_CENTRAL_PRODUCT = environment.apiBaseLink + '/api/central-product/';

@Injectable({
  providedIn: 'root'
})
export class CentralProductService {
  constructor(
    private httpClient: HttpClient,
    private vendorService: VendorService
  ) {}

  private getShopId(): string | null {
    return this.vendorService.getShopId();
  }

  getCentralProducts(filter?: any): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    if (filter?.search) {
      params = params.append('search', filter.search);
    }
    if (filter?.category) {
      params = params.append('category', filter.category);
    }
    if (filter?.status) {
      params = params.append('status', filter.status);
    }
    if (filter?.page) {
      params = params.append('page', filter.page.toString());
    }
    if (filter?.limit) {
      params = params.append('limit', filter.limit.toString());
    }
    
    return this.httpClient.get<ResponsePayload>(API_CENTRAL_PRODUCT + 'get-all', { params });
  }

  syncProductToBranches(productId: string, branches: string[]): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    return this.httpClient.post<ResponsePayload>(
      API_CENTRAL_PRODUCT + 'sync-to-branches/' + productId,
      { branches },
      { params }
    );
  }

  markAsCentralProduct(productId: string): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    return this.httpClient.put<ResponsePayload>(
      API_CENTRAL_PRODUCT + 'mark-as-central/' + productId,
      {},
      { params }
    );
  }

  unmarkAsCentralProduct(productId: string): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    return this.httpClient.put<ResponsePayload>(
      API_CENTRAL_PRODUCT + 'unmark-as-central/' + productId,
      {},
      { params }
    );
  }
}

