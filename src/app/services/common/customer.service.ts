import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ResponsePayload } from '../../interfaces/core/response-payload.interface';
import { FilterData } from '../../interfaces/gallery/filter-data';
import { Customer } from '../../interfaces/common/customer.interface';
import { VendorService } from '../vendor/vendor.service';

const API_CUSTOMER = environment.apiBaseLink + '/api/customer/';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

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
      console.error('❌ Shop ID is required for customer operations');
    }
    return shopId;
  }

  /**
   * ADD CUSTOMER
   */
  addCustomer(data: Customer): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    return this.httpClient.post<ResponsePayload>(API_CUSTOMER + 'add', data, { params });
  }

  /**
   * GET ALL CUSTOMERS
   */
  getAllCustomers(filterData: FilterData, searchQuery?: string): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    
    return this.httpClient.post<ResponsePayload>(API_CUSTOMER + 'get-all', filterData, { params });
  }

  /**
   * GET CUSTOMER BY ID
   */
  getCustomerById(id: string, select?: string): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    if (select) {
      params = params.append('select', select);
    }
    
    return this.httpClient.get<ResponsePayload>(API_CUSTOMER + id, { params });
  }

  /**
   * GET CUSTOMER BY NAME
   */
  getCustomerByName(name: string, select?: string): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    if (select) {
      params = params.append('select', select);
    }
    
    params = params.append('name', name);
    
    return this.httpClient.get<ResponsePayload>(API_CUSTOMER + 'get-by-customer', { params });
  }

  /**
   * UPDATE CUSTOMER BY ID
   */
  updateCustomerById(id: string, data: Customer): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    return this.httpClient.put<ResponsePayload>(API_CUSTOMER + 'update/' + id, data, { params });
  }

  /**
   * DELETE CUSTOMER BY ID
   */
  deleteCustomerById(id: string, checkUsage?: boolean): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    
    return this.httpClient.delete<ResponsePayload>(API_CUSTOMER + 'delete/' + id, { params });
  }

  /**
   * DELETE MULTIPLE CUSTOMERS BY ID
   */
  deleteMultipleCustomerById(ids: string[], checkUsage?: boolean): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    
    return this.httpClient.post<ResponsePayload>(
      API_CUSTOMER + 'delete-multiple',
      { ids },
      { params }
    );
  }

  /**
   * GET CUSTOMER PURCHASE HISTORY
   */
  getCustomerPurchaseHistory(customerId: string, filterData: FilterData): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    return this.httpClient.post<ResponsePayload>(
      API_CUSTOMER + 'purchase-history/' + customerId,
      filterData,
      { params }
    );
  }

  /**
   * UPDATE CUSTOMER DUE AMOUNT
   */
  updateCustomerDue(customerId: string, amount: number, type: 'add' | 'subtract'): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    return this.httpClient.put<ResponsePayload>(
      API_CUSTOMER + 'update-due/' + customerId,
      { amount, type },
      { params }
    );
  }

  /**
   * UPDATE CUSTOMER WALLET BALANCE
   */
  updateWalletBalance(customerId: string, amount: number, type: 'add' | 'subtract' | 'set'): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    return this.httpClient.put<ResponsePayload>(
      API_CUSTOMER + 'update-wallet/' + customerId,
      { amount, type },
      { params }
    );
  }

  /**
   * GET CUSTOMERS BY GROUP
   */
  getCustomersByGroup(group: 'VIP' | 'General' | 'Wholesale', filterData: FilterData): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    return this.httpClient.post<ResponsePayload>(
      API_CUSTOMER + 'get-by-group/' + group,
      filterData,
      { params }
    );
  }

  /**
   * GET CUSTOMERS WITH DUE
   */
  getCustomersWithDue(filterData: FilterData): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    return this.httpClient.post<ResponsePayload>(
      API_CUSTOMER + 'get-with-due',
      filterData,
      { params }
    );
  }

  /**
   * GET CUSTOMER STATISTICS
   */
  getCustomerStats(customerId: string): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    return this.httpClient.get<ResponsePayload>(API_CUSTOMER + 'stats/' + customerId, { params });
  }
}

