import { NgModule } from '@angular/core';

import { ProjectQuoteRoutingModule } from './project-quote-routing.module';
import { ProjectQuoteListComponent } from './page/project-quote-list/project-quote-list.component';
import { ProjectQuoteFormComponent } from './page/project-quote-form/project-quote-form.component';
import { SharedModule } from '../../shared/shared.module';
import { ProjectQuotePageComponent } from './page/project-quote-page/project-quote-page.component';
import { ProjectQuoteConceptsComponent } from './page/project-quote-concepts/project-quote-concepts.component';
import { ProjectQuotePreviewComponent } from './dialog/project-quote-preview/project-quote-preview.component';

@NgModule({
  declarations: [
    ProjectQuoteListComponent,
    ProjectQuoteFormComponent,
    ProjectQuotePageComponent,
    ProjectQuoteConceptsComponent,
    ProjectQuotePreviewComponent,
  ],
  imports: [SharedModule, ProjectQuoteRoutingModule],
})
export class ProjectQuoteModule {}
