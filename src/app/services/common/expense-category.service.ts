import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ResponsePayload } from '../../interfaces/core/response-payload.interface';
import { ExpenseCategory } from '../../interfaces/common/expense-category.interface';
import { FilterData } from "../../interfaces/gallery/filter-data";

const API_CATEGORY = environment.apiBaseLink + '/api/expense-category/';


@Injectable({
  providedIn: 'root'
})
export class ExpenseCategoryService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addExpenseCategory
   * insertManyExpenseCategory
   * getAllExpenseCategorys
   * getExpenseCategoryById
   * updateExpenseCategoryById
   * updateMultipleExpenseCategoryById
   * deleteExpenseCategoryById
   * deleteMultipleExpenseCategoryById
   */

  addExpenseCategory(data: ExpenseCategory) {
    return this.httpClient.post<ResponsePayload>
    (API_CATEGORY + 'add', data);
  }


  getAllCategories(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: ExpenseCategory[], count: number, success: boolean }>(API_CATEGORY + 'get-all-by-shop', filterData, {params});
  }

  getExpenseCategoryById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: ExpenseCategory, message: string, success: boolean }>(API_CATEGORY + 'get-by-id/' + id, {params});
  }

  updateExpenseCategoryById(id: string, data: ExpenseCategory) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_CATEGORY + 'update/' + id, data);
  }

  updateMultipleExpenseCategoryById(ids: string[], data: ExpenseCategory) {
    const mData = {...{ids: ids}, ...data}
    return this.httpClient.put<ResponsePayload>(API_CATEGORY + 'update-multiple', mData);
  }

  deleteExpenseCategoryById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_CATEGORY + 'delete/' + id, {params});
  }

  deleteMultipleExpenseCategoryById(ids: string[], checkUsage?: boolean) {
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
