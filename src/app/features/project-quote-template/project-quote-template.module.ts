import { NgModule } from '@angular/core';

import { ProjectQuoteTemplateRoutingModule } from './project-quote-template-routing.module';
import { TemplateListComponent } from './page/template-list/template-list.component';
import { TemplatePageComponent } from './page/template-page/template-page.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [TemplateListComponent, TemplatePageComponent],
  imports: [SharedModule, ProjectQuoteTemplateRoutingModule],
})
export class ProjectQuoteTemplateModule {}
