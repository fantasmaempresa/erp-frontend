import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildrenRouteLayoutComponent } from '../../layout/children-route-layout/children-route-layout.component';
import { TemplateListComponent } from './page/template-list/template-list.component';
import { TemplatePageComponent } from './page/template-page/template-page.component';

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
        component: TemplateListComponent,
        data: { breadcrumb: 'Lista de plantillas' },
      },
      {
        path: 'quote-template',
        component: TemplatePageComponent,
        data: { breadcrumb: 'Editar plantilla' },
      },
      {
        path: 'new',
        component: TemplatePageComponent,
        data: { breadcrumb: 'Nueva plantilla' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectQuoteTemplateRoutingModule {}
