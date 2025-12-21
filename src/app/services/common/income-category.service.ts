import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ResponsePayload } from '../../interfaces/core/response-payload.interface';
import { IncomeCategory } from '../../interfaces/common/income-category.interface';
import { FilterData } from "../../interfaces/gallery/filter-data";

const API_CATEGORY = environment.apiBaseLink + '/api/income-category/';


@Injectable({
  providedIn: 'root'
})
export class IncomeCategoryService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addIncomeCategory
   * insertManyIncomeCategory
   * getAllIncomeCategorys
   * getIncomeCategoryById
   * updateIncomeCategoryById
   * updateMultipleIncomeCategoryById
   * deleteIncomeCategoryById
   * deleteMultipleIncomeCategoryById
   */

  addIncomeCategory(data: IncomeCategory) {
    return this.httpClient.post<ResponsePayload>
    (API_CATEGORY + 'add', data);
  }


  getAllCategories(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: IncomeCategory[], count: number, success: boolean }>(API_CATEGORY + 'get-all-by-shop', filterData, {params});
  }

  getIncomeCategoryById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: IncomeCategory, message: string, success: boolean }>(API_CATEGORY + 'get-by-id/' + id, {params});
  }

  updateIncomeCategoryById(id: string, data: IncomeCategory) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_CATEGORY + 'update/' + id, data);
  }

  updateMultipleIncomeCategoryById(ids: string[], data: IncomeCategory) {
    const mData = {...{ids: ids}, ...data}
    return this.httpClient.put<ResponsePayload>(API_CATEGORY + 'update-multiple', mData);
  }

  deleteIncomeCategoryById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_CATEGORY + 'delete/' + id, {params});
  }

  deleteMultipleIncomeCategoryById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_CATEGORY + 'delete-multiple', {ids: ids}, {params});
  }

  deleteAllTrashByShop( checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_CATEGORY + 'delete-all-trash-by-shop', {params});
  }

}

