import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormFieldClass } from '../../../../core/classes/FormFieldClass';
import { Store } from '@ngrx/store';
import { Formfield } from '../../../../data/models/Formfield.model';

@Component({
  selector: 'app-project-quote-page',
  templateUrl: './project-quote-page.component.html',
  styleUrls: ['./project-quote-page.component.scss'],
})
export class ProjectQuotePageComponent {
  formFields: FormFieldClass<any>[] = [];

  step = 0;

  constructor(private router: Router, private route: ActivatedRoute, private store: Store) {}

  addFieldToFormGroup(event: Formfield<any>) {
    // if (this.formFields.length === 0) {
    //   this.formFields = [event];
    //   console.log('formFields vacio', this.formFields);
    // } else {
    //   this.formFields = [...this.formFields, event];
    // }
    // this.store.dispatch(setField({ form: event }));
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
