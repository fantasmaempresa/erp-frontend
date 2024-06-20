import { Injectable } from '@angular/core';
import { CrudService, Pagination } from 'o2c_core';
import { WarehouseDto } from '../dto/Warehouse.dto';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService extends CrudService<
  WarehouseDto,
  Pagination<WarehouseDto>
> {
  constructor() {
    super('warehouse');
  }
}
