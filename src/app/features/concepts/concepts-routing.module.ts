import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildrenRouteLayoutComponent } from '../../layout/children-route-layout/children-route-layout.component';
import { BasicViewComponent, VIEW_CLAZZ } from 'o2c_core';
import { ConceptView } from '../../data/presentation/Concept.view';
import { ConceptFormComponent } from './page/concept-form/concept-form.component';

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
        data: { breadcrumb: 'Lista de conceptos' },
        providers: [{ provide: VIEW_CLAZZ, useValue: ConceptView }],
      },
      {
        path: 'new',
        component: ConceptFormComponent,
        data: { breadcrumb: 'Nuevo concepto' },
      },
      {
        path: ':id',
        component: ConceptFormComponent,
        data: { breadcrumb: 'Editar concepto' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConceptsRoutingModule {}
