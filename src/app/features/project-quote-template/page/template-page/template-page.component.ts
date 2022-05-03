import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup } from '@angular/forms';
import { selectDynamicForm } from '../../../../state/dynamic-form/dynamic-form.selector';
import { take } from 'rxjs';
import { MessageHelper } from '../../../../shared/helpers/MessageHelper';

@Component({
  selector: 'app-template-page',
  templateUrl: './template-page.component.html',
  styleUrls: ['./template-page.component.scss'],
})
export class TemplatePageComponent implements OnInit {
  FORM_BUILD_STEP = 0;

  CONCEPTS_ASSIGNMENT = 1;

  PREVIEW_STEP = 2;

  step = 0;

  templateForm: FormGroup = new FormGroup({
    name: new FormControl(),
  });

  previewForm: FormControl = new FormControl(null);

  operationsForm = new FormGroup({});

  constructor(private router: Router, private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    console.log('Hi on ngOnInit');
  }

  async back() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }

  goToFormBuildStep() {
    this.step = this.FORM_BUILD_STEP;
  }

  goToPreview() {
    this.step = this.PREVIEW_STEP;
  }

  goToConceptsAssignment() {
    this.step = this.CONCEPTS_ASSIGNMENT;
  }

  submit() {
    // this.store
    //   .select(selectDynamicForm)
    //   .pipe(take(1))
    //   .subscribe((form) => {
    //     const quote = {
    //       quote: {
    //         form: {
    //           ...form,
    //         },
    //         operations: {
    //           ...this.operationsForm.getRawValue(),
    //         },
    //       },
    //     };
    //     console.log(quote);
    //     this.projectQuoteService.save(quote).subscribe((val) => {
    //       console.log(val);
    //       MessageHelper.successMessage('Éxito', 'Cotización guardada');
    //       this.router.navigate(['../'], { relativeTo: this.route });
    //     });
    //   });
  }
}
