import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildrenRouteLayoutComponent } from '../../layout/children-route-layout/children-route-layout.component';
import { ConceptListComponent } from './page/concept-list/concept-list.component';
import { ConceptPageComponent } from './page/concept-page/concept-page.component';

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
        component: ConceptListComponent,
        data: { breadcrumb: 'Lista de conceptos' },
      },
      {
        path: 'concept',
        component: ConceptPageComponent,
        data: { breadcrumb: 'Editar concepto' },
      },
      {
        path: 'new',
        component: ConceptPageComponent,
        data: { breadcrumb: 'Nuevo concepto' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConceptsRoutingModule {}
