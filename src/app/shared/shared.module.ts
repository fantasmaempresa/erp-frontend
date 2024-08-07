import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import {
  AutofocusDirective,
  ChipListAutocompleteFixDirective,
  ConnectFormDirective,
  DragFileDirective,
  ErrorMessageDirective,
  OutSideClickDirective,
  SetValueDirective,
  StopPropagationDirective,
} from './directives';
import {
  DialogSearchComponent,
  DynamicFormComponent,
  DynamicFormCreationComponent,
  OnSaveDialogComponent,
} from './components';
import { TableSearchComponent } from './components/table-search/table-search.component';
import { DynamicFormInputComponent } from './components/dynamic-form-input/dynamic-form-input.component';
import { FromDatePipe } from './pipes';
import { OperationsComponent } from './components/operations/operations.component';
import { InputImageComponent } from './components/input-image/input-image.component';
import { InputFileComponent } from './components/input-file/input-file.component';
import { InputCoordinateComponent } from './components/input-coordinate/input-coordinate.component';
import { DynamicViewsModule } from './components/dynamic-views/dynamic-views.module';
import { DialogPreviewPdfComponent } from './components/dialog-preview-pdf/dialog-preview-pdf.component';
import {SanitizerPipe} from "./pipes/sanitizer.pipe";
import { DialogAssignUserComponent } from './components/dialog-assign-user/dialog-assign-user.component';
import { ViewsModule } from "o2c_core";
import { DialogDynamicAddItemComponent } from './components/dialog-dynamic-add-item/dialog-dynamic-add-item.component';
import { DialogResumeProjectComponent } from './components/dialog-resume-project/dialog-resumen-project.component';
import { DialogGrantorsComponent } from './components/dialog-grantors/dialog-grantors.component';
// import { GeneratorFormModule } from "./components/generator-form/generator-form.module";

@NgModule({
  declarations: [
    SpinnerComponent,
    PageNotFoundComponent,
    ErrorMessageDirective,
    StopPropagationDirective,
    ChipListAutocompleteFixDirective,
    DragFileDirective,
    OutSideClickDirective,
    ConnectFormDirective,
    SetValueDirective,
    AutofocusDirective,
    FromDatePipe,
    DialogSearchComponent,
    TableSearchComponent,
    DynamicFormInputComponent,
    DynamicFormComponent,
    DynamicFormCreationComponent,
    OperationsComponent,
    InputImageComponent,
    InputFileComponent,
    InputCoordinateComponent,
    OnSaveDialogComponent,
    DialogPreviewPdfComponent,
    SanitizerPipe,
    DialogAssignUserComponent,
    DialogDynamicAddItemComponent,
    DialogResumeProjectComponent,
    DialogGrantorsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BreadcrumbModule,
    MaterialModule,
    DynamicViewsModule,
    ViewsModule,
    // GeneratorFormModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicViewsModule,
    RouterModule,
    MaterialModule,
    BreadcrumbModule,
    SpinnerComponent,
    HttpClientModule,
    ErrorMessageDirective,
    StopPropagationDirective,
    ChipListAutocompleteFixDirective,
    OutSideClickDirective,
    ConnectFormDirective,
    SetValueDirective,
    FromDatePipe,
    DynamicFormComponent,
    DynamicFormCreationComponent,
    OperationsComponent,
    InputImageComponent,
    InputFileComponent,
    InputCoordinateComponent,
    AutofocusDirective,
  ],
})
export class SharedModule {}
