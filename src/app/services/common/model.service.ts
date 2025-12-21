import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ResponsePayload } from '../../interfaces/core/response-payload.interface';
import { FilterData } from '../../interfaces/gallery/filter-data';

const API_MODEL = environment.apiBaseLink + '/api/pattern/';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addModel
   * getAllModels
   * getModelById
   * updateModelById
   * deleteModelById
   * deleteMultipleModelById
   */

  addModel(data: any) {
    return this.httpClient.post<ResponsePayload>(API_MODEL + 'add', data);
  }

  addModelByShop(data: any) {
    return this.httpClient.post<ResponsePayload>(API_MODEL + 'add-by-shop', data);
  }

  getAllModels(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: any[], count: number, success: boolean }>(API_MODEL + 'get-all-by-shop/', filterData, {params});
  }

  getAllModels1(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: any[], count: number, success: boolean }>(API_MODEL + 'get-all/', filterData, {params});
  }

  getModelById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: any, message: string, success: boolean }>(API_MODEL + id, {params});
  }

  updateModelById(id: string, data: any) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_MODEL + 'update/' + id, data);
  }

  deleteModelById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_MODEL + 'delete/' + id, {params});
  }

  deleteMultipleModelById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_MODEL + 'delete-multiple', {ids: ids}, {params});
  }
}

