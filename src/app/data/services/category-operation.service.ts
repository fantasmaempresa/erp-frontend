import { Injectable } from '@angular/core';
import { CrudService, Pagination } from 'o2c_core';
import { CategoryOperationDto } from '../dto/CategoryOperation.dto';

@Injectable({
  providedIn: 'root',
})
export class CategoryOperationService extends CrudService<
  CategoryOperationDto,
  Pagination<CategoryOperationDto>
> {
  constructor() {
    super('categoryOperation');
  }
}
