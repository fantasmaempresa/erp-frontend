import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { WorkAreaDto } from '../dto/WorkArea.dto';
import { CrudService } from '../../core/classes/Crud/CrudService';
import { Pagination } from '../../core/interfaces/Pagination.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AreaService extends CrudService<WorkAreaDto> {
  constructor(private http: HttpClient) {
    super('workAreas', http);
  }

  changePage(page: number, size: number) {
    let params = new HttpParams();
    params = params.append('page', `${page}`);
    params = params.append('paginate', `${size}`);
    return this._http.get<Pagination<WorkAreaDto>>(
      `${environment.base_url}/workAreas`,
      { params },
    );
  }
}
