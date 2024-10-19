import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectFormComponent } from './page/project-form/project-form.component';
import { SharedModule } from '../../shared/shared.module';
import { BuildProjectComponent } from './page/build-project/build-project.component';
import { CoreModule, ViewsModule, FormComponent, FormsModule, HostDirective } from 'o2c_core';
import { StartFormComponent } from './page/predefinedForms/SimpleSale/start-form/start-form.component';
import { TextEditorWithCategoryAutocompleteComponent } from "../../shared/components/text-editor-with-category-autocomplete/text-editor-with-category-autocomplete.component";
import { BuildPredefinedFormatComponent } from './page/predefinedForms/SimpleSale/first-prevent-notice/build-predefined-format.component';
import { GenerateShapeInPhaseComponent } from './page/predefinedForms/SimpleSale/generate-shape-in-phase/generate-shape-in-phase.component';
import { NgxEditorModule } from 'ngx-editor';
import { AssignFolioInPhaseComponent } from './page/predefinedForms/SimpleSale/assign-folio-in-phase/assign-folio-in-phase.component';
import { GenerateExpedientInPhaseComponent } from './page/predefinedForms/SimpleSale/generate-expedient-in-phase/generate-expedient-in-phase.component';
import { RegistrationDataInPhaseComponent } from './page/predefinedForms/SimpleSale/registration-data-in-phase/registration-data-in-phase.component';
import { ProcessingIncomeInPhaseComponent } from './page/predefinedForms/SimpleSale/processing-income-in-phase/processing-income-in-phase.component';

@NgModule({
  declarations: [
    ProjectFormComponent, 
    BuildProjectComponent, 
    StartFormComponent, 
    BuildPredefinedFormatComponent, 
    GenerateShapeInPhaseComponent, 
    AssignFolioInPhaseComponent, 
    GenerateExpedientInPhaseComponent, 
    RegistrationDataInPhaseComponent, 
    ProcessingIncomeInPhaseComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule,
    ViewsModule,
    CoreModule,
    FormComponent,
    FormsModule,
    TextEditorWithCategoryAutocompleteComponent,
    NgxEditorModule,
    HostDirective,
],
})
export class ProjectsModule { }
