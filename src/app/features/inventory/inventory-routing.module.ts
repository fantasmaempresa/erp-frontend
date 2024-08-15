import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicViewComponent, VIEW_CLAZZ } from 'o2c_core';
import { InventoryView } from 'src/app/data/presentation/Inventory.view';
import { InventoryFormComponent } from './page/inventory-form/inventory-form.component';

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
        data: { breadcrumb: 'Inventarios'},
        providers: [{ provide: VIEW_CLAZZ, useValue: InventoryView}],
      },
      {
        path: 'new',
        component: InventoryFormComponent,
        data: { breadcrumb: 'Agregar Inventario'},
      },
      {
        path: 'id',
        component: InventoryFormComponent,
        data: { breadcrumb: 'Editar Inventtario'},
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
