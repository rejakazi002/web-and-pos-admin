import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {PcBuilder} from '../../interfaces/common/pc-builder.interface';
import { FilterData } from '../../interfaces/gallery/filter-data';

const API_BANNER = environment.apiBaseLink + '/api/pc-builder/';


@Injectable({
  providedIn: 'root'
})
export class PcBuilderService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addPcBuilder
   * insertManyPcBuilder
   * getAllPcBuilders
   * getPcBuilderById
   * updatePcBuilderById
   * updateMultiplePcBuilderById
   * deletePcBuilderById
   * deleteMultiplePcBuilderById
   */

  addPcBuilder(data: PcBuilder) {
    return this.httpClient.post<ResponsePayload>
    (API_BANNER + 'add', data);
  }


  getAllPcBuilder(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: PcBuilder[], count: number, success: boolean }>(API_BANNER + 'get-all-by-shop', filterData, {params});
  }

  getPcBuilderById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: PcBuilder, message: string, success: boolean }>(API_BANNER + 'get-by-id/' + id, {params});
  }

  updatePcBuilderById(id: string, data: PcBuilder) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_BANNER + 'update/' + id, data);
  }

  updateMultiplePcBuilderById(ids: string[], data: PcBuilder) {
    const mData = {...{ids: ids}, ...data}
    return this.httpClient.put<ResponsePayload>(API_BANNER + 'update-multiple', mData);
  }

  deletePcBuilderById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_BANNER + 'delete/' + id, {params});
  }

  deleteMultiplePcBuilderById(ids: string[], checkUsage?: boolean) {
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
