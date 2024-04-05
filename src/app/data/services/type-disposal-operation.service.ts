import { Injectable } from '@angular/core';
import { CrudService, Pagination } from 'o2c_core';
import { TypeDisposalOperationDto } from '../dto/TypeDisposalOperation.dto';

@Injectable({
  providedIn: 'root',
})
export class TypeDisposalOperationService extends CrudService<
  TypeDisposalOperationDto,
  Pagination<TypeDisposalOperationDto>
> {
  constructor() {
    super('typeDisposalOperation');
  }
}
