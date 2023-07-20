import { Injectable } from '@angular/core';
import { CrudService, Pagination } from 'o2c_core';
import { OperationsDto } from '../dto/Operations.dto';

@Injectable({
  providedIn: 'root',
})
export class OperationService extends CrudService<
  OperationsDto,
  Pagination<OperationsDto>
> {
  constructor() {
    super('operations');
  }
}
