import { Injectable } from '@angular/core';
import { CrudService } from '../../core/classes/Crud/CrudService';
import { NotificationResponse } from '../models/NotificationResponse.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificationModel } from '../models/Notification.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService extends CrudService<NotificationResponse> {
  constructor(private http: HttpClient) {
    super('notifications', http);
  }

  getLast(): Observable<any> {
    return this.http.get(`${this._base}/filter/getLastUserNotifications`);
  }

  getLastUnchecked(): Observable<any> {
    return this.http.get(`${this._base}/filter/getUncheckUserNotifications`);
  }

  getLastChecked(): Observable<any> {
    return this.http.get(`${this._base}/filter/getCheckUserNotifications`);
  }

  readAllNotifications(notifications: NotificationModel[]): Observable<any> {
    return this.http.put(`${this._base}/0`, { notifications: notifications });
  }
}
