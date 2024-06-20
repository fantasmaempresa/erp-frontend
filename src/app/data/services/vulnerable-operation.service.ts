import { Injectable } from '@angular/core';
import { CrudService, Pagination } from 'o2c_core';
import { VulnerableOperationDto } from '../dto/VulnerableOperation.dto';

@Injectable({
  providedIn: 'root',
})
export class VulnerableOperationService extends CrudService<
  VulnerableOperationDto,
  Pagination<VulnerableOperationDto>
> {
  constructor() {
    super('vulnerableOperation');
  }
}
