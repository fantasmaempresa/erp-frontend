import { Injectable } from '@angular/core';
import { CrudService, Pagination } from 'o2c_core';
import { IsoDocumentationDto } from '../dto/IsoDocumentation.dto';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsoDocumentationService extends CrudService<
  IsoDocumentationDto, 
  Pagination<IsoDocumentationDto>
>{

  constructor() { 
    super('isoDocumentation');
  }

  save(t: any, params?: HttpParams): Observable<any> {
    return this._http.post<any>(this._base, t, { params });
  }
}
