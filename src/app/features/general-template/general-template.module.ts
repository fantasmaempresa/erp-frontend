import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralTemplateRoutingModule } from './general-template-routing.module';
import { GeneralTemplateFormComponent } from './page/general-template-form/general-template-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { GeneratorFormModule } from "../../shared/components/generator-form/generator-form.module";


@NgModule({
    declarations: [
        GeneralTemplateFormComponent
    ],
    imports: [
        CommonModule,
        GeneralTemplateRoutingModule,
        SharedModule,
        GeneratorFormModule
    ]
})
export class GeneralTemplateModule { }
