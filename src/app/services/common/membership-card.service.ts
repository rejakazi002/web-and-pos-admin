import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ResponsePayload } from '../../interfaces/core/response-payload.interface';
import { FilterData } from '../../interfaces/gallery/filter-data';
import { MembershipCard } from '../../interfaces/common/membership-card.interface';
import { VendorService } from '../vendor/vendor.service';

const API_MEMBERSHIP_CARD = environment.apiBaseLink + '/api/membership-card/';

@Injectable({
  providedIn: 'root'
})
export class MembershipCardService {

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
      console.error('❌ Shop ID is required for membership card operations');
    }
    return shopId;
  }

  /**
   * ADD MEMBERSHIP CARD
   */
  addMembershipCard(data: MembershipCard): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    return this.httpClient.post<ResponsePayload>(API_MEMBERSHIP_CARD, data, { params });
  }

  /**
   * GET ALL MEMBERSHIP CARDS
   */
  getAllMembershipCards(filterData: FilterData, searchQuery?: string): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    
    // Convert FilterData to the format expected by the API
    const apiFilterData: any = {
      filter: filterData.filter || {},
      pagination: filterData.pagination || {},
      sort: filterData.sort || {},
    };
    
    if (filterData.select) {
      apiFilterData.select = JSON.stringify(filterData.select);
    }
    
    return this.httpClient.post<ResponsePayload>(API_MEMBERSHIP_CARD + 'get-all', apiFilterData, { params });
  }

  /**
   * GET MEMBERSHIP CARD BY CUSTOMER
   */
  getMembershipCardByCustomer(customerId: string): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    return this.httpClient.get<ResponsePayload>(API_MEMBERSHIP_CARD + 'customer/' + customerId, { params });
  }

  /**
   * UPDATE MEMBERSHIP CARD
   */
  updateMembershipCard(cardId: string, data: Partial<MembershipCard>): Observable<ResponsePayload> {
    let params = new HttpParams();
    const shopId = this.getShopId();
    
    if (shopId) {
      params = params.append('shop', shopId);
    }
    
    return this.httpClient.put<ResponsePayload>(API_MEMBERSHIP_CARD + cardId, data, { params });
  }
}

