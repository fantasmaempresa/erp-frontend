import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormValidationService } from '../../../../shared/services/form-validation.service';
import { MessageHelper } from '../../../../shared/helpers/MessageHelper';
import { ConceptService } from '../../../../data/services/concept.service';
import { Concept } from '../../../../data/models/Concept.model';

@Component({
  selector: 'app-concept-form',
  templateUrl: './concept-form.component.html',
  styleUrls: ['./concept-form.component.scss'],
})
export class ConceptFormComponent {
  conceptForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    amount: new FormControl(null),
    formula: new FormGroup({
      operation: new FormControl(null, Validators.required),
      percentage: new FormControl(null),
    }),
  });

  isEdit = false;

  formErrors: any = {};

  operations: { value: string; label: string }[] = [
    { value: '+', label: 'Suma' },
    {
      value: '-',
      label: 'Resta',
    },
    { value: '*', label: 'Multiplicación' },
    { value: '/', label: 'División' },
  ];

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
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        this.isEdit ? (message = 'actualizado') : (message = 'registrado');
        MessageHelper.successMessage('¡Éxito!', `El concepto ha sido ${message} correctamente.`);
        await this.backToListConcept();
      },
    });
  }
}
