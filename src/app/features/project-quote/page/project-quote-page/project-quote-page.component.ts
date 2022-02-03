import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormField } from '../../../../core/classes/FormField';

@Component({
  selector: 'app-project-quote-page',
  templateUrl: './project-quote-page.component.html',
  styleUrls: ['./project-quote-page.component.scss'],
})
export class ProjectQuotePageComponent {
  formFields: FormField<any>[] = [];

  step = 0;

  constructor(private router: Router, private route: ActivatedRoute) {}

  addFieldToFormGroup(event: FormField<any>) {
    if (this.formFields.length === 0) {
      this.formFields = [event];
      console.log('formFields vacio', this.formFields);
    } else {
      this.formFields = [...this.formFields, event];
    }
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
