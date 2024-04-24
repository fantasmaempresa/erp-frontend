import { Injectable } from '@angular/core';
import { CrudService, Pagination } from 'o2c_core';
import { VulnerableOperationDto } from '../dto/VulnerableOperation.dto';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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
