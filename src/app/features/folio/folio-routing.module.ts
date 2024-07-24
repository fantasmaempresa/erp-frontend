import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicViewComponent, VIEW_CLAZZ } from 'o2c_core';
import { FolioView } from 'src/app/data/presentation/Folio.view';
import { FolioFormComponent } from './pages/folio-form/folio-form.component';

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
        data: { breadcrumb: 'Lista de instrumento y Folios' },
        providers: [{ provide: VIEW_CLAZZ, useValue: FolioView }],
      },
      {
        path: 'new',
        component: FolioFormComponent,
        data: { breadcrumb: 'Agregar instrumento' },
      },
      {
        path: ':id',
        component: FolioFormComponent,
        data: { breadcrumb: 'Editar instrumento' },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FolioRoutingModule { }
