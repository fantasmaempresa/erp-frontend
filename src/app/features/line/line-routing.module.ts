import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicViewComponent, VIEW_CLAZZ } from 'o2c_core';
import { LineView } from 'src/app/data/presentation/Line.view';
import { LineFormComponent } from './page/line-form/line-form.component';

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
        data: { breadcrumb: 'Líneas'},
        providers: [{ provide: VIEW_CLAZZ, useValue: LineView}],
      },
      {
        path: 'new',
        component: LineFormComponent,
        data: { breadcrumb: 'Agregar Línea'},
      },
      {
        path: ':id',
        component: LineFormComponent,
        data: { breadcrumb: 'Editar Línea'},
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LineRoutingModule { }
