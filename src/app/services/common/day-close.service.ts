import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ResponsePayload } from '../../interfaces/core/response-payload.interface';
import { FilterData } from '../../interfaces/gallery/filter-data';
import { DayClose } from '../../interfaces/common/day-close.interface';
import { VendorService } from '../vendor/vendor.service';

const API_DAY_CLOSE = environment.apiBaseLink + '/api/day-close/';

@Injectable({
  providedIn: 'root'
})
export class DayCloseService {

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
    return shopId ? shopId : null;
  }

  /**
   * GET OR CREATE DAY CLOSE
   */
  getOrCreateDayClose(date?: string): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    if (date) {
      params = params.append('date', date);
    }
    
    return this.httpClient.get<ResponsePayload>(API_DAY_CLOSE + 'get-or-create', { params });
  }

  /**
   * CLOSE DAY
   */
  closeDay(date: string, notes?: string): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    if (date) {
      params = params.append('date', date);
    }
    
    const data = { notes: notes || '' };
    
    return this.httpClient.post<ResponsePayload>(API_DAY_CLOSE + 'close', data, { params });
  }

  /**
   * GET ALL DAY CLOSES
   */
  getAllDayCloses(filterData: FilterData, searchQuery?: string): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    
    return this.httpClient.post<ResponsePayload>(API_DAY_CLOSE + 'get-all', filterData, { params });
  }
}


