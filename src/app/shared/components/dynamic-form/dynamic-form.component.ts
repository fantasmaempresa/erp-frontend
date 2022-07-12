import { Component, EventEmitter, forwardRef, Input, OnDestroy, Output } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validator,
  Validators,
} from '@angular/forms';
import { FormfieldControlService } from '../../../core/services/formfield-control.service';
import { Store } from '@ngrx/store';
import { selectDynamicForm, selectStatus } from '../../../state/dynamic-form/dynamic-form.selector';
import { Observable, Subscription, tap, using } from 'rxjs';
import { Formfield } from '../../../data/models/Formfield.model';
import { updateValues } from '../../../state/dynamic-form/dynamic-form.actions';
import { Update } from '@ngrx/entity';
import { AbstractSubformComponent } from './abstract-subform.component';

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
export class DynamicFormComponent
  extends AbstractSubformComponent
  implements OnDestroy, ControlValueAccessor, Validator
{
  @Output() formGroupChanges = new EventEmitter();

  @Input()
  public set formFields(val: Formfield<any>[]) {
    if (val) {
      this.fields = val;
      this.formGroup = this.createForm(val);
      this.formGroup.updateValueAndValidity();
      this.formValues$ = using(
        () =>
          this.formGroup.valueChanges
            .pipe(
              tap((formValues) => {
                this.updateDynamicFormState(val, formValues);
              }),
            )
            .subscribe(),
        () => this.store.select(selectDynamicForm),
      );
      if (this.onlyRead) {
        this.formGroup.disable();
      }
      this.formGroupChanges.emit(this.formGroup);
    }
  }

  @Input()
  public set onlyRead(val: boolean) {
    console.log('ONLY READ => ', val);
    if (val) {
      this.formGroup.disable();
      console.log(this.formGroup.disabled);
      this._onlyRead = val;
    } else {
      this.formGroup.enable();
      this.formGroup.controls.total.disable();
      this._onlyRead = val;
    }
  }

  public get onlyRead(): boolean {
    return this._onlyRead;
  }

  _onlyRead!: boolean;

  formValues$!: Observable<any>;

  fields!: Formfield<any>[];

  onChangeSubs: Subscription[] = [];

  fields$!: Observable<Formfield<any>[]>;

  formStatus$!: Observable<'EDITABLE' | 'NEW'>;

  constructor(private formfieldService: FormfieldControlService, private store: Store) {
    super();
    this.formGroup = new FormGroup({});
    this.fields$ = store.select(selectDynamicForm);
    this.formStatus$ = store.select(selectStatus);
  }

  ngOnDestroy() {
    for (let sub of this.onChangeSubs) {
      sub.unsubscribe();
    }
  }

  createForm(controls: Formfield<any>[]): FormGroup {
    const group: any = {};
    for (const control of controls) {
      group[control.key] = control.required
        ? new FormControl(control.value || '', [Validators.required])
        : new FormControl(control.value || '');
    }
    let formGroup = new FormGroup(group);
    if (this._onlyRead) {
      formGroup.disable();
    } else {
      formGroup.enable();
      formGroup.controls.total.disable();
    }
    return formGroup;
  }

  registerOnChange(onChange: any): void {
    const sub = this.formGroup.valueChanges.subscribe(onChange);
    this.onChangeSubs.push(sub);
  }

  updateDynamicFormState(formFields: Formfield<any>[], formValues: any) {
    let formUpdate: Update<Formfield<any>>[] = [];
    for (const field in formValues) {
      for (const item of formFields) {
        if (item.key === field) {
          let singleFormUpdate: Update<Formfield<any>> = {
            id: item.id,
            changes: {
              value: item.controlType === 'number' ? +formValues[field] : formValues[field],
            },
          };
          formUpdate.push(singleFormUpdate);
        }
      }
    }
    this.store.dispatch(updateValues({ form: formUpdate }));
  }

  // registerOnTouched(onTouched: any): void {
  //   this.onTouched = onTouched;
  // }
  //
  // writeValue(value: any): void {
  //   if (value) {
  //     this.form.patchValue(value);
  //   }
  // }
  //
  // validate(control: AbstractControl): ValidationErrors | null {
  //   return this.form.valid
  //     ? null
  //     : { invalidForm: { valid: false, message: 'Dynamic form fields are invalid' } };
  // }
}
