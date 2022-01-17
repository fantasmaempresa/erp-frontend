import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Staff } from '../models/Staff.model';
import { CrudService } from '../../core/classes/Crud/CrudService';

@Injectable({
  providedIn: 'root',
})
export class StaffService extends CrudService<Staff> {
  constructor(private http: HttpClient) {
    super('staff', http);
  }

  changePage(url: string) {
    return this.http.get(url);
  }
}
