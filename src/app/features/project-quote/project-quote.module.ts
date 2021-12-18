import { NgModule } from '@angular/core';

import { ProjectQuoteRoutingModule } from './project-quote-routing.module';
import { ProjectQuoteListComponent } from './page/project-quote-list/project-quote-list.component';
import { ProjectQuoteFormComponent } from './page/project-quote-form/project-quote-form.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ProjectQuoteListComponent, ProjectQuoteFormComponent],
  imports: [SharedModule, ProjectQuoteRoutingModule],
})
export class ProjectQuoteModule {}
