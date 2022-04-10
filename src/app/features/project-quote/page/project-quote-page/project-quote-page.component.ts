import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TemplateQuotesService } from '../../../../data/services/template-quotes.service';
import { combineLatest, Observable, take } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Formfield } from '../../../../data/models/Formfield.model';
import {
  selectDynamicForm,
  selectStatus,
} from '../../../../state/dynamic-form/dynamic-form.selector';
import { ProjectQuoteService } from '../../../../data/services/project-quote.service';
import { MessageHelper } from '../../../../shared/helpers/MessageHelper';
import faker from '@faker-js/faker';

@Component({
  selector: 'app-project-quote-page',
  templateUrl: './project-quote-page.component.html',
  styleUrls: ['./project-quote-page.component.scss'],
})
export class ProjectQuotePageComponent {
  HEADER_STEP = 0;

  FORM_BUILD_STEP = 1;

  FORM_FILL_STEP = 2;

  OPERATIONS_FORM_STEP = 3;

  PREVIEW_STEP = 4;

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
  });

  formFields!: Formfield<any>[];

  operationsForm = new FormGroup({});

  step = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
    private templateQuotesService: TemplateQuotesService,
    private projectQuoteService: ProjectQuoteService,
  ) {
    const status$: Observable<'EDITABLE' | 'NEW'> = store.select(selectStatus);
    const fields$: Observable<Formfield<any>[]> = store.select(selectDynamicForm);
    combineLatest([fields$, status$]).subscribe(([fields, status]) => {
      if (status !== 'EDITABLE') {
        this.formFields = fields;
      }
    });
  }

  async backToListUsers() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.quoteForm.markAllAsTouched();
    if (this.quoteForm.invalid) {
      return;
    }

    this.step++;

    // if (!this.isOperationGroupValid()) {
    //   return;
    // }
    //
    // if (this.step === 2) {
    //   this.store.dispatch(changeStatus({ status: 'EDITABLE' }));
    // }
  }

  goToHeaderForm() {
    this.step = this.HEADER_STEP;
  }

  goToFormBuildStep() {
    this.step = this.FORM_BUILD_STEP;
  }

  goToFormFill() {
    this.saveState = false;
    this.step = this.FORM_FILL_STEP;
    // this.store.dispatch(changeStatus({ status: 'EDITABLE' }));
  }

  goToOperationsForm() {
    this.step = this.OPERATIONS_FORM_STEP;
  }

  goToPreview() {
    this.step = this.PREVIEW_STEP;
  }

  isOperationGroupValid() {
    if (this.step !== 3) {
      return true;
    }

    console.log('Validando operation form');
    this.operationsForm.markAllAsTouched();

    return !this.operationsForm.invalid;
  }

  prevStep() {
    this.step--;
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
}
