import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildrenRouteLayoutComponent } from '../../layout/children-route-layout/children-route-layout.component';
import { QuoteStatusListComponent } from './page/quote-status-list/quote-status-list.component';
import { QuoteStatusFormComponent } from './page/quote-status-form/quote-status-form.component';

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
        component: QuoteStatusListComponent,
        data: { breadcrumb: 'Lista de estados' },
      },
      {
        path: 'quote-status',
        component: QuoteStatusFormComponent,
        data: { breadcrumb: 'Editar estado de la cotización' },
      },
      {
        path: 'new',
        component: QuoteStatusFormComponent,
        data: { breadcrumb: 'Nuevo estado de la cotización' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuoteStatusRoutingModule {}
