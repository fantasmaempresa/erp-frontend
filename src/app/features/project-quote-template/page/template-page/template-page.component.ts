import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-template-page',
  templateUrl: './template-page.component.html',
  styleUrls: ['./template-page.component.scss'],
})
export class TemplatePageComponent implements OnInit {
  FORM_BUILD_STEP = 1;

  CONCEPTS_ASSIGNMENT = 2;

  PREVIEW_STEP = 3;

  step = 0;

  templateForm: FormGroup = new FormGroup({
    name: new FormControl(),
  });

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

  submit() {}
}
