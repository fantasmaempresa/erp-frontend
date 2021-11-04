import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './page/home/home.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [SharedModule, DashboardRoutingModule],
})
export class DashboardModule {}
