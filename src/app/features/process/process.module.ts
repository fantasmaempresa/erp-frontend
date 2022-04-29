import { NgModule } from '@angular/core';

import { ProcessRoutingModule } from './process-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ProcessFormComponent } from './page/process-form/process-form.component';
import { ProcessListComponent } from './page/process-list/process-list.component';

@NgModule({
  declarations: [ProcessFormComponent, ProcessListComponent],
  imports: [SharedModule, ProcessRoutingModule],
})
export class ProcessModule {}
