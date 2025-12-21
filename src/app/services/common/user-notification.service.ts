import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {UserNotification} from '../../interfaces/common/user-notification.interface';
import { FilterData } from '../../interfaces/gallery/filter-data';

const API_BANNER = environment.apiBaseLink + '/api/user-notification/';


@Injectable({
  providedIn: 'root'
})
export class UserNotificationService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addUserNotification
   * insertManyUserNotification
   * getAllUserNotifications
   * getUserNotificationById
   * updateUserNotificationById
   * updateMultipleUserNotificationById
   * deleteUserNotificationById
   * deleteMultipleUserNotificationById
   */

  addUserNotification(data: UserNotification) {
    return this.httpClient.post<ResponsePayload>
    (API_BANNER + 'add', data);
  }


  getAllUserNotification(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: UserNotification[], count: number, success: boolean }>(API_BANNER + 'get-all-by-shop', filterData, {params});
  }

  getUserNotificationById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: UserNotification, message: string, success: boolean }>(API_BANNER + 'get-by-id/' + id, {params});
  }

  updateUserNotificationById(id: string, data: UserNotification) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_BANNER + 'update/' + id, data);
  }

  updateMultipleUserNotificationById(ids: string[], data: UserNotification) {
    const mData = {...{ids: ids}, ...data}
    return this.httpClient.put<ResponsePayload>(API_BANNER + 'update-multiple', mData);
  }

  deleteUserNotificationById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_BANNER + 'delete/' + id, {params});
  }

  deleteMultipleUserNotificationById(ids: string[], checkUsage?: boolean) {
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
