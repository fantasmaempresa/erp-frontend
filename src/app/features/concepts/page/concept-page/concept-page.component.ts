import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormValidationService } from '../../../../shared/services/form-validation.service';

@Component({
  selector: 'app-concept-page',
  templateUrl: './concept-page.component.html',
  styleUrls: ['./concept-page.component.scss'],
})
export class ConceptPageComponent {
  formErrors: any = {};

  isEdit = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formValidationService: FormValidationService,
  ) {
    if (this.route.snapshot.queryParams.id) {
      this.isEdit = true;
    }
  }

  async backToListConcept() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }
}
