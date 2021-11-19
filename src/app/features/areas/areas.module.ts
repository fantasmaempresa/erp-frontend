import { NgModule } from '@angular/core';
import { AreaFormComponent } from './area-form/area-form.component';
import { SharedModule } from '../../shared/shared.module';
import { AreasRoutingModule } from './areas-routing.module';

@NgModule({
  declarations: [AreaFormComponent],
  imports: [SharedModule, AreasRoutingModule],
})
export class AreasModule {}
