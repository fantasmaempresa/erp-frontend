import { Injectable } from '@angular/core';
import { CrudService, Pagination } from 'o2c_core';
import { InventoryDto } from '../dto/Inventory.dto';

@Injectable({
  providedIn: 'root'
})
export class InventoryService extends CrudService<
  InventoryDto,
  Pagination<InventoryDto>
> {
  constructor() {
    super('inventory');
  }
}
