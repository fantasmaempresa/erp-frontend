import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { QuoteTemplateService } from '../../../../data/services/quote-template.service';
import { combineLatest, Observable, take } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Formfield } from '../../../../data/models/Formfield.model';
import {
  selectDynamicForm,
  selectStatus,
} from '../../../../state/dynamic-form/dynamic-form.selector';
import { emptyForm } from '../../../../state/dynamic-form/dynamic-form.actions';
import { ProjectQuoteService } from '../../../../data/services/project-quote.service';
import { MessageHelper } from '../../../../shared/helpers/MessageHelper';
import faker from '@faker-js/faker';

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
    name: new FormControl(faker.datatype.uuid(), [Validators.required]),
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

  formFields!: Formfield<any>[];

  operationsForm = new FormGroup({});

  fields$!: Observable<Formfield<any>[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
    private templateQuotesService: QuoteTemplateService,
    private projectQuoteService: ProjectQuoteService,
  ) {
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
    this.step = this.PREVIEW_STEP;
  }

  async saveQuote() {
    this.store
      .select(selectDynamicForm)
      .pipe(take(1))
      .subscribe((form) => {
        const quote = {
          ...this.headerForm.getRawValue(),
          quote: {
            form: {
              ...form,
            },
            operations: {
              ...this.operationsForm.getRawValue(),
            },
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
}
