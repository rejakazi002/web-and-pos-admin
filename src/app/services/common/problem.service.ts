import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ResponsePayload } from '../../interfaces/core/response-payload.interface';
import { FilterData } from '../../interfaces/gallery/filter-data';

const API_PROBLEM = environment.apiBaseLink + '/api/problem/';

@Injectable({
  providedIn: 'root'
})
export class ProblemService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addProblem
   * getAllProblems
   * getProblemById
   * updateProblemById
   * deleteProblemById
   * deleteMultipleProblemById
   */

  addProblem(data: any) {
    return this.httpClient.post<ResponsePayload>(API_PROBLEM + 'add', data);
  }

  addProblemByShop(data: any) {
    return this.httpClient.post<ResponsePayload>(API_PROBLEM + 'add-by-shop', data);
  }

  getAllProblems(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: any[], count: number, success: boolean }>(API_PROBLEM + 'get-all-by-shop/', filterData, {params});
  }

  getAllProblems1(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: any[], count: number, success: boolean }>(API_PROBLEM + 'get-all/', filterData, {params});
  }

  getProblemById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: any, message: string, success: boolean }>(API_PROBLEM + id, {params});
  }

  updateProblemById(id: string, data: any) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_PROBLEM + 'update/' + id, data);
  }

  deleteProblemById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_PROBLEM + 'delete/' + id, {params});
  }

  deleteMultipleProblemById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_PROBLEM + 'delete-multiple', {ids: ids}, {params});
  }
}

