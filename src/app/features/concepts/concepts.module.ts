import { NgModule } from '@angular/core';

import { ConceptsRoutingModule } from './concepts-routing.module';
import { ConceptPageComponent } from './page/concept-page/concept-page.component';
import { ConceptListComponent } from './page/concept-list/concept-list.component';
import { SharedModule } from '../../shared/shared.module';
import { ConceptFormComponent } from './page/concept-form/concept-form.component';
import { ConceptFormDialogComponent } from './dialog/concept-form-dialog/concept-form-dialog.component';

@NgModule({
  declarations: [
    ConceptPageComponent,
    ConceptListComponent,
    ConceptFormComponent,
    ConceptFormDialogComponent,
  ],
  imports: [SharedModule, ConceptsRoutingModule],
})
export class ConceptsModule {}
