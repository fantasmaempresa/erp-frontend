import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { FormfieldControlService } from '../../../core/services/formfield-control.service';
import { Store } from '@ngrx/store';
import { selectDynamicForm, selectStatus } from '../../../state/dynamic-form/dynamic-form.selector';
import { Observable, Subscription, take } from 'rxjs';
import { Formfield } from '../../../data/models/Formfield.model';
import { updateValues } from '../../../state/dynamic-form/dynamic-form.actions';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DynamicFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DynamicFormComponent),
      multi: true,
    },
  ],
})
export class DynamicFormComponent implements OnInit, OnDestroy, ControlValueAccessor, Validator {
  formFields!: Formfield<any>[];

  @Input()
  public set save(val: boolean) {
    if (val) {
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
      }
      this.saveInStore();
    }
  }

  onChangeSubs: Subscription[] = [];

  onTouched = () => {};

  onChange = () => {};

  form: FormGroup = new FormGroup({});

  payLoad = '';

  fields$!: Observable<Formfield<any>[]>;

  formStatus$!: Observable<'EDITABLE' | 'NEW'>;

  constructor(private formfieldService: FormfieldControlService, private store: Store) {
    this.fields$ = store.select(selectDynamicForm);
    this.formStatus$ = store.select(selectStatus);
  }

  ngOnInit(): void {
    this.fields$.pipe(take(1)).subscribe({
      next: (formFields) => {
        this.formFields = formFields;
        this.form = this.createForm(formFields);
        this.form.updateValueAndValidity();
      },
    });
  }

  ngOnDestroy() {
    for (let sub of this.onChangeSubs) {
      sub.unsubscribe();
    }
  }

  createForm(controls: Formfield<any>[]): FormGroup {
    const group: any = {};
    for (const control of controls) {
      if (control.key === 'total') {
        group[control.key] = new FormControl('', [Validators.required]);
      } else {
        group[control.key] = control.required
          ? new FormControl(control.value || null, [Validators.required])
          : new FormControl(control.value || null);
      }
    }
    return new FormGroup(group);
  }

  saveInStore() {
    console.log('Estoy guardando en el state');

    // @ts-ignore
    const formUpdate: Update<Formfield<any>>[] = this.formFields.filter((item) => {
      for (const field in this.form.value) {
        if (item.key === field) {
          return {
            id: item.id,
            changes: {
              value:
                item.controlType === 'number' ? +this.form.value[field] : this.form.value[field],
            },
          };
        }
      }
    });
    console.log(formUpdate);
    this.store.dispatch(updateValues({ form: formUpdate }));
  }

  registerOnChange(onChange: any): void {
    const sub = this.form.valueChanges.subscribe(onChange);
    this.onChangeSubs.push(sub);
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  writeValue(value: any): void {
    if (value) {
      this.form.patchValue(value);
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.form.valid
      ? null
      : { invalidForm: { valid: false, message: 'basicInfoForm fields are invalid' } };
  }
}
