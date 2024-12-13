import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicViewComponent, VIEW_CLAZZ } from 'o2c_core';
import { WarehouseView } from 'src/app/data/presentation/Warehouse.view';
import { WarehouseFormComponent } from './page/warehouse-form/warehouse-form.component';
import { InventoryFormComponent } from '../inventory/page/inventory-form/inventory-form.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: BasicViewComponent,
        data: { breadcrumb: 'Almacenes'},
        providers: [{ provide: VIEW_CLAZZ, useValue: WarehouseView}],
      },
      {
        path: 'new',
        component: WarehouseFormComponent,
        data: { breadcrumb: 'Agregar Alamcén'},
      },
      {
        path: ':id',
        component: WarehouseFormComponent,
        data: { breadcrumb: 'Editar Almacén'},
      },
      {
        path: 'initialInventory/:id',
        component: InventoryFormComponent,
        data: { breadcrumb: 'Agregar Artículo'},
      },
      {
        path: ':id/stock',
        loadChildren: () =>
          import('../inventory/inventory.module').then(
            (m) => m.InventoryModule,
          ),
        data: { breadcrumb: 'Abastos', view: 'inventory'},
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }
