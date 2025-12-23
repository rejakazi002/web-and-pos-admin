import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {Service} from '../../interfaces/common/service.interface';
import { FilterData } from '../../interfaces/gallery/filter-data';

const API_BANNER = environment.apiBaseLink + '/api/service-page/';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addService
   * insertManyService
   * getAllServices
   * getServiceById
   * updateServiceById
   * updateMultipleServiceById
   * deleteServiceById
   * deleteMultipleServiceById
   */

  addService(data: Service) {
    return this.httpClient.post<ResponsePayload>
    (API_BANNER + 'add', data);
  }


  getAllService(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Service[], count: number, success: boolean }>(API_BANNER + 'get-all-by-shop', filterData, {params});
  }

  getServiceById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Service, message: string, success: boolean }>(API_BANNER + 'get-by-id/' + id, {params});
  }

  updateServiceById(id: string, data: Service) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_BANNER + 'update/' + id, data);
  }

  updateMultipleServiceById(ids: string[], data: Service) {
    const mData = {...{ids: ids}, ...data}
    return this.httpClient.put<ResponsePayload>(API_BANNER + 'update-multiple', mData);
  }

  deleteServiceById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_BANNER + 'delete/' + id, {params});
  }

  deleteMultipleServiceById(ids: string[], checkUsage?: boolean) {
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
