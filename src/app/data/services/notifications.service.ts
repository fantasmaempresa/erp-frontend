import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CrudService } from '../../core/classes/Crud/CrudService';
import { NotificationDto, NotificationResponseDto } from '../dto';
import { CrudService as CrudServiceO2c, Pagination, ViewContextService } from 'o2c_core';


@Injectable({
  providedIn: 'root',
})
export class NotificationsService extends CrudService<NotificationResponseDto> {
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

  readAllNotifications(notifications: NotificationDto[]): Observable<any> {
    return this.http.put(`${this._base}/0`, { notifications: notifications });
  }
}

@Injectable({
  providedIn: 'root',
})
export class NotificationsServiceV extends CrudServiceO2c<
  NotificationDto,
  Pagination<NotificationDto>
> {
  constructor() {
    super('notifications');
  }
}
