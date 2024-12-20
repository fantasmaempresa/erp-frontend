import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  ProjectQuoteService,
  QuoteStatusService,
} from '../../../../data/services';
import { map, Observable, switchMap, take } from 'rxjs';
import { loadForm, selectDynamicForm } from '../../../../state/dynamic-form';
import { Store } from '@ngrx/store';
import { DynamicFormComponent } from '../../../../shared/components';
import { QuoteTemplateService } from 'src/app/data/services/quote-template.service';
import { MessageHelper } from 'o2c_core';
import {
  Formfield,
  ProjectQuoteDto,
  QuoteStatusDto,
  QuoteTemplate,
} from '../../../../data/dto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Editor } from 'ngx-editor';

@Component({
  selector: 'app-project-quote-preview',
  templateUrl: './project-quote-preview.component.html',
  styleUrls: ['./project-quote-preview.component.scss'],
})
export class ProjectQuotePreviewComponent implements OnInit {
  editor: Editor;
  editorDescription: Editor;

  @ViewChild(DynamicFormComponent) formFill!: DynamicFormComponent;

  HEADER_STEP = 0;

  FORM_FILL_STEP = 2;

  PREVIEW_STEP = 4;

  step = 0;

  isEditing = false;

  isOnlyReadBodyQuote = false;

  isEnabledChangeQuoteStatus = false;

  results: any = null;

  headerForm = new UntypedFormGroup({
    id: new UntypedFormControl(''),
    name: new UntypedFormControl(null, [Validators.required]),
    addressee: new UntypedFormControl('', [Validators.required]),
    description: new UntypedFormControl('', [Validators.required]),
    date_end: new UntypedFormControl(),
    status_quote_id: new UntypedFormControl(null),
    client: new UntypedFormControl({ value: null, disabled: true }),
    client_id: new UntypedFormControl({ value: null, disabled: true }),
    operations: new UntypedFormControl({ value: null, disabled: false }),
    observation: new UntypedFormControl('', []),
  });

  quoteForm = new UntypedFormGroup({
    headerForm: this.headerForm,
  });

  formFields!: Formfield<any>[];

  quoteStatuses$!: Observable<QuoteStatusDto[]>;

  quoteTemplate$!: Observable<QuoteTemplate>;

  constructor(
    private projectQuoteService: ProjectQuoteService,
    private quoteStatusService: QuoteStatusService,
    private quoteTemplateService: QuoteTemplateService,
    public dialogRef: MatDialogRef<ProjectQuotePreviewComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      projectQuote: ProjectQuoteDto;
    },
  ) {

    this.editor = new Editor();
    this.editorDescription = new Editor();
    this.quoteStatuses$ = this.quoteStatusService.fetchAll().pipe(
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
    this.headerForm.controls.id.patchValue(data.projectQuote.id);
  }

  ngOnInit(): void {
    this.headerForm.patchValue(this.data.projectQuote);
    this.headerForm.get('client')?.patchValue(this.data.projectQuote.addressee);
    this.headerForm.disable();
    this.isOnlyReadBodyQuote = true;

    this.quoteTemplate$ = this.quoteTemplateService.fetch(
      this.data.projectQuote.template_quote_id,
    );
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
    // TODO: Hacer el calculo de operaciones si esta activada la edición
    if (this.isEditing && this.formFill.getFormGroup().dirty) {
      let operations$ = this.quoteTemplate$.pipe(
        switchMap((quoteTemplate) => {
          return this.projectQuoteService.resolveOperations(quoteTemplate);
        }),
      );
      operations$.subscribe((operations) => {
        this.results = operations;
        console.log(this.results);
      });
    }
  }

  enableEditing() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.headerForm.enable();
      if (!this.isEnabledChangeQuoteStatus) {
        this.headerForm.controls.status_quote_id.disable();
      }
      this.isOnlyReadBodyQuote = false;
    } else {
      this.headerForm.disable();
      if (this.isEnabledChangeQuoteStatus) {
        this.headerForm.controls.status_quote_id.enable();
      }
      this.isOnlyReadBodyQuote = true;
    }
  }

  enableChangeStatus() {
    this.isEnabledChangeQuoteStatus = !this.isEnabledChangeQuoteStatus;
    if (this.isEnabledChangeQuoteStatus) {
      this.headerForm.controls.status_quote_id.enable();
    } else {
      this.headerForm.controls.status_quote_id.disable();
    }
  }

  save() {
    let form$ = this.store.select(selectDynamicForm).pipe(take(1));
    form$
      .pipe(
        map((form) => {
          return {
            ...this.headerForm.getRawValue(),
            client_id: this.headerForm.getRawValue().client
              ? this.headerForm.getRawValue().client.id
              : null,
            template_quote_id: this.data.projectQuote.template_quote_id,
            quote: {
              form: {
                ...form,
              },
              operations: this.data.projectQuote.quote.operations,
              result: this.results
                ? this.results
                : this.data.projectQuote.quote.result,
            },
          };
        }),
        switchMap((projectQuote) => {
          return this.projectQuoteService.update(projectQuote);
        }),
      )
      .subscribe({
        next: async () => {
          await MessageHelper.successMessage('Éxito', 'Cotización actualizada');
          this.dialogRef.close(true);
        },
        // TODO: Manejar errores
        error: () => {},
      });
  }

  addControlToForm(formGroup: UntypedFormGroup) {
    this.quoteForm.removeControl('formFill');
    this.quoteForm.addControl('formFill', formGroup);
    this.quoteForm.updateValueAndValidity();
  }
}
