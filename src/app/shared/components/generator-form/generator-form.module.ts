import { NgModule } from '@angular/core';
import { DynamicFormBuilderComponent } from './dynamic-form-builder/dynamic-form-builder.component';
import { SharedModule } from '../../shared.module';
import { PreviewFormBuilderComponent } from './preview-form-builder/preview-form-builder.component';

@NgModule({
  declarations: [DynamicFormBuilderComponent, PreviewFormBuilderComponent],
  imports: [SharedModule],
  exports: [DynamicFormBuilderComponent, PreviewFormBuilderComponent],
})
export class GeneratorFormModule {}
