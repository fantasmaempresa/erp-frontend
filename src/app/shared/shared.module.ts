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
import { DynamicFormCreationComponent } from './components/dynamic-form-creation/dynamic-form-creation.component';
import { OperationsComponent } from './components/operations/operations.component';

@NgModule({
  entryComponents: [DialogSearchComponent],
  declarations: [
    SpinnerComponent,
    PageNotFoundComponent,
    ErrorMessageDirective,
    DialogSearchComponent,
    TableSearchComponent,
    DynamicFormInputComponent,
    DynamicFormComponent,
    DynamicFormCreationComponent,
    OperationsComponent,
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
    DynamicFormComponent,
    DynamicFormCreationComponent,
    OperationsComponent,
  ],
})
export class SharedModule {}
