import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ResponsePayload } from '../../interfaces/core/response-payload.interface';
import { VendorService } from '../vendor/vendor.service';

const API_CENTRAL_DASHBOARD = environment.apiBaseLink + '/api/central-dashboard/';

@Injectable({
  providedIn: 'root'
})
export class CentralDashboardService {
  constructor(
    private httpClient: HttpClient,
    private vendorService: VendorService
  ) {}

  private getShopId(): string | null {
    return this.vendorService.getShopId();
  }

  getCentralDashboardData(filter?: { startDate?: string; endDate?: string }): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    if (filter?.startDate) {
      params = params.append('startDate', filter.startDate);
    }
    if (filter?.endDate) {
      params = params.append('endDate', filter.endDate);
    }
    
    return this.httpClient.get<ResponsePayload>(API_CENTRAL_DASHBOARD + 'get-data', { params });
  }
}

