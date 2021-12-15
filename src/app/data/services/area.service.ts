import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WorkArea } from '../models/WorkArea.model';
import { CrudService } from '../../core/classes/Crud/CrudService';

@Injectable({
  providedIn: 'root',
})
export class AreaService extends CrudService<WorkArea> {
  constructor(private http: HttpClient) {
    super('workAreas', http);
  }

  changePage(url: string) {
    return this.http.get(url);
  }
}
