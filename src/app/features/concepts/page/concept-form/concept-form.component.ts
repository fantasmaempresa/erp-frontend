import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConceptService } from '../../../../data/services/concept.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Concept } from '../../../../data/models/Concept.model';
import { MessageHelper } from '../../../../shared/helpers/MessageHelper';

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
    operationType: new FormControl('import'),
    formula: new FormGroup({
      operation: new FormControl(null, Validators.required),
      percentage: new FormControl(false),
      operable: new FormControl(false),
      validity: new FormGroup({
        apply: new FormControl(false),
        is_date: new FormControl(false),
        is_range: new FormControl(false),
        type: new FormControl('date'),
        amount: new FormControl(''),
        between: new FormArray([this.createRange()]),
      }),
      range: new FormGroup({
        apply: new FormControl(false),
        between: new FormArray([this.createRange()]),
      }),
    }),
  });

  selectedYear!: number;

  years: number[] = [];

  get operationType() {
    return this.conceptForm.get('operationType') as FormControl;
  }

  get validityType() {
    // @ts-ignore
    return this.conceptForm.get('formula').get('validity').get('type') as FormControl;
  }

  get betweenValidity() {
    // @ts-ignore
    return this.conceptForm.get('formula').get('validity').get('between') as FormArray;
  }

  get betweenRange() {
    // @ts-ignore
    return this.conceptForm.get('formula').get('range').get('between') as FormArray;
  }

  get isOperable() {
    // @ts-ignore
    return this.conceptForm.get('formula').get('operable') as FormControl;
  }

  get isPercentage() {
    // @ts-ignore
    return this.conceptForm.get('formula').get('percentage') as FormControl;
  }

  operations: { value: string; label: string }[] = [
    { value: '+', label: 'Suma' },
    {
      value: '-',
      label: 'Resta',
    },
    { value: '*', label: 'Multiplicación' },
    { value: '+/', label: 'Multiplicar y sumar al resultado' },
    { value: '-/', label: 'Multiplicar y restar al resultado' },
    { value: '/', label: 'División' },
    { value: '+/', label: 'Dividir y sumar al resultado' },
    { value: '-/', label: 'Dividir y restar al resultado' },
  ];

  constructor(
    private conceptService: ConceptService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.createRangeOfYears();
    if (this.route.snapshot.queryParams.id) {
      conceptService.fetch(this.route.snapshot.queryParams.id).subscribe({
        next: (user) => {
          this.conceptForm.addControl('id', new FormControl(''));
          this.conceptForm.patchValue(user);
        },
      });
    }
  }

  ngOnInit(): void {
    this.operationType.valueChanges.subscribe({
      next: (val) => {
        if (val === 'validity' || val === 'range') {
          this.isOperable.patchValue(false);
          this.isPercentage.patchValue(false);
        }
      },
    });

    this.isPercentage.valueChanges.subscribe({
      next: (val) => {
        if (val) {
          this.operationType.patchValue('import');
        }
      },
    });

    this.isOperable.valueChanges.subscribe({
      next: (val) => {
        if (val) {
          this.operationType.patchValue('import');
        }
      },
    });
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
        await this.router.navigate(['../'], { relativeTo: this.route });
      },
    });
  }

  addRange(target: string) {
    if (target === 'validity') {
      this.betweenValidity.push(this.createRange());
    }

    if (target === 'range') {
      this.betweenRange.push(this.createRange());
    }
  }

  removeRange(target: string, index: number) {
    if (target === 'validity') {
      this.betweenValidity.removeAt(index);
    }

    if (target === 'range') {
      this.betweenRange.removeAt(index);
    }
  }

  createRange() {
    return new FormGroup({
      min: new FormControl('', [Validators.required]),
      max: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
    });
  }

  createRangeOfYears(min?: number, max?: number) {
    this.selectedYear = new Date().getFullYear();

    for (let year = this.selectedYear; year >= 1900; year--) {
      this.years.push(year);
    }
  }
}
