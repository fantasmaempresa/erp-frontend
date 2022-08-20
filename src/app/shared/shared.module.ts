import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { ErrorMessageDirective } from '../core/directives/error-message.directive';
import { DialogSearchComponent } from './components/dialog-search/dialog-search.component';
import { TableSearchComponent } from './components/table-search/table-search.component';
import { DynamicFormInputComponent } from './components/dynamic-form-input/dynamic-form-input.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { StopPropagationDirective } from '../core/directives/stop-propagation.directive';
import { OutSideClickDirective } from '../core/directives/out-side-click.directive';
import { FromDatePipe } from '../core/pipes/from-date.pipe';
import { DynamicFormCreationComponent } from './components/dynamic-form-creation/dynamic-form-creation.component';
import { OperationsComponent } from './components/operations/operations.component';
import { GenericAutocompleteChipComponent } from './components/generic-autocomplete-chip/generic-autocomplete-chip.component';
import { ChipListAutocompleteFixDirective } from '../core/directives/chip-list-autocomplete-fix.directive';
import { DragFileDirective } from '../core/directives/drag-file.directive';
import { InputImageComponent } from './components/input-image/input-image.component';
import { InputFileComponent } from './components/input-file/input-file.component';
import { InputCoordinateComponent } from './components/input-coordinate/input-coordinate.component';
import { DynamicViewsModule } from './components/dinamyc-views/dynamic-views.module';
import { OnSaveDialogComponent } from './components/dynamic-form-creation/on-save-dialog/on-save-dialog.component';
import { ConnectFormDirective } from '../core/directives/connect-form.directive';
import { SetValueDirective } from '../core/directives/set-value.directive';
import { AutofocusDirective } from '../core/directives/autofocus.directive';

@NgModule({
  entryComponents: [DialogSearchComponent],
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
    GenericAutocompleteChipComponent,
    InputImageComponent,
    InputFileComponent,
    InputCoordinateComponent,
    OnSaveDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BreadcrumbModule,
    MaterialModule,
    DynamicViewsModule,
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
    GenericAutocompleteChipComponent,
    InputImageComponent,
    InputFileComponent,
    InputCoordinateComponent,
    AutofocusDirective,
  ],
})
export class SharedModule {}
