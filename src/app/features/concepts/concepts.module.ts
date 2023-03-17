import { NgModule } from '@angular/core';

import { ConceptsRoutingModule } from './concepts-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ConceptFormComponent } from './page/concept-form/concept-form.component';
import { ConceptFormDialogComponent } from './dialog/concept-form-dialog/concept-form-dialog.component';

@NgModule({
  declarations: [ConceptFormComponent, ConceptFormDialogComponent],
  imports: [SharedModule, ConceptsRoutingModule],
})
export class ConceptsModule {}
