import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {FilterData} from "../../interfaces/gallery/filter-data";
import {LandingPage} from "../../interfaces/common/landing-page.interface";
import { ReadyLandingPage } from "../../interfaces/common/ready-landing-page.interface";
const API_BRAND = environment.apiBaseLink + '/api/ready-landing-page/';


@Injectable({
  providedIn: 'root'
})
export class ReadyLandingPageService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addReadyLandingPage
   * insertManyReadyLandingPage
   * getAllReadyLandingPages
   * getReadyLandingPageById
   * updateReadyLandingPageById
   * updateMultipleReadyLandingPageById
   * deleteReadyLandingPageById
   * deleteMultipleReadyLandingPageById
   */

  addReadyLandingPage(data: ReadyLandingPage) {
    return this.httpClient.post<ResponsePayload>
    (API_BRAND + 'add', data);
  }


  getAllReadyLandingPages(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: ReadyLandingPage[], count: number, success: boolean }>(API_BRAND + 'get-all-by-shop', filterData, {params});
  }

  getReadyLandingPageById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: ReadyLandingPage, message: string, success: boolean }>(API_BRAND + 'get-by-id/' + id, {params});
  }

  updateReadyLandingPageById(id: string, data: ReadyLandingPage) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_BRAND + 'update/' + id, data);
  }

  updateMultipleReadyLandingPageById(ids: string[], data: ReadyLandingPage) {
    const mData = {...{ids: ids}, ...data}
    return this.httpClient.put<ResponsePayload>(API_BRAND + 'update-multiple', mData);
  }

  deleteReadyLandingPageById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_BRAND + 'delete/' + id, {params});
  }

  deleteMultipleReadyLandingPageById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_BRAND + 'delete-multiple', {ids: ids}, {params});
  }

  deleteAllTrashByShop( checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_BRAND + 'delete-all-trash-by-shop', {params});
  }

  cloneSingleProduct(id: string) {
    return this.httpClient.post<ResponsePayload>(
      `${API_BRAND}clone`,
      { id }
    );
  }


  addLandingPageFromGadget() {
    return this.httpClient.post<ResponsePayload>
    (API_BRAND + 'add-from-gatet', {});
  }

  /**
   * getLandingPage()
   */

  getLandingBySlug(slug: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{
      data: LandingPage,
      message: string,
      success: boolean
    }>(API_BRAND + 'get-by-slug/' + slug, {params});
  }
}
