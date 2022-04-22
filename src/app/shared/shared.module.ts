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
import { MapToPipe } from '../core/pipes/map-to.pipe';
import { GenericAutocompleteChipComponent } from './components/generic-autocomplete-chip/generic-autocomplete-chip.component';
import { ChipListAutocompleteFixDirective } from '../core/directives/chip-list-autocomplete-fix.directive';
import { DragFileDirective } from '../core/directives/drag-file.directive';
import { InputImageComponent } from './components/input-image/input-image.component';

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
    FromDatePipe,
    MapToPipe,
    DialogSearchComponent,
    TableSearchComponent,
    DynamicFormInputComponent,
    DynamicFormComponent,
    DynamicFormCreationComponent,
    OperationsComponent,
    GenericAutocompleteChipComponent,
    InputImageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BreadcrumbModule,
    MaterialModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    BreadcrumbModule,
    SpinnerComponent,
    HttpClientModule,
    ErrorMessageDirective,
    StopPropagationDirective,
    ChipListAutocompleteFixDirective,
    OutSideClickDirective,
    FromDatePipe,
    MapToPipe,
    DynamicFormComponent,
    DynamicFormCreationComponent,
    OperationsComponent,
    GenericAutocompleteChipComponent,
    InputImageComponent,
  ],
})
export class SharedModule {}
