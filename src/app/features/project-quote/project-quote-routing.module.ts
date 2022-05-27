import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildrenRouteLayoutComponent } from '../../layout/children-route-layout/children-route-layout.component';
import { ProjectQuoteListComponent } from './page/project-quote-list/project-quote-list.component';
import { ProjectQuotePageComponent } from './page/project-quote-page/project-quote-page.component';

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
        component: ProjectQuoteListComponent,
        data: { breadcrumb: 'Lista de cotizaciones' },
      },
      {
        path: 'quote',
        component: ProjectQuotePageComponent,
        data: { breadcrumb: 'Editar cotización' },
      },
      {
        path: 'new',
        component: ProjectQuotePageComponent,
        data: { breadcrumb: 'Nueva cotización' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectQuoteRoutingModule {}
