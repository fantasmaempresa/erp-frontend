import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConceptService } from '../../../../data/services/concept.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Concept } from '../../../../data/models/Concept.model';
import { MessageHelper } from '../../../../shared/helpers/MessageHelper';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-concept-form',
  templateUrl: './concept-form.component.html',
  styleUrls: ['./concept-form.component.scss'],
})
export class ConceptFormComponent implements OnInit {
  isEdit = false;

  conceptForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    amount: new FormControl(null),
    formula: new FormGroup({
      operation: new FormControl(null, Validators.required),
      percentage: new FormControl(null),
    }),
  });

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
    private conceptService: ConceptService,
    private router: Router,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<ConceptFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (this.route.snapshot.queryParams.id) {
      conceptService.fetch(this.route.snapshot.queryParams.id).subscribe({
        next: (user) => {
          this.conceptForm.addControl('id', new FormControl(''));
          this.conceptForm.patchValue(user);
        },
      });
    }
  }

  ngOnInit(): void {}

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
        if (this.data.isModal) {
          this.close(true);
          return;
        }
        if (!this.data) {
          await this.router.navigate(['../'], { relativeTo: this.route });
        }
      },
    });
  }

  public close(value: boolean) {
    console.log(value);
    this.dialogRef.close(value);
  }
}
