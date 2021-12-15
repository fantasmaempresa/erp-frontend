import { NgModule } from '@angular/core';

import { ConceptsRoutingModule } from './concepts-routing.module';
import { ConceptFormComponent } from './page/concept-form/concept-form.component';
import { ConceptListComponent } from './page/concept-list/concept-list.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ConceptFormComponent, ConceptListComponent],
  imports: [SharedModule, ConceptsRoutingModule],
})
export class ConceptsModule {}
