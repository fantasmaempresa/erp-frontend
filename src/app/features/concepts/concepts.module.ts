import { NgModule } from '@angular/core';

import { ConceptsRoutingModule } from './concepts-routing.module';
import { ConceptPageComponent } from './page/concept-page/concept-page.component';
import { ConceptListComponent } from './page/concept-list/concept-list.component';
import { SharedModule } from '../../shared/shared.module';
import { ConceptFormComponent } from './page/concept-form/concept-form.component';

@NgModule({
  declarations: [ConceptPageComponent, ConceptListComponent, ConceptFormComponent],
  imports: [SharedModule, ConceptsRoutingModule],
})
export class ConceptsModule {}
