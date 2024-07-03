import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticleFormComponent } from './page/article-form/article-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewsModule } from 'o2c_core';


@NgModule({
  declarations: [
    ArticleFormComponent
  ],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    SharedModule,
    ViewsModule
  ]
})
export class ArticlesModule { }
