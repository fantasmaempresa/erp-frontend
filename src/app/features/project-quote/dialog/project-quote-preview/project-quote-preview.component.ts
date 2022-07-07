import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectQuote } from '../../../../data/models/ProjectQuote.model';
import { QuoteStatusService } from '../../../../data/services/quote-status.service';
import { map, Observable } from 'rxjs';
import { QuoteStatus } from '../../../../data/models/QuoteStatus.model';
import { loadForm } from '../../../../state/dynamic-form/dynamic-form.actions';
import { Store } from '@ngrx/store';
import { Formfield } from '../../../../data/models/Formfield.model';
import { DynamicFormComponent } from '../../../../shared/components/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-project-quote-preview',
  templateUrl: './project-quote-preview.component.html',
  styleUrls: ['./project-quote-preview.component.scss'],
})
export class ProjectQuotePreviewComponent implements OnInit {
  @ViewChild(DynamicFormComponent) formFill!: DynamicFormComponent;

  HEADER_STEP = 0;

  FORM_BUILD_STEP = 1;

  FORM_FILL_STEP = 2;

  OPERATIONS_FORM_STEP = 3;

  PREVIEW_STEP = 4;

  step = 0;

  isEditing = false;

  isOnlyReadBodyQuote = false;

  headerForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    addressee: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    date_end: new FormControl(),
    status_quote_id: new FormControl(null),
    client: new FormControl({ value: null, disabled: true }),
    client_id: new FormControl({ value: null, disabled: true }),
  });

  quoteForm = new FormGroup({
    headerForm: this.headerForm,
  });

  formFields$!: Observable<any>;

  formFields!: Formfield<any>[];

  quoteStatuses$!: Observable<QuoteStatus[]>;

  constructor(
    public quoteStatusService: QuoteStatusService,
    public dialogRef: MatDialogRef<ProjectQuotePreviewComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      projectQuote: ProjectQuote;
    },
  ) {
    this.quoteStatuses$ = quoteStatusService.fetchAll().pipe(
      map((quoteStatus) => {
        return quoteStatus.data;
      }),
    );

    this.store.dispatch(
      loadForm({
        form: data.projectQuote.quote.form,
        id: data.projectQuote.id,
        name: data.projectQuote.name,
        description: data.projectQuote.description,
      }),
    );

    this.formFields = data.projectQuote.quote.form;
  }

  ngOnInit(): void {
    this.headerForm.patchValue(this.data.projectQuote);
    this.headerForm.get('client')?.patchValue(this.data.projectQuote.addressee);
    this.headerForm.disable();
    this.isOnlyReadBodyQuote = true;
  }

  onNoClick() {
    this.dialogRef.close();
  }

  goToHeaderForm() {
    this.step = this.HEADER_STEP;
  }

  goToFormFill() {
    this.step = this.FORM_FILL_STEP;
  }

  goToPreview() {
    this.formFill.getFormGroup().markAllAsTouched();
    if (this.formFill.getFormGroup().invalid) {
      return;
    }
    this.step = this.PREVIEW_STEP;
    // TODO: Hacer el calculo de operaciones si esta activada la edicion
    setTimeout(() => {
      // this.calculateOperations();
    }, 100);
  }

  enableEditing() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.headerForm.enable();
      this.isOnlyReadBodyQuote = false;
    } else {
      this.headerForm.disable();
      this.isOnlyReadBodyQuote = true;
    }
  }

  addControlToForm(formGroup: FormGroup) {
    this.quoteForm.removeControl('formFill');
    this.quoteForm.addControl('formFill', formGroup);
    this.quoteForm.updateValueAndValidity();
  }
}
