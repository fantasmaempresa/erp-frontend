import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreaFormComponent } from './page/area-form/area-form.component';
import { ChildrenRouteLayoutComponent } from '../../layout/children-route-layout/children-route-layout.component';
import { AreasListComponent } from './page/areas-list/areas-list.component';

const routes: Routes = [
  {
    path: '',
    component: ChildrenRouteLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: AreasListComponent,
        data: { breadcrumb: 'Lista de areas' },
      },
      {
        path: 'area',
        component: AreaFormComponent,
        data: { breadcrumb: 'Editar área' },
      },
      {
        path: 'new',
        component: AreaFormComponent,
        data: { breadcrumb: 'Nueva área' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AreasRoutingModule {}
