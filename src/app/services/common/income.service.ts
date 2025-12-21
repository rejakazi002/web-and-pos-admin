import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ResponsePayload } from '../../interfaces/core/response-payload.interface';
import { Income } from '../../interfaces/common/income.interface';
import { FilterData } from "../../interfaces/gallery/filter-data";

const API_INCOME = environment.apiBaseLink + '/api/income/';


@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addIncome
   * insertManyIncome
   * getAllIncomes
   * getIncomeById
   * updateIncomeById
   * updateMultipleIncomeById
   * deleteIncomeById
   * deleteMultipleIncomeById
   */

  addIncome(data: Income) {
    return this.httpClient.post<ResponsePayload>
    (API_INCOME + 'add', data);
  }


  getAllIncomes(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Income[],categorySummary:any, count: number, success: boolean, }>(API_INCOME + 'get-all-by-shop', filterData, {params});
  }

  getIncomeById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Income, message: string, success: boolean }>(API_INCOME + 'get-by-id/' + id, {params});
  }

  updateIncomeById(id: string, data: Income) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_INCOME + 'update/' + id, data);
  }

  updateMultipleIncomeById(ids: string[], data: Income) {
    const mData = {...{ids: ids}, ...data}
    return this.httpClient.put<ResponsePayload>(API_INCOME + 'update-multiple', mData);
  }

  deleteIncomeById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_INCOME + 'delete/' + id, {params});
  }

  deleteMultipleIncomeById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_INCOME + 'delete-multiple', {ids: ids}, {params});
  }

  deleteAllTrashByShop( checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_INCOME + 'delete-all-trash-by-shop', {params});
  }
  summary(params: { from?: string; to?: string; category?: string }) {
    let httpParams = new HttpParams();
    Object.keys(params || {}).forEach(k => {
      if ((params as any)[k] !== undefined && (params as any)[k] !== null && (params as any)[k] !== '') {
        httpParams = httpParams.set(k, (params as any)[k] as any);
      }
    });
    return this.httpClient.get<{ success: boolean; data: any }>(API_INCOME + 'summary', { params: httpParams });
  }

  report(params: { from?: string; to?: string; period?: 'weekly'|'monthly'|'yearly' }) {
    let httpParams = new HttpParams();
    Object.keys(params || {}).forEach(k => {
      if ((params as any)[k] !== undefined && (params as any)[k] !== null && (params as any)[k] !== '') {
        httpParams = httpParams.set(k, (params as any)[k] as any);
      }
    });
    return this.httpClient.get<{ success: boolean; data: any[] }>(API_INCOME + 'report', { params: httpParams });
  }

  generatePDFReport(params: { from?: string; to?: string; period?: 'weekly'|'monthly'|'yearly' }) {
    let httpParams = new HttpParams();
    Object.keys(params || {}).forEach(k => {
      if ((params as any)[k] !== undefined && (params as any)[k] !== null && (params as any)[k] !== '') {
        httpParams = httpParams.set(k, (params as any)[k] as any);
      }
    });
    return this.httpClient.get(API_INCOME + 'generate-pdf-report', {
      params: httpParams,
      responseType: 'blob'
    });
  }

  getIncomeReportData(params: { from?: string; to?: string; period?: 'weekly'|'monthly'|'yearly' }) {
    let httpParams = new HttpParams();
    Object.keys(params || {}).forEach(k => {
      if ((params as any)[k] !== undefined && (params as any)[k] !== null && (params as any)[k] !== '') {
        httpParams = httpParams.set(k, (params as any)[k] as any);
      }
    });
    return this.httpClient.get<{ success: boolean; data: any }>(API_INCOME + 'report-data', { params: httpParams });
  }
}

