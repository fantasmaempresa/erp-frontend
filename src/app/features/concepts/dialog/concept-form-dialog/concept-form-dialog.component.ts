import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { ConceptDto } from "../../../../data/dto/Concept.dto";
import { MessageHelper } from "../../../../shared/helpers/MessageHelper";
import { ConceptService } from "../../../../data/services/concept.service";

@Component({
  selector: "app-concept-form-dialog",
  templateUrl: "./concept-form-dialog.component.html",
  styleUrls: ["./concept-form-dialog.component.scss"]
})
export class ConceptFormDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConceptFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private conceptService: ConceptService,
  ) {}

  isDateInYears = false;

  years: number[] = [];

  conceptForm = this.createForm();

  selectedYear!: number;

  get operationType() {
    return this.conceptForm.get("operationType") as UntypedFormControl;
  }

  get validityType() {
    // @ts-ignore
    return this.conceptForm
      .get("formula")
      .get("validity")
      .get("type") as UntypedFormControl;
  }

  get betweenValidity() {
    // @ts-ignore
    return this.conceptForm
      .get("formula")
      .get("validity")
      .get("between") as UntypedFormArray;
  }

  get betweenRange() {
    // @ts-ignore
    return this.conceptForm
      .get("formula")
      .get("range")
      .get("between") as UntypedFormArray;
  }

  get isOperable() {
    // @ts-ignore
    return this.conceptForm
      .get("formula")
      .get("operable") as UntypedFormControl;
  }

  get isPercentage() {
    // @ts-ignore
    return this.conceptForm
      .get("formula")
      .get("percentage") as UntypedFormControl;
  }

  get isDateInValidity() {
    // @ts-ignore
    return this.conceptForm
      .get("formula")
      ?.get("validity")
      ?.get("is_date") as UntypedFormControl;
  }

  get applyValidity() {
    return this.conceptForm
      .get("formula")
      ?.get("validity")
      ?.get("apply") as UntypedFormControl;
  }

  get applyRange() {
    return this.conceptForm
      .get("formula")
      ?.get("range")
      ?.get("apply") as UntypedFormControl;
  }

  get isRangeInValidity() {
    return this.conceptForm
      .get("formula")
      ?.get("validity")
      ?.get("is_range") as UntypedFormControl;
  }

  get formula() {
    return this.conceptForm.get("formula") as UntypedFormGroup;
  }

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
          .get("formula")
          ?.get("validity")
          ?.get("amount")
          ?.patchValue("");
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
    request$ = this.conceptService.create(this.conceptForm.value);

    request$.subscribe({
      next: async (value) => {
        let message = "registrado";
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        MessageHelper.successMessage(
          "¡Éxito!",
          `El concepto ha sido ${message} correctamente.`
        );
        this.dialogRef.close(value);
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
        Validators.required
      ]),
      max: new UntypedFormControl(value ? value.max : null, [
        Validators.required
      ]),
      amount: new UntypedFormControl(value ? value.amount : null, [
        Validators.required
      ])
    });

    form.get("min")?.valueChanges.subscribe({
      next: (val) => {
        form
          .get("max")
          ?.setValidators([Validators.required, Validators.min(val)]);
        form.get("max")?.updateValueAndValidity();
      }
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
      name: new UntypedFormControl("", Validators.required),
      description: new UntypedFormControl(""),
      amount: new UntypedFormControl(null),
      operationType: new UntypedFormControl("import"),
      formula: new UntypedFormGroup({
        operation: new UntypedFormControl(null),
        percentage: new UntypedFormControl(false),
        operable: new UntypedFormControl(false),
        validity: new UntypedFormGroup({
          apply: new UntypedFormControl(false),
          is_date: new UntypedFormControl(false),
          is_range: new UntypedFormControl(false),
          type: new UntypedFormControl("date"),
          amount: new UntypedFormControl(""),
          between: new UntypedFormArray([this.createRange()])
        }),
        range: new UntypedFormGroup({
          apply: new UntypedFormControl(false),
          between: new UntypedFormArray([this.createRange()])
        })
      })
    });
  }

  resetValidityForm() {
    this.formula.setControl(
      "validity",
      new UntypedFormGroup({
        apply: new UntypedFormControl(false),
        is_date: new UntypedFormControl(false),
        is_range: new UntypedFormControl(false),
        type: new UntypedFormControl("date"),
        amount: new UntypedFormControl(""),
        between: new UntypedFormArray([this.createRange()])
      })
    );
  }

  resetRangeForm() {
    this.formula.setControl(
      "range",
      new UntypedFormGroup({
        apply: new UntypedFormControl(false),
        between: new UntypedFormArray([this.createRange()])
      })
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
