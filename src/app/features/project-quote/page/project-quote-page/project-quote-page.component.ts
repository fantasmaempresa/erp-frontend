import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { QuoteTemplateService } from '../../../../data/services/quote-template.service';
import { combineLatest, delay, map, Observable, switchMap, take } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Formfield } from '../../../../data/models/Formfield.model';
import {
  selectDynamicForm,
  selectStatus,
} from '../../../../state/dynamic-form/dynamic-form.selector';
import { emptyForm, loadForm } from '../../../../state/dynamic-form/dynamic-form.actions';
import { ProjectQuoteService } from '../../../../data/services/project-quote.service';
import { MessageHelper } from '../../../../shared/helpers/MessageHelper';
import { QuoteTemplate } from '../../../../data/models/QuoteTemplate.model';
import { QuoteStatus } from '../../../../data/models/QuoteStatus.model';
import { QuoteStatusService } from '../../../../data/services/quote-status.service';
import { DynamicFormComponent } from '../../../../shared/components/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-project-quote-page',
  templateUrl: './project-quote-page.component.html',
  styleUrls: ['./project-quote-page.component.scss'],
})
export class ProjectQuotePageComponent implements OnDestroy, AfterViewInit {
  @ViewChild(DynamicFormComponent) formFill!: DynamicFormComponent;

  quoteId!: number;

  HEADER_STEP = 0;

  FORM_FILL_STEP = 1;

  PREVIEW_STEP = 2;

  step = 0;

  headerForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    addressee: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    date_end: new FormControl({ value: '', disabled: true }),
    status_quote_id: new FormControl(null),
    client: new FormControl({ value: null, disabled: true }),
    client_id: new FormControl({ value: null, disabled: true }),
  });

  quoteForm: FormGroup;

  templateControl = new FormControl(null);

  formFields!: Formfield<any>[];

  operations!: any;

  fields$!: Observable<Formfield<any>[]>;

  fields!: Formfield<any>[];

  quoteStatuses$!: Observable<QuoteStatus[]>;

  templates!: QuoteTemplate[];

  quote: any = null;

  isEdit = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
    private projectQuoteService: ProjectQuoteService,
    private quoteTemplateService: QuoteTemplateService,
    public quoteStatusService: QuoteStatusService,
  ) {
    this.quoteForm = new FormGroup({
      headerForm: this.headerForm,
    });
    this.getTemplates();
    this.templateControl.valueChanges.subscribe({
      next: (value) => {
        if (value) {
          this.fields = value.form.form;
          this.headerForm.get('name')?.patchValue(value.name);
          this.store.dispatch(emptyForm());
          this.store.dispatch(
            loadForm({
              form: value.form.form,
              id: value.id,
              name: value.name,
              description: value.description,
            }),
          );
        } else {
          this.store.dispatch(emptyForm());
        }
      },
    });

    const status$: Observable<'EDITABLE' | 'NEW'> = store.select(selectStatus);
    this.fields$ = store.select(selectDynamicForm);
    combineLatest([this.fields$, status$]).subscribe(([fields, status]) => {
      if (status !== 'EDITABLE') {
        this.formFields = fields;
      }
    });

    if (this.route.snapshot.queryParams.id) {
      // TODO: Arreglar error ExpressionAfterItHasBeenCheckedError
      this.quoteStatuses$ = quoteStatusService.fetchAll().pipe(
        map((quoteStatus) => {
          return quoteStatus.data;
        }),
      );

      this.quoteId = +this.route.snapshot.queryParams.id;
      this.isEdit = true;
      this.headerForm.addControl('id', new FormControl(''));
      projectQuoteService
        .fetch(this.route.snapshot.queryParams.id)
        .pipe(delay(250))
        .subscribe({
          next: (quote) => {
            let quoteTemplate = this.templates.find(
              (template) => template.id === quote.template_quote_id,
            );
            this.templateControl.patchValue(quoteTemplate, { emitEvent: false });
            this.store.dispatch(
              loadForm({
                form: quote.quote.form,
                id: quote.id,
                name: quote.name,
                description: quote.description,
              }),
            );
            this.fields = quote.quote.form;
            this.headerForm.get('name')?.patchValue(quote.name);
            this.headerForm.patchValue(quote);
          },
        });
    }
  }

  ngAfterViewInit() {
    this.quoteForm.addControl('formFill', this.formFill.getFormGroup());
  }

  ngOnDestroy(): void {
    this.store.dispatch(emptyForm());
  }

  getTemplates() {
    this.quoteTemplateService
      .fetchAll()
      .pipe(
        map((templates) => {
          return templates.data;
        }),
      )
      .subscribe((data) => (this.templates = data));
  }

  async backToListUsers() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }

  goToHeaderForm() {
    this.step = this.HEADER_STEP;
  }

  goToFormFill() {
    if (this.headerForm.invalid) {
      return;
    }
    this.step = this.FORM_FILL_STEP;
  }

  goToPreview() {
    this.quoteForm.get('formFill')?.markAllAsTouched();
    if (this.quoteForm.get('formFill')?.invalid) {
      return;
    }
    this.step = this.PREVIEW_STEP;
    setTimeout(() => {
      this.calculateOperations();
    }, 200);
  }

  async updateQuote() {
    const quoteTemplate = this.templateControl.value;
    this.store
      .select(selectDynamicForm)
      .pipe(take(1))
      .subscribe((form) => {
        const quote = {
          ...this.headerForm.getRawValue(),
          client_id: this.headerForm.getRawValue().client
            ? this.headerForm.getRawValue().client.id
            : null,
          template_quote_id: this.templateControl.value.id,
          quote: {
            form: {
              ...form,
            },
            operations: quoteTemplate.operations,
            result: this.quote,
          },
        };
        this.projectQuoteService.update(quote).subscribe(() => {
          MessageHelper.successMessage('Éxito', 'Cotización actualizada');
          this.router.navigate(['../'], { relativeTo: this.route });
        });
      });
  }

  async saveQuote() {
    const quoteTemplate = this.templateControl.value;
    this.store
      .select(selectDynamicForm)
      .pipe(take(1))
      .subscribe((form) => {
        const quote = {
          ...this.headerForm.getRawValue(),
          client_id: this.headerForm.getRawValue().client
            ? this.headerForm.getRawValue().client.id
            : null,
          template_quote_id: this.templateControl.value.id,
          quote: {
            form: {
              ...form,
            },
            operations: quoteTemplate.operations,
            result: this.quote,
          },
        };
        this.projectQuoteService.save(quote).subscribe(() => {
          MessageHelper.successMessage('Éxito', 'Cotización guardada');
          this.router.navigate(['../'], { relativeTo: this.route });
        });
      });
  }

  compareObjects(o1: any, o2: any): boolean {
    if (!o1 || !o2) {
      return false;
    }
    return o1.name === o2.name && o1.id === o2.id;
  }

  calculateOperations() {
    const quoteTemplate = this.templateControl.value;
    this.store
      .select(selectDynamicForm)
      .pipe(
        take(1),
        map((form) => {
          form.forEach((field) => {
            if (field.key !== 'total') {
              console.log(quoteTemplate);
              quoteTemplate.operations.operation_fields.map((x: any) => {
                if (x.key === field.key) {
                  x.value = field.value;
                  return {
                    ...x,
                    value: field.value,
                  };
                } else {
                  return x;
                }
              });
            }
          });
          return {
            quote: {
              form: {
                ...form,
              },
              operations: quoteTemplate.operations,
            },
          };
        }),
        switchMap((quote) =>
          this.projectQuoteService.calculateOperations({ ...quote }).pipe(
            map((resp: any) => {
              const operationFields: [] = resp.operation_fields;
              const operationTotal = resp.operation_total;
              const concepts: any[] = [];
              for (const opt in operationFields) {
                const data: any = operationFields[opt];
                data.name = opt;
                concepts.push(data);
              }
              let total = {
                name: 'total',
                description: operationTotal.description,
                subtotal: operationTotal.subtotal,
                total: operationTotal.total,
              };
              return {
                operation_fields: concepts,
                operation_total: total,
              };
            }),
          ),
        ),
      )
      .subscribe((quote) => {
        this.quote = quote;
      });
    // TODO: Validar que el arreglo de operaciones no venga vacio
  }

  addControlToForm(formGroup: FormGroup) {
    this.quoteForm.removeControl('formFill');
    this.quoteForm.addControl('formFill', formGroup);
    this.quoteForm.updateValueAndValidity();
  }
}
