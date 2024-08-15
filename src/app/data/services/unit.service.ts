import { Injectable } from '@angular/core';
import { CrudService, Pagination } from 'o2c_core';
import { UnitDto } from '../dto/Unit.dto';

@Injectable({
  providedIn: 'root',
})
export class UnitService extends CrudService<UnitDto, Pagination<UnitDto>> {
  constructor() {
    super('unit');
  }
}
