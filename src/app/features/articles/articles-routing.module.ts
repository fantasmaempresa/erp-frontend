import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicViewComponent, VIEW_CLAZZ } from 'o2c_core';
import { ArticleView } from 'src/app/data/presentation/Article.view';
import { ArticleFormComponent } from './page/article-form/article-form.component';

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
        data: { breadcrum: 'Artículos'},
        providers: [{ provide: VIEW_CLAZZ, useValue: ArticleView}],
      },
      {
        path: 'new',
        component: ArticleFormComponent,
        data: { breadcrumb: 'Agregar Artículo'},
      },
      {
        path: ':id',
        component: ArticleFormComponent,
        data: { breadcrumb: 'Editar Artículo'},
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
