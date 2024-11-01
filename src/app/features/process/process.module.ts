import { NgModule } from '@angular/core';

import { ProcessRoutingModule } from './process-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ProcessFormComponent } from './page/process-form/process-form.component';
import { BuildProcessComponent } from './page/build-process/build-process.component';
import { ViewsModule, FormsModule, FormComponent } from "o2c_core";


@NgModule({
  declarations: [ProcessFormComponent, BuildProcessComponent],
  imports: [SharedModule, ProcessRoutingModule, ViewsModule, FormsModule, FormComponent],
})
export class ProcessModule {}
