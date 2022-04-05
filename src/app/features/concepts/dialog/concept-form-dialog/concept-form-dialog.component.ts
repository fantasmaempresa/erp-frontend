import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Concept } from '../../../../data/models/Concept.model';
import { MessageHelper } from '../../../../shared/helpers/MessageHelper';
import { ConceptService } from '../../../../data/services/concept.service';

@Component({
  selector: 'app-concept-form-dialog',
  templateUrl: './concept-form-dialog.component.html',
  styleUrls: ['./concept-form-dialog.component.scss'],
})
export class ConceptFormDialogComponent implements OnInit {
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
    public dialogRef: MatDialogRef<ConceptFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private conceptService: ConceptService,
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    let request$: Observable<Concept>;
    request$ = this.conceptService.create(this.conceptForm.value);

    request$.subscribe({
      next: async (value) => {
        let message = 'registrado';
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        MessageHelper.successMessage('¡Éxito!', `El concepto ha sido ${message} correctamente.`);
        this.dialogRef.close(value);
      },
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
