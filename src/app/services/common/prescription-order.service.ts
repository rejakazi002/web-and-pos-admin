import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {PrescriptionOrder} from '../../interfaces/common/prescription-order.interface';
import { FilterData } from '../../interfaces/gallery/filter-data';

const API_BANNER = environment.apiBaseLink + '/api/prescription-order/';


@Injectable({
  providedIn: 'root'
})
export class PrescriptionOrderService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addPrescriptionOrder
   * insertManyPrescriptionOrder
   * getAllPrescriptionOrders
   * getPrescriptionOrderById
   * updatePrescriptionOrderById
   * updateMultiplePrescriptionOrderById
   * deletePrescriptionOrderById
   * deleteMultiplePrescriptionOrderById
   */

  addPrescriptionOrder(data: PrescriptionOrder) {
    return this.httpClient.post<ResponsePayload>
    (API_BANNER + 'add', data);
  }


  getAllPrescriptionOrder(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: PrescriptionOrder[], count: number, success: boolean }>(API_BANNER + 'get-all-by-shop', filterData, {params});
  }

  getPrescriptionOrderById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: PrescriptionOrder, message: string, success: boolean }>(API_BANNER + 'get-by-id/' + id, {params});
  }

  updatePrescriptionOrderById(id: string, data: PrescriptionOrder) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_BANNER + 'update/' + id, data);
  }

  updateMultiplePrescriptionOrderById(ids: string[], data: PrescriptionOrder) {
    const mData = {...{ids: ids}, ...data}
    return this.httpClient.put<ResponsePayload>(API_BANNER + 'update-multiple', mData);
  }

  deletePrescriptionOrderById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_BANNER + 'delete/' + id, {params});
  }

  deleteMultiplePrescriptionOrderById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_BANNER + 'delete-multiple', {ids: ids}, {params});
  }

  deleteAllTrashByShop( checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_BANNER + 'delete-all-trash-by-shop', {params});
  }
}
