import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TemplateQuotesService } from '../../../../data/services/template-quotes.service';
import { combineLatest, map, Observable } from 'rxjs';
import { TemplateQuotes } from '../../../../data/models/TemplateQuotes.model';
import { FormControl, FormGroup } from '@angular/forms';
import {
  changeStatus,
  emptyForm,
  loadForm,
  setField,
} from '../../../../state/dynamic-form/dynamic-form.actions';
import { Formfield } from '../../../../data/models/Formfield.model';
import {
  selectDynamicForm,
  selectStatus,
} from '../../../../state/dynamic-form/dynamic-form.selector';
import { ProjectQuoteService } from '../../../../data/services/project-quote.service';
import { MessageHelper } from '../../../../shared/helpers/MessageHelper';

@Component({
  selector: 'app-project-quote-page',
  templateUrl: './project-quote-page.component.html',
  styleUrls: ['./project-quote-page.component.scss'],
})
export class ProjectQuotePageComponent implements OnInit {
  quoteForm = new FormGroup({});

  formFields!: Formfield<any>[];

  operationsForm = new FormGroup({});

  templateControl = new FormControl(null);

  step = 0;

  templates$!: TemplateQuotes[];

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
    templateQuotesService
      .fetchAll()
      .pipe(
        map((templates) => {
          return templates.data;
        }),
      )
      .subscribe((data) => (this.templates$ = data));

    this.templateControl.valueChanges.subscribe({
      next: (value) => {
        if (value) {
          this.store.dispatch(emptyForm());
          this.addTotalToTemplate();
          this.store.dispatch(loadForm({ form: value.form, id: value.id, name: value.name }));
        } else {
          this.store.dispatch(emptyForm());
          this.addTotalToTemplate();
        }
      },
    });
  }

  ngOnInit() {
    this.addTotalToTemplate();
  }

  async backToListUsers() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
    if (this.step === 2) {
      console.log(this.formFields);
      this.store.dispatch(changeStatus({ status: 'EDITABLE' }));
    }
    if (this.step === 3) {
    }
  }

  prevStep() {
    this.step--;
    this.store.dispatch(changeStatus({ status: 'NEW' }));
  }

  addTotalToTemplate() {
    const form: Formfield<number> = {
      required: false,
      controlType: 'number',
      label: 'Total',
      value: 0,
      options: [],
      key: 'total',
      type: 'number',
    };
    this.store.dispatch(setField({ form }));
  }

  getDynamicForm() {}

  async saveQuote() {
    this.store.select(selectDynamicForm).subscribe((form) => {
      const quote = {
        ...this.quoteForm.getRawValue(),
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
      });
    });
  }
}
