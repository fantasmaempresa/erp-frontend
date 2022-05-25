import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { QuoteTemplateService } from '../../../../data/services/quote-template.service';
import { combineLatest, map, Observable, switchMap, take } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Formfield } from '../../../../data/models/Formfield.model';
import {
  selectDynamicForm,
  selectStatus,
} from '../../../../state/dynamic-form/dynamic-form.selector';
import { emptyForm, loadForm } from '../../../../state/dynamic-form/dynamic-form.actions';
import { ProjectQuoteService } from '../../../../data/services/project-quote.service';
import { MessageHelper } from '../../../../shared/helpers/MessageHelper';
import faker from '@faker-js/faker';
import { QuoteTemplate } from '../../../../data/models/QuoteTemplate.model';

@Component({
  selector: 'app-project-quote-page',
  templateUrl: './project-quote-page.component.html',
  styleUrls: ['./project-quote-page.component.scss'],
})
export class ProjectQuotePageComponent implements OnInit, OnDestroy {
  HEADER_STEP = 0;

  FORM_BUILD_STEP = 1;

  FORM_FILL_STEP = 2;

  OPERATIONS_FORM_STEP = 3;

  PREVIEW_STEP = 4;

  step = 0;

  saveState = false;

  headerForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    addressee: new FormControl(`${faker.name.firstName()} ${faker.name.lastName()}`, [
      Validators.required,
    ]),
    description: new FormControl(faker.lorem.lines(2), [Validators.required]),
    date_end: new FormControl({ value: faker.date.soon(5), disabled: true }),
    status_quote_id: new FormControl(null),
    client: new FormControl({ value: null, disabled: true }),
    client_id: new FormControl({ value: null, disabled: true }),
  });

  quoteForm = new FormGroup({
    headerForm: this.headerForm,
    formFill: new FormControl(null, [Validators.required]),
  });

  templateControl = new FormControl(null);

  formFields!: Formfield<any>[];

  operationsForm = new FormGroup({});

  operations!: any;

  previewForm: FormControl = new FormControl(null);

  fields$!: Observable<Formfield<any>[]>;

  templates!: QuoteTemplate[];

  quote!: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
    private projectQuoteService: ProjectQuoteService,
    private quoteTemplateService: QuoteTemplateService,
  ) {
    this.getTemplates();
    this.templateControl.valueChanges.subscribe({
      next: (value) => {
        if (value) {
          this.headerForm.get('name')?.patchValue(value.name);
          this.store.dispatch(emptyForm());
          this.store.dispatch(loadForm({ form: value.form, id: value.id, name: value.name }));
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
  }

  ngOnInit(): void {
    this.fields$.subscribe({
      next: () => {
        if (this.step < this.FORM_FILL_STEP) {
          this.quoteForm.get('formFill')?.reset();
        }
      },
    });
  }

  ngOnDestroy(): void {
    console.log('Destruyendo project-quote-page');
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

  goToFormBuildStep() {
    this.step = this.FORM_BUILD_STEP;
  }

  goToFormFill() {
    if (this.headerForm.invalid) {
      return;
    }
    this.step = this.FORM_FILL_STEP;
  }

  goToOperationsForm() {
    if (this.quoteForm.get('formFill')?.invalid) {
      this.saveState = true;
      return;
    }
    this.step = this.OPERATIONS_FORM_STEP;
  }

  goToPreview() {
    console.log('PREVIEW');
    if (this.quoteForm.get('formFill')?.invalid) {
      this.saveState = true;
      return;
    }
    this.step = this.PREVIEW_STEP;
    setTimeout(() => {
      this.calculateOperations();
    }, 100);
  }

  async saveQuote() {
    const quoteTemplate = this.templateControl.value;
    this.store
      .select(selectDynamicForm)
      .pipe(take(1))
      .subscribe((form) => {
        const quote = {
          ...this.headerForm.getRawValue(),
          template_quote_id: this.templateControl.value.id,
          quote: {
            form: {
              ...form,
            },
            operations: quoteTemplate.operations,
            result: this.quote,
          },
        };
        console.log(quote);
        this.projectQuoteService.save(quote).subscribe((val) => {
          console.log(val);
          MessageHelper.successMessage('Éxito', 'Cotización guardada');
          this.router.navigate(['../'], { relativeTo: this.route });
        });
      });
  }

  closingFormFill() {
    console.log('Cerrando form fill');
    this.saveState = true;
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.name === o2.name && o1.id === o2.id;
  }

  calculateOperations() {
    const quoteTemplate = this.templateControl.value;
    // @ts-ignore
    let operationField: never[] = [];
    this.store
      .select(selectDynamicForm)
      .pipe(
        take(1),
        map((form) => {
          form.forEach((field) => {
            if (field.key !== 'total') {
              operationField = quoteTemplate.operations.operation_fields.map((x: any) => {
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
          console.log(operationField);
          const quote = {
            quote: {
              form: {
                ...form,
              },
              operations: quoteTemplate.operations,
            },
          };
          return quote;
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
              let operation_total = {
                name: 'total',
                description: operationTotal.description,
                subtotal: operationTotal.subtotal,
                total: operationTotal.total,
              };
              return {
                operation_fields: concepts,
                operation_total,
              };
            }),
          ),
        ),
      )
      .subscribe((quote) => {
        console.log(quote);
        this.quote = quote;
      });
    // TODO: Validar que el arreglo de operaciones no venga vacio
  }
}
