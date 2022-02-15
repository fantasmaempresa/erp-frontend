import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormFieldClass } from '../../../../core/classes/FormFieldClass';
import { Store } from '@ngrx/store';
import { TemplateQuotesService } from '../../../../data/services/template-quotes.service';
import { map } from 'rxjs';
import { TemplateQuotes } from '../../../../data/models/TemplateQuotes.model';
import { FormControl } from '@angular/forms';
import { emptyForm, loadForm } from '../../../../state/dynamic-form/dynamic-form.actions';

@Component({
  selector: 'app-project-quote-page',
  templateUrl: './project-quote-page.component.html',
  styleUrls: ['./project-quote-page.component.scss'],
})
export class ProjectQuotePageComponent {
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
        console.log(value);
        if (value) {
          this.store.dispatch(loadForm({ form: value.form, id: value.id, name: value.name }));
        } else {
          this.store.dispatch(emptyForm());
        }
      },
    });
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
}
