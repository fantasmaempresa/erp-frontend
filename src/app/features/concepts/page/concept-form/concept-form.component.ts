import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormValidationService } from '../../../../shared/services/form-validation.service';
import { MessageHelper } from '../../../../shared/helpers/MessageHelper';
import { validationMessages } from '../../../../core/constants/validationMessages';
import { ConceptService } from '../../../../data/services/concept.service';
import { Concept } from '../../../../data/models/Concept.model';

@Component({
  selector: 'app-concept-form',
  templateUrl: './concept-form.component.html',
  styleUrls: ['./concept-form.component.scss'],
})
export class ConceptFormComponent {
  conceptForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    formula: new FormControl({ test: 'test' }),
    amount: new FormControl(null),
  });

  isEdit = false;

  formErrors: any = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formValidationService: FormValidationService,
    private conceptService: ConceptService,
  ) {
    if (this.route.snapshot.queryParams.id) {
      this.isEdit = true;
      conceptService.fetch(this.route.snapshot.queryParams.id).subscribe({
        next: (user) => {
          this.conceptForm.addControl('id', new FormControl(''));
          this.conceptForm.patchValue(user);
        },
      });
    }
  }

  async backToListConcept() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {
    let request$: Observable<Concept>;
    if (!this.isEdit) {
      request$ = this.conceptService.create(this.conceptForm.value);
    } else {
      request$ = this.conceptService.update(this.conceptForm.value);
    }
    request$.subscribe({
      next: async () => {
        let message;
        this.isEdit ? (message = 'actualizado') : (message = 'registrado');
        MessageHelper.successMessage('¡Éxito!', `El concepto ha sido ${message} correctamente.`);
        await this.backToListConcept();
      },
    });
  }

  logValidationErrors() {
    this.formErrors = this.formValidationService.getValidationErrors(
      this.conceptForm,
      validationMessages,
    );
  }
}
