import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ResponsePayload } from '../../interfaces/core/response-payload.interface';
import { FilterData } from '../../interfaces/gallery/filter-data';
import { BankAccount } from '../../interfaces/common/bank-account.interface';
import { VendorService } from '../vendor/vendor.service';

const API_BANK_ACCOUNT = environment.apiBaseLink + '/api/bank-account/';

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {

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
   * ADD BANK ACCOUNT
   */
  addBankAccount(data: BankAccount): Observable<ResponsePayload> {
    const params = new HttpParams().set('shop', this.getShopId() || '');
    return this.httpClient.post<ResponsePayload>(
      API_BANK_ACCOUNT + 'add', data, { params }
    );
  }

  /**
   * GET ALL BANK ACCOUNTS
   */
  getAllBankAccounts(filterData: FilterData, searchQuery?: string): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    
    return this.httpClient.post<ResponsePayload>(API_BANK_ACCOUNT + 'get-all', filterData, { params });
  }

  /**
   * GET BANK ACCOUNT BY ID
   */
  getBankAccountById(id: string, select?: string): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    if (select) {
      params = params.append('select', select);
    }
    
    return this.httpClient.get<ResponsePayload>(API_BANK_ACCOUNT + id, { params });
  }

  /**
   * UPDATE BANK ACCOUNT BY ID
   */
  updateBankAccountById(id: string, data: Partial<BankAccount>): Observable<ResponsePayload> {
    const params = new HttpParams().set('shop', this.getShopId() || '');
    return this.httpClient.put<ResponsePayload>(
      API_BANK_ACCOUNT + 'update/' + id, data, { params }
    );
  }

  /**
   * DELETE BANK ACCOUNT BY ID
   */
  deleteBankAccountById(id: string): Observable<ResponsePayload> {
    const params = new HttpParams().set('shop', this.getShopId() || '');
    return this.httpClient.delete<ResponsePayload>(API_BANK_ACCOUNT + 'delete/' + id, { params });
  }
}


