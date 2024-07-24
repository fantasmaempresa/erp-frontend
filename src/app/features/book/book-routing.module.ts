import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicViewComponent, VIEW_CLAZZ } from 'o2c_core';
import { BookView } from 'src/app/data/presentation/Book.view';
import { BookFormComponent } from './pages/book-form/book-form.component';

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
        data: { breadcrumb: 'Lista de Libros' },
        providers: [{ provide: VIEW_CLAZZ, useValue: BookView }],
      },
      {
        path: 'new',
        component: BookFormComponent,
        data: { breadcrumb: 'Agregar Libro' },
      },
      {
        path: ':id',
        component: BookFormComponent,
        data: { breadcrumb: 'Editar Libro' },
      },
      {
        path: ':id/documentsLink',
        loadChildren: () =>
          import('../document-link/document-link.module').then(
            (m) => m.DocumentLinkModule,
          ),
        data: { breadcrumb: 'Documentos', view: 'book' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
