import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ResponsePayload } from '../../interfaces/core/response-payload.interface';
import { FilterData } from '../../interfaces/gallery/filter-data';
import { CashTransaction } from '../../interfaces/common/cash-transaction.interface';
import { VendorService } from '../vendor/vendor.service';

const API_CASH_TRANSACTION = environment.apiBaseLink + '/api/cash-transaction/';

@Injectable({
  providedIn: 'root'
})
export class CashTransactionService {

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
   * ADD CASH TRANSACTION
   */
  addCashTransaction(data: Partial<CashTransaction>): Observable<ResponsePayload> {
    const params = new HttpParams().set('shop', this.getShopId() || '');
    return this.httpClient.post<ResponsePayload>(
      API_CASH_TRANSACTION + 'add', data, { params }
    );
  }

  /**
   * GET ALL CASH TRANSACTIONS
   */
  getAllCashTransactions(filterData: FilterData, searchQuery?: string): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    
    return this.httpClient.post<ResponsePayload>(API_CASH_TRANSACTION + 'get-all', filterData, { params });
  }

  /**
   * GET CASH TRANSACTION BY ID
   */
  getCashTransactionById(id: string, select?: string): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    if (select) {
      params = params.append('select', select);
    }
    
    return this.httpClient.get<ResponsePayload>(API_CASH_TRANSACTION + id, { params });
  }

  /**
   * UPDATE CASH TRANSACTION BY ID
   */
  updateCashTransactionById(id: string, data: Partial<CashTransaction>): Observable<ResponsePayload> {
    const params = new HttpParams().set('shop', this.getShopId() || '');
    return this.httpClient.put<ResponsePayload>(
      API_CASH_TRANSACTION + 'update/' + id, data, { params }
    );
  }

  /**
   * DELETE CASH TRANSACTION BY ID
   */
  deleteCashTransactionById(id: string): Observable<ResponsePayload> {
    const params = new HttpParams().set('shop', this.getShopId() || '');
    return this.httpClient.delete<ResponsePayload>(API_CASH_TRANSACTION + 'delete/' + id, { params });
  }

  /**
   * GET CASH TRANSACTION SUMMARY
   */
  getCashTransactionSummary(startDate?: string, endDate?: string, month?: number, year?: number): Observable<ResponsePayload> {
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
    
    return this.httpClient.get<ResponsePayload>(API_CASH_TRANSACTION + 'summary/get-summary', { params });
  }
}


