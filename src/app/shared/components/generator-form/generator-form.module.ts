import { NgModule } from '@angular/core';
import { DynamicFormBuilderComponent } from './dynamic-form-builder/dynamic-form-builder.component';
import { SharedModule } from '../../shared.module';

@NgModule({
  declarations: [DynamicFormBuilderComponent],
  imports: [SharedModule],
  exports: [DynamicFormBuilderComponent],
})
export class GeneratorFormModule {}
