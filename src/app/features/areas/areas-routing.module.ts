import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreaFormComponent } from './page/area-form/area-form.component';
import { ChildrenRouteLayoutComponent } from '../../layout/children-route-layout/children-route-layout.component';
import { BasicViewComponent, VIEW_CLAZZ } from 'o2c_core';
import { AreaView } from '../../data/presentation/Area.view';

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
        component: BasicViewComponent,
        data: { breadcrumb: 'Lista de areas' },
        providers: [
          {
            provide: VIEW_CLAZZ,
            useValue: AreaView,
          },
        ],
      },
      {
        path: 'new',
        component: AreaFormComponent,
        data: { breadcrumb: 'Nueva área' },
      },
      {
        path: ':id',
        component: AreaFormComponent,
        data: { breadcrumb: 'Editar área' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AreasRoutingModule {}
