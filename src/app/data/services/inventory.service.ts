import { Injectable } from '@angular/core';
import { CrudService, Pagination, ViewContextService } from 'o2c_core';
import { InventoryDto } from '../dto/Inventory.dto';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InventoryService extends CrudService<
  InventoryDto,
  Pagination<InventoryDto>
> {
  constructor(private contextService: ViewContextService) {
    super('inventory');
  }

  fetchAll(): Observable<Pagination<InventoryDto>> {
    return this.contextService.injector$.pipe(
      map((injector) => injector.get(ActivatedRoute)),
      map((route: ActivatedRoute) => ({
        warehouse_id: route.snapshot.parent?.params.id ?? 0,
        view: route.snapshot.data.view,
      })),
      map(
        ({ warehouse_id, view }) =>
          new HttpParams({
            fromObject: { warehouse_id: `${warehouse_id}`, view: `${view}`}
          })
      ),
      switchMap((p) => super.fetchAll(p))
    );
  }

  initialInventory(data: {article_id: number, warehouse_id: number, amount: number}) {
    return this._http.post(
      `${environment.base_url}/inventory/action/initialInventory`,
      data,
    );
  }

}
