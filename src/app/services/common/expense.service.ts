import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ResponsePayload } from '../../interfaces/core/response-payload.interface';
import { Expense } from '../../interfaces/common/expense.interface';
import { FilterData } from "../../interfaces/gallery/filter-data";

const API_CATEGORY = environment.apiBaseLink + '/api/expense/';


@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addExpense
   * insertManyExpense
   * getAllExpenses
   * getExpenseById
   * updateExpenseById
   * updateMultipleExpenseById
   * deleteExpenseById
   * deleteMultipleExpenseById
   */

  addExpense(data: Expense) {
    return this.httpClient.post<ResponsePayload>
    (API_CATEGORY + 'add', data);
  }


  getAllExpenses(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Expense[],categorySummary:any, count: number, success: boolean, }>(API_CATEGORY + 'get-all-by-shop', filterData, {params});
  }

  getExpenseById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Expense, message: string, success: boolean }>(API_CATEGORY + 'get-by-id/' + id, {params});
  }

  updateExpenseById(id: string, data: Expense) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_CATEGORY + 'update/' + id, data);
  }

  updateMultipleExpenseById(ids: string[], data: Expense) {
    const mData = {...{ids: ids}, ...data}
    return this.httpClient.put<ResponsePayload>(API_CATEGORY + 'update-multiple', mData);
  }

  deleteExpenseById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_CATEGORY + 'delete/' + id, {params});
  }

  deleteMultipleExpenseById(ids: string[], checkUsage?: boolean) {
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
  summary(params: { from?: string; to?: string; category?: string }) {
    let httpParams = new HttpParams();
    Object.keys(params || {}).forEach(k => {
      if ((params as any)[k] !== undefined && (params as any)[k] !== null && (params as any)[k] !== '') {
        httpParams = httpParams.set(k, (params as any)[k] as any);
      }
    });
    return this.httpClient.get<{ success: boolean; data: any }>(API_CATEGORY + 'summary', { params: httpParams });
  }

  report(params: { from?: string; to?: string; period?: 'weekly'|'monthly'|'yearly' }) {
    let httpParams = new HttpParams();
    Object.keys(params || {}).forEach(k => {
      if ((params as any)[k] !== undefined && (params as any)[k] !== null && (params as any)[k] !== '') {
        httpParams = httpParams.set(k, (params as any)[k] as any);
      }
    });
    return this.httpClient.get<{ success: boolean; data: any[] }>(API_CATEGORY + 'report', { params: httpParams });
  }

  generatePDFReport(params: { from?: string; to?: string; period?: 'weekly'|'monthly'|'yearly' }) {
    let httpParams = new HttpParams();
    Object.keys(params || {}).forEach(k => {
      if ((params as any)[k] !== undefined && (params as any)[k] !== null && (params as any)[k] !== '') {
        httpParams = httpParams.set(k, (params as any)[k] as any);
      }
    });
    return this.httpClient.get(API_CATEGORY + 'generate-pdf-report', {
      params: httpParams,
      responseType: 'blob'
    });
  }

  getExpenseReportData(params: { from?: string; to?: string; period?: 'weekly'|'monthly'|'yearly' }) {
    let httpParams = new HttpParams();
    Object.keys(params || {}).forEach(k => {
      if ((params as any)[k] !== undefined && (params as any)[k] !== null && (params as any)[k] !== '') {
        httpParams = httpParams.set(k, (params as any)[k] as any);
      }
    });
    return this.httpClient.get<{ success: boolean; data: any }>(API_CATEGORY + 'report-data', { params: httpParams });
  }
}
