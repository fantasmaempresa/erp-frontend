import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectFormComponent } from './page/project-form/project-form.component';
import { SharedModule } from '../../shared/shared.module';
import { BuildProjectComponent } from './page/build-project/build-project.component';
import { CoreModule, ViewsModule, FormComponent, FormsModule } from 'o2c_core';
import { StartFormComponent } from './page/predefinedForms/SimpleSale/start-form/start-form.component';
import { TextEditorWithCategoryAutocompleteComponent } from "../../shared/components/text-editor-with-category-autocomplete/text-editor-with-category-autocomplete.component";
import { BuildPredefinedFormatComponent } from './page/predefinedForms/SimpleSale/first-prevent-notice/build-predefined-format.component';
import { LoadFilesToProcedureComponent } from './page/predefinedForms/SimpleSale/load-files-to-procedure/load-files-to-procedure.component';

@NgModule({
  declarations: [ProjectFormComponent, BuildProjectComponent, StartFormComponent, BuildPredefinedFormatComponent, LoadFilesToProcedureComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule,
    ViewsModule,
    CoreModule,
    FormComponent,
    FormsModule,
    TextEditorWithCategoryAutocompleteComponent
],
})
export class ProjectsModule { }
