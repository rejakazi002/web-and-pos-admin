import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ResponsePayload } from '../../interfaces/core/response-payload.interface';
import { VendorService } from '../vendor/vendor.service';

const API_TRANSFER_REQUEST = environment.apiBaseLink + '/api/transfer-request/';

@Injectable({
  providedIn: 'root'
})
export class TransferRequestService {
  constructor(
    private httpClient: HttpClient,
    private vendorService: VendorService
  ) {}

  private getShopId(): string | null {
    return this.vendorService.getShopId();
  }

  createTransferRequest(data: any): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    return this.httpClient.post<ResponsePayload>(API_TRANSFER_REQUEST + 'create', data, { params });
  }

  approveTransferRequest(id: string): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    return this.httpClient.put<ResponsePayload>(API_TRANSFER_REQUEST + 'approve/' + id, {}, { params });
  }

  rejectTransferRequest(id: string, notes?: string): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    return this.httpClient.put<ResponsePayload>(API_TRANSFER_REQUEST + 'reject/' + id, { notes }, { params });
  }

  completeTransfer(id: string, data: any): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    return this.httpClient.put<ResponsePayload>(API_TRANSFER_REQUEST + 'complete/' + id, data, { params });
  }

  cancelTransferRequest(id: string): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    return this.httpClient.put<ResponsePayload>(API_TRANSFER_REQUEST + 'cancel/' + id, {}, { params });
  }

  getTransferRequests(filter?: any): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    if (filter?.status) {
      params = params.append('status', filter.status);
    }
    if (filter?.fromBranch) {
      params = params.append('fromBranch', filter.fromBranch);
    }
    if (filter?.toBranch) {
      params = params.append('toBranch', filter.toBranch);
    }
    if (filter?.startDate) {
      params = params.append('startDate', filter.startDate);
    }
    if (filter?.endDate) {
      params = params.append('endDate', filter.endDate);
    }
    
    return this.httpClient.get<ResponsePayload>(API_TRANSFER_REQUEST + 'get-all', { params });
  }

  getTransferRequestById(id: string): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    return this.httpClient.get<ResponsePayload>(API_TRANSFER_REQUEST + 'get-by-id/' + id, { params });
  }
}

