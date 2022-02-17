import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormFieldClass } from '../../../../core/classes/FormFieldClass';
import { Store } from '@ngrx/store';
import { TemplateQuotesService } from '../../../../data/services/template-quotes.service';
import { map } from 'rxjs';
import { TemplateQuotes } from '../../../../data/models/TemplateQuotes.model';
import { FormControl } from '@angular/forms';
import { emptyForm, loadForm, setField } from '../../../../state/dynamic-form/dynamic-form.actions';
import { Formfield } from '../../../../data/models/Formfield.model';

@Component({
  selector: 'app-project-quote-page',
  templateUrl: './project-quote-page.component.html',
  styleUrls: ['./project-quote-page.component.scss'],
})
export class ProjectQuotePageComponent implements OnInit {
  formFields: FormFieldClass<any>[] = [];

  templateControl = new FormControl(null);

  step = 0;

  templates$!: TemplateQuotes[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
    private templateQuotesService: TemplateQuotesService,
  ) {
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
  }

  prevStep() {
    this.step--;
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
}
