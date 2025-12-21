import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ResponsePayload } from '../../interfaces/core/response-payload.interface';
import { VendorService } from '../vendor/vendor.service';

const API_BRANCH_ACCESS = environment.apiBaseLink + '/api/branch-access/';

@Injectable({
  providedIn: 'root'
})
export class BranchAccessService {
  constructor(
    private httpClient: HttpClient,
    private vendorService: VendorService
  ) {}

  private getShopId(): string | null {
    return this.vendorService.getShopId();
  }

  assignBranchAccess(data: {
    userId: string;
    branches: string[];
    permissions: {
      canView?: boolean;
      canEdit?: boolean;
      canDelete?: boolean;
      canTransfer?: boolean;
      canApproveTransfer?: boolean;
    };
  }): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    return this.httpClient.post<ResponsePayload>(API_BRANCH_ACCESS + 'assign', data, { params });
  }

  getUserBranches(userId: string): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    params = params.append('userId', userId);
    
    return this.httpClient.get<ResponsePayload>(API_BRANCH_ACCESS + 'get-user-branches', { params });
  }

  getMyBranches(): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    return this.httpClient.get<ResponsePayload>(API_BRANCH_ACCESS + 'get-my-branches', { params });
  }

  getAllBranchAccess(): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    return this.httpClient.get<ResponsePayload>(API_BRANCH_ACCESS + 'get-all', { params });
  }

  revokeBranchAccess(userId: string, branch?: string): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    params = params.append('userId', userId);
    if (branch) {
      params = params.append('branch', branch);
    }
    
    return this.httpClient.delete<ResponsePayload>(API_BRANCH_ACCESS + 'revoke', { params });
  }
}

