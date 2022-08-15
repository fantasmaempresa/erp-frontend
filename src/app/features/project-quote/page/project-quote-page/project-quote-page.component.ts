import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { QuoteTemplateService } from '../../../../data/services/quote-template.service';
import { combineLatest, delay, map, Observable, take } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { Formfield } from '../../../../data/dto/Formfield.dto';
import {
  selectDynamicForm,
  selectStatus,
} from '../../../../state/dynamic-form/dynamic-form.selector';
import {
  emptyForm,
  loadForm,
} from '../../../../state/dynamic-form/dynamic-form.actions';
import { ProjectQuoteService } from '../../../../data/services/project-quote.service';
import { MessageHelper } from '../../../../shared/helpers/MessageHelper';
import { QuoteTemplate } from '../../../../data/dto/QuoteTemplate.dto';
import { QuoteStatusService } from '../../../../data/services/quote-status.service';
import { DynamicFormComponent } from '../../../../shared/components/dynamic-form/dynamic-form.component';
import { ProjectQuoteFormComponent } from '../project-quote-form/project-quote-form.component';
import { QuoteStatusDto } from '../../../../data/dto/QuoteStatus.dto';

@Component({
  selector: 'app-project-quote-page',
  templateUrl: './project-quote-page.component.html',
  styleUrls: ['./project-quote-page.component.scss'],
})
export class ProjectQuotePageComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @ViewChild(DynamicFormComponent) formFill!: DynamicFormComponent;

  @ViewChild(ProjectQuoteFormComponent) headerForm!: ProjectQuoteFormComponent;

  quoteId!: number;

  HEADER_STEP = 0;

  FORM_FILL_STEP = 1;

  PREVIEW_STEP = 2;

  step = 0;

  quoteForm: FormGroup = new FormGroup({});

  templateControl = new FormControl(null);

  formFields!: Formfield<any>[];

  operations!: any;

  fields$!: Observable<Formfield<any>[]>;

  fields!: Formfield<any>[];

  quoteStatuses$!: Observable<QuoteStatusDto[]>;

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
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.getTemplates();

    this.templateControl.valueChanges.subscribe({
      next: (value) => {
        if (value) {
          this.fields = value.form.form;
          this.headerForm.getFormGroup().get('name')?.patchValue(value.name);
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

    const status$: Observable<'EDITABLE' | 'NEW'> =
      this.store.select(selectStatus);
    this.fields$ = this.store.select(selectDynamicForm);
    combineLatest([this.fields$, status$]).subscribe(([fields, status]) => {
      if (status !== 'EDITABLE') {
        this.formFields = fields;
      }
    });
  }

  ngAfterViewInit() {
    this.quoteForm.addControl('headerForm', this.headerForm.getFormGroup());
    this.quoteForm.addControl('formFill', this.formFill.getFormGroup());
    this.cd.detectChanges();

    if (this.route.snapshot.queryParams.id) {
      this.quoteId = +this.route.snapshot.queryParams.id;
      this.isEdit = true;
      this.headerForm.getFormGroup().addControl('id', new FormControl(''));
      this.projectQuoteService
        .fetch(this.route.snapshot.queryParams.id)
        .pipe(delay(250))
        .subscribe({
          next: (quote) => {
            let quoteTemplate = this.templates.find(
              (template) => template.id === quote.template_quote_id,
            );
            this.templateControl.patchValue(quoteTemplate, {
              emitEvent: false,
            });
            this.store.dispatch(
              loadForm({
                form: quote.quote.form,
                id: quote.id,
                name: quote.name,
                description: quote.description,
              }),
            );
            this.fields = quote.quote.form;
            this.headerForm.getFormGroup().get('name')?.patchValue(quote.name);
            this.headerForm.getFormGroup().patchValue(quote);
          },
        });
    }
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
    this.headerForm.getFormGroup().markAllAsTouched();
    if (this.headerForm.getFormGroup().invalid) {
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
          ...this.headerForm.getFormGroup().getRawValue(),
          client_id: this.headerForm.getFormGroup().getRawValue().client
            ? this.headerForm.getFormGroup().getRawValue().client.id
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
          ...this.headerForm.getFormGroup().getRawValue(),
          client_id: this.headerForm.getFormGroup().getRawValue().client
            ? this.headerForm.getFormGroup().getRawValue().client.id
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
    this.projectQuoteService
      .resolveOperations(quoteTemplate)
      .subscribe((quote) => {
        this.quote = quote;
      });
    // TODO: Validar que el arreglo de operaciones no venga vacio
  }

  addControlToForm(formGroup: FormGroup) {
    console.log('Agregando controles');
    this.quoteForm.removeControl('formFill');
    this.quoteForm.addControl('formFill', formGroup);
    this.quoteForm.updateValueAndValidity();
  }
}
