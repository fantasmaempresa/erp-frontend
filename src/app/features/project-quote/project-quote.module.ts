import { NgModule } from '@angular/core';

import { ProjectQuoteRoutingModule } from './project-quote-routing.module';
import { OperationNamesPipe, ProjectQuoteListComponent } from './page/project-quote-list/project-quote-list.component';
import { ProjectQuoteFormComponent } from './page/project-quote-form/project-quote-form.component';
import { SharedModule } from '../../shared/shared.module';
import { ProjectQuotePageComponent } from './page/project-quote-page/project-quote-page.component';
import { ProjectQuoteConceptsComponent } from './page/project-quote-concepts/project-quote-concepts.component';
import { ProjectQuotePreviewComponent } from './dialog/project-quote-preview/project-quote-preview.component';
import { ViewsModule, FormsModule, FormComponent } from 'o2c_core';
import { NgxEditorModule } from 'ngx-editor';


@NgModule({
  declarations: [
    ProjectQuoteListComponent,
    ProjectQuoteFormComponent,
    ProjectQuotePageComponent,
    ProjectQuoteConceptsComponent,
    ProjectQuotePreviewComponent,
    OperationNamesPipe,
  ],
  imports: [
    SharedModule,
    ProjectQuoteRoutingModule,
    ViewsModule,
    FormsModule,
    FormComponent,
    NgxEditorModule,
  ],
})
export class ProjectQuoteModule {}
