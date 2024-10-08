import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicViewComponent, VIEW_CLAZZ } from 'o2c_core';
import { FolioOrderView, FolioView } from 'src/app/data/presentation/Folio.view';
import { FolioFormComponent } from './pages/folio-form/folio-form.component';
import { DocumentApendixView } from 'src/app/data/presentation/DocumentLink.view';

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
        path: 'list-order',
        component: BasicViewComponent,
        data: { breadcrumb: 'Lista de instrumento y Folios ordenados' },
        providers: [{ provide: VIEW_CLAZZ, useValue: FolioOrderView }],
      },
      {
        path: ':id/documentLink',
        component: BasicViewComponent,
        data: { breadcrumb: 'Apendice de instrumento' },
        providers: [{ provide: VIEW_CLAZZ, useValue: DocumentApendixView }],
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
      {
        path: ':idError/errors',
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
