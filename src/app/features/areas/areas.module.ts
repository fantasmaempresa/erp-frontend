import { NgModule } from '@angular/core';
import { AreaFormComponent } from './page/area-form/area-form.component';
import { SharedModule } from '../../shared/shared.module';
import { AreasRoutingModule } from './areas-routing.module';
import { AreasListComponent } from './page/areas-list/areas-list.component';

@NgModule({
  declarations: [AreaFormComponent, AreasListComponent],
  imports: [SharedModule, AreasRoutingModule],
})
export class AreasModule {}
