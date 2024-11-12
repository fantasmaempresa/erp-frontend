import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VulnerableOperationsRoutingModule } from './vulnerable-operations-routing.module';
import { VulnerableOperationsFormComponent } from './page/vulnerable-operations-form/vulnerable-operations-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewsModule, FormsModule, FormComponent } from 'o2c_core';

@NgModule({
  declarations: [VulnerableOperationsFormComponent],
  imports: [
    CommonModule,
    VulnerableOperationsRoutingModule,
    SharedModule,
    ViewsModule,
    FormsModule,
    FormComponent,
  ],
})
export class VulnerableOperationsModule { }
