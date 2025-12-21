import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ResponsePayload } from '../../interfaces/core/response-payload.interface';
import { FilterData } from '../../interfaces/gallery/filter-data';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import {Sale, SaleGroup, SaleCalculation} from '../../interfaces/common/sale.interface';
import { VendorService } from '../vendor/vendor.service';

const API_URL = environment.apiBaseLink + '/api/sales/';
const RETURN_API_URL = environment.apiBaseLink + '/api/return-sales/';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

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
      console.warn('⚠️ Shop ID not found. Please ensure shop is selected.');
    }
    
    return shopId;
  }

  /**
   * HTTP Methods
   * addSale()
   * getAllSales()
   * getSaleById()
   * updateSaleById()
   * deleteSaleById()
   * deleteMultipleSaleById()
   */

  addSale(data: Sale): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    } else {
      console.error('❌ Shop ID is required for sales operations');
    }
    
    return this.httpClient.post<ResponsePayload>(API_URL + 'add', data, { params });
  }

  getAllSale(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    } else {
      console.error('❌ Shop ID is required for sales operations');
    }
    
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    
    return this.httpClient.post<{ 
      data: Sale[], 
      count: number, 
      success: boolean, 
      calculation?: SaleCalculation,
      reports?: any 
    }>(API_URL + 'get-all', filterData, { params }).pipe(
      map(response => {
        // Map reports to calculation for backward compatibility
        if (response.reports && !response.calculation) {
          response.calculation = {
            grandTotal: response.reports.grandTotal || 0
          };
        }
        return response;
      })
    );
  }

  getProductSales(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    
    return this.httpClient.post<{ 
      data: Sale[], 
      count: number, 
      success: boolean, 
      calculation: SaleCalculation 
    }>(API_URL + 'get-all-product-sale', filterData, { params });
  }

  getSaleById(id: string, select?: string) {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    if (select) {
      params = params.append('select', select);
    }
    
    return this.httpClient.get<{ data: Sale, message: string, success: boolean }>(API_URL + id, { params });
  }

  updateSaleById(id: string, data: Sale) {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    return this.httpClient.put<{ message: string, success: boolean }>(API_URL + 'update/' + id, data, { params });
  }

  deleteSaleById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    
    return this.httpClient.delete<ResponsePayload>(API_URL + 'delete/' + id, { params });
  }

  deleteMultipleSaleById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    
    return this.httpClient.post<ResponsePayload>(API_URL + 'delete-multiple', { ids: ids }, { params });
  }

  /**
   * Return Sales Methods
   */
  addReturnSale(data: any): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    } else {
      console.error('❌ Shop ID is required for return sales operations');
    }
    
    return this.httpClient.post<ResponsePayload>(RETURN_API_URL + 'add', data, { params });
  }

  getAllReturnSales(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    
    return this.httpClient.post<{ 
      data: any[], 
      count: number, 
      success: boolean,
      reports?: any 
    }>(RETURN_API_URL + 'get-all', filterData, { params });
  }
}

