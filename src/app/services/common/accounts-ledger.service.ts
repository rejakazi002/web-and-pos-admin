import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ResponsePayload } from '../../interfaces/core/response-payload.interface';
import { FilterData } from '../../interfaces/gallery/filter-data';
import { VendorService } from '../vendor/vendor.service';

const API_ACCOUNTS_LEDGER = environment.apiBaseLink + '/api/accounts-ledger/';

@Injectable({
  providedIn: 'root'
})
export class AccountsLedgerService {

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
   * GET ALL LEDGER ENTRIES
   */
  getAllLedgerEntries(filterData: FilterData, searchQuery?: string): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    
    return this.httpClient.post<ResponsePayload>(API_ACCOUNTS_LEDGER + 'get-all', filterData, { params });
  }

  /**
   * GET LEDGER SUMMARY
   */
  getLedgerSummary(startDate?: string, endDate?: string, month?: number, year?: number): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    if (startDate) {
      params = params.append('startDate', startDate);
    }
    
    if (endDate) {
      params = params.append('endDate', endDate);
    }
    
    if (month) {
      params = params.append('month', month.toString());
    }
    
    if (year) {
      params = params.append('year', year.toString());
    }
    
    return this.httpClient.get<ResponsePayload>(API_ACCOUNTS_LEDGER + 'summary/get-summary', { params });
  }

  /**
   * GET CURRENT BALANCE
   */
  getCurrentBalance(): Observable<ResponsePayload> {
    const params = new HttpParams().set('shop', this.getShopId() || '');
    return this.httpClient.get<ResponsePayload>(API_ACCOUNTS_LEDGER + 'balance/get-current', { params });
  }
}


