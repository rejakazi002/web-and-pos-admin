import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ResponsePayload } from '../../interfaces/core/response-payload.interface';
import { VendorService } from '../vendor/vendor.service';

const API_BRANCH_INVENTORY = environment.apiBaseLink + '/api/branch-inventory/';

@Injectable({
  providedIn: 'root'
})
export class BranchInventoryService {
  constructor(
    private httpClient: HttpClient,
    private vendorService: VendorService
  ) {}

  private getShopId(): string | null {
    return this.vendorService.getShopId();
  }

  addBranchInventory(data: any): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    return this.httpClient.post<ResponsePayload>(API_BRANCH_INVENTORY + 'add', data, { params });
  }

  updateBranchInventory(id: string, data: any): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    return this.httpClient.put<ResponsePayload>(API_BRANCH_INVENTORY + 'update/' + id, data, { params });
  }

  getBranchInventory(branch: string, filter?: any): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    params = params.append('branch', branch);
    
    if (filter?.product) {
      params = params.append('product', filter.product);
    }
    if (filter?.lowStock === true) {
      params = params.append('lowStock', 'true');
    }
    
    return this.httpClient.get<ResponsePayload>(API_BRANCH_INVENTORY + 'get-by-branch', { params });
  }

  getLowStockItems(branch?: string): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    if (branch) {
      params = params.append('branch', branch);
    }
    
    return this.httpClient.get<ResponsePayload>(API_BRANCH_INVENTORY + 'low-stock', { params });
  }

  deleteBranchInventory(id: string): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    return this.httpClient.delete<ResponsePayload>(API_BRANCH_INVENTORY + 'delete/' + id, { params });
  }
}

