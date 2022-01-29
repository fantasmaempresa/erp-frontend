import { Injectable } from '@angular/core';
import { CrudService } from '../../core/classes/Crud/CrudService';
import { NotificationResponse } from '../models/NotificationResponse.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService extends CrudService<NotificationResponse> {
  constructor(private http: HttpClient) {
    super('notifications', http);
  }
}
