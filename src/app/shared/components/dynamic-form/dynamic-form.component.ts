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
import { updateField } from '../../../state/dynamic-form/dynamic-form.actions';
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
  @Input() onlyRead: boolean = false;

  formFields!: Formfield<any>[];

  form: FormGroup = new FormGroup({});

  @Input()
  public set save(val: boolean) {
    if (this.form.status === 'VALID' && this.form.touched) {
      if (val) {
        console.log('Formulario valido y save true');
        this.saveInStore();
      }
    }
    this.form.markAllAsTouched();
  }

  onChangeSubs: Subscription[] = [];

  onTouched = () => {};

  onChange = () => {};

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
        console.log(formFields);
        if (formFields) {
          this.formFields = formFields;
          this.form = this.createForm(formFields);
          this.form.updateValueAndValidity();
        }
      },
    });
  }

  ngOnDestroy() {
    for (let sub of this.onChangeSubs) {
      sub.unsubscribe();
    }
    if (this.onlyRead) {
      return;
    }
    this.saveInStore();
  }

  createForm(controls: Formfield<any>[]): FormGroup {
    const group: any = {};
    for (const control of controls) {
      if (control.key === 'total') {
        group[control.key] = new FormControl({ value: '', disabled: true });
      } else {
        group[control.key] = control.required
          ? new FormControl(control.value || '', [Validators.required])
          : new FormControl(control.value || '');
      }
    }
    return new FormGroup(group);
  }

  saveInStore() {
    console.log('Guardando en el store');
    let formUpdate: Update<Formfield<any>>;
    for (const field in this.form.value) {
      for (const item of this.formFields) {
        if (item.key === field) {
          formUpdate = {
            id: item.id,
            changes: {
              value:
                item.controlType === 'number' ? +this.form.value[field] : this.form.value[field],
            },
          };
          this.store.dispatch(updateField({ form: formUpdate }));
        }
      }
    }
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
    console.log(control);
    return this.form.valid
      ? null
      : { invalidForm: { valid: false, message: 'Dynamic form fields are invalid' } };
  }
}
