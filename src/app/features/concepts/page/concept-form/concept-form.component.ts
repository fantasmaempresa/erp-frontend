import { Component, OnInit } from '@angular/core';
import {
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ConceptService } from '../../../../data/services';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConceptDto } from '../../../../data/dto';
import { MessageHelper } from '../../../../shared/helpers/MessageHelper';

@Component({
  selector: 'app-concept-form',
  templateUrl: './concept-form.component.html',
  styleUrls: ['./concept-form.component.scss'],
})
export class ConceptFormComponent implements OnInit {
  isEdit = false;

  isDateInYears = false;

  years: number[] = [];

  conceptForm = this.createForm();

  selectedYear!: number;

  operations: { value: string; label: string }[] = [
    { value: '+', label: 'Suma' },
    {
      value: '-',
      label: 'Resta',
    },
    { value: '*', label: 'Multiplicación' },
    { value: '+*', label: 'Multiplicar y sumar al resultado' },
    { value: '-*', label: 'Multiplicar y restar al resultado' },
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
      this.isEdit = true;
      conceptService.fetch(this.route.snapshot.queryParams.id).subscribe({
        next: (concept) => {
          this.conceptForm.addControl('id', new UntypedFormControl(''));
          this.conceptForm.patchValue(concept);
          if (concept.formula.validity.apply) {
            this.operationType.patchValue('validity');
            this.conceptForm
              .get('formula')
              ?.get('validity')
              ?.get('amount')
              ?.patchValue(concept.formula.validity.amount);
            if (concept.formula.validity.between.length > 0) {
              this.betweenValidity.clear();
              concept.formula.validity.between.forEach((range) => {
                console.log(range);
                this.betweenValidity.push(this.createRange());
              });
              this.betweenValidity.patchValue(concept.formula.validity.between);
            }
          }
          if (concept.formula.range.apply) {
            this.operationType.patchValue('range');
            if (concept.formula.range.between.length > 0) {
              this.betweenRange.clear();
              concept.formula.range.between.forEach((range) => {
                console.log(range);
                this.betweenRange.push(this.createRange());
              });
              this.betweenRange.patchValue(concept.formula.range.between);
            }
          }
          if (!concept.formula.range.apply && !concept.formula.validity.apply) {
            this.operationType.patchValue('import');
          }
          console.log(this.conceptForm.value);
        },
      });
    }
  }

  get operationType() {
    return this.conceptForm.get('operationType') as UntypedFormControl;
  }

  get validityType() {
    // @ts-ignore
    return this.conceptForm
      .get('formula')
      .get('validity')
      .get('type') as UntypedFormControl;
  }

  get betweenValidity() {
    // @ts-ignore
    return this.conceptForm
      .get('formula')
      .get('validity')
      .get('between') as UntypedFormArray;
  }

  get betweenRange() {
    // @ts-ignore
    return this.conceptForm
      .get('formula')
      .get('range')
      .get('between') as UntypedFormArray;
  }

  get isOperable() {
    // @ts-ignore
    return this.conceptForm
      .get('formula')
      .get('operable') as UntypedFormControl;
  }

  get isPercentage() {
    // @ts-ignore
    return this.conceptForm
      .get('formula')
      .get('percentage') as UntypedFormControl;
  }

  get isDateInValidity() {
    // @ts-ignore
    return this.conceptForm
      .get('formula')
      ?.get('validity')
      ?.get('is_date') as UntypedFormControl;
  }

  get applyValidity() {
    return this.conceptForm
      .get('formula')
      ?.get('validity')
      ?.get('apply') as UntypedFormControl;
  }

  get applyRange() {
    return this.conceptForm
      .get('formula')
      ?.get('range')
      ?.get('apply') as UntypedFormControl;
  }

  get isRangeInValidity() {
    return this.conceptForm
      .get('formula')
      ?.get('validity')
      ?.get('is_range') as UntypedFormControl;
  }

  get formula() {
    return this.conceptForm.get('formula') as UntypedFormGroup;
  }

  ngOnInit(): void {
    this.operationType.valueChanges.subscribe({
      next: (val) => {
        if (val === 'validity' || val === 'range') {
          this.isOperable.patchValue(false);
          this.isPercentage.patchValue(false);
        }
        if (val === 'validity') {
          this.resetRangeForm();
          this.applyValidity.patchValue(true);
          // this.applyRange.patchValue(false);
        }
        if (val === 'range') {
          this.resetValidityForm();
          this.applyRange.patchValue(true);
        }
        if (val === 'import') {
          this.resetValidityForm();
          this.resetRangeForm();
          // this.applyValidity.patchValue(false);
          // this.applyRange.patchValue(false);
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

    this.isDateInValidity.valueChanges.subscribe({
      next: (val) => {
        this.isDateInYears = !!val;
        this.conceptForm
          .get('formula')
          ?.get('validity')
          ?.get('amount')
          ?.patchValue('');
      },
    });

    this.validityType.valueChanges.subscribe({
      next: (val) => {
        if (val === 'range') {
          this.isRangeInValidity.patchValue(true);
          this.isDateInValidity.patchValue(false);
        }
        if (val === 'date') {
          this.isRangeInValidity.patchValue(false);
          this.isDateInValidity.patchValue(true);
        }
      },
    });
  }

  onSubmit() {
    let request$: Observable<ConceptDto>;
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
        MessageHelper.successMessage(
          '¡Éxito!',
          `El concepto ha sido ${message} correctamente.`,
        );
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

  createRange(value?: any) {
    const form = new UntypedFormGroup({
      min: new UntypedFormControl(value ? value.min : null, [
        Validators.required,
      ]),
      max: new UntypedFormControl(value ? value.max : null, [
        Validators.required,
      ]),
      amount: new UntypedFormControl(value ? value.amount : null, [
        Validators.required,
      ]),
    });

    form.get('min')?.valueChanges.subscribe({
      next: (val) => {
        form
          .get('max')
          ?.setValidators([Validators.required, Validators.min(val)]);
        form.get('max')?.updateValueAndValidity();
      },
    });

    return form;
  }

  createRangeOfYears() {
    this.selectedYear = new Date().getFullYear();

    for (let year = this.selectedYear; year >= 1900; year--) {
      this.years.push(year);
    }
  }

  createForm() {
    return new UntypedFormGroup({
      name: new UntypedFormControl('', Validators.required),
      description: new UntypedFormControl('', [Validators.required]),
      amount: new UntypedFormControl(null),
      operationType: new UntypedFormControl('import'),
      formula: new UntypedFormGroup({
        operation: new UntypedFormControl(null),
        percentage: new UntypedFormControl(false),
        operable: new UntypedFormControl(false),
        validity: new UntypedFormGroup({
          apply: new UntypedFormControl(false),
          is_date: new UntypedFormControl(false),
          is_range: new UntypedFormControl(false),
          type: new UntypedFormControl('date'),
          amount: new UntypedFormControl(''),
          between: new UntypedFormArray(
            this.isEdit ? [] : [this.createRange()],
          ),
        }),
        range: new UntypedFormGroup({
          apply: new UntypedFormControl(false),
          between: new UntypedFormArray(
            this.isEdit ? [] : [this.createRange()],
          ),
        }),
      }),
    });
  }

  resetValidityForm() {
    this.formula.setControl(
      'validity',
      new UntypedFormGroup({
        apply: new UntypedFormControl(false),
        is_date: new UntypedFormControl(false),
        is_range: new UntypedFormControl(false),
        type: new UntypedFormControl('date'),
        amount: new UntypedFormControl(''),
        between: new UntypedFormArray([this.createRange()]),
      }),
    );
  }

  resetRangeForm() {
    this.formula.setControl(
      'range',
      new UntypedFormGroup({
        apply: new UntypedFormControl(false),
        between: new UntypedFormArray([this.createRange()]),
      }),
    );
  }
}
