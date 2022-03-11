import { InjectionToken, NgModule } from '@angular/core';
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
import { GenericTableComponent } from './components/generic-table/generic-table.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MapToPipe } from '../core/pipes/map-to.pipe';
import { MemoizedSelector } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';

@NgModule({
  entryComponents: [DialogSearchComponent],
  declarations: [
    SpinnerComponent,
    PageNotFoundComponent,
    ErrorMessageDirective,
    StopPropagationDirective,
    OutSideClickDirective,
    FromDatePipe,
    MapToPipe,
    DialogSearchComponent,
    TableSearchComponent,
    DynamicFormInputComponent,
    DynamicFormComponent,
    DynamicFormCreationComponent,
    OperationsComponent,
    GenericTableComponent,
    ToolbarComponent,
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
    OutSideClickDirective,
    FromDatePipe,
    MapToPipe,
    DynamicFormComponent,
    DynamicFormCreationComponent,
    OperationsComponent,
    GenericTableComponent,
    ToolbarComponent,
  ],
})
export class SharedModule {}

export const SELECTOR = new InjectionToken<MemoizedSelector<any, any>>('selector');
export const LOAD_ACTION = new InjectionToken<TypedAction<any>>('load_action');
export const LOAD_NEXT_ACTION = new InjectionToken<(props: { size: number; page: number }) => any>(
  'load_next_action',
);
export const LABELS = new InjectionToken<string[]>('labels');
export const FIELDS = new InjectionToken<string[]>('fields');
