import { Injectable } from '@angular/core';
import { CrudService, Pagination } from 'o2c_core';
import { InventoryDto } from '../dto/Inventory.dto';
import { environment } from 'src/environments/environment';

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

  addArticleToInventory(data: {article_id: number, warehouse_id: number, amount: number}) {
    return this._http.post(
      `${environment.base_url}/inventory/action/addArticleToInventory`,
      data,
    );
  }

}
