import { Injectable } from '@angular/core';
import { CrudService, Pagination } from 'o2c_core';
import { OfficeSecurityMeasuresDto } from '../dto/OfficeSecurityMeasures.dto';

@Injectable({
  providedIn: 'root'
})
export class OfficeSecurityMeasuresService extends CrudService<
  OfficeSecurityMeasuresDto,
  Pagination<OfficeSecurityMeasuresDto>
> {
  constructor() { 
    super('officeSecurityMeasures')
  }
}
