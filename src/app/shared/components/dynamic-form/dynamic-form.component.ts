import {
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  UntypedFormControl,
  UntypedFormGroup,
  Validator,
  Validators,
} from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Observable, Subscription, tap, using } from 'rxjs';
import { Store } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import {
  selectDynamicForm,
  selectStatus,
  updateValues,
} from '../../../state/dynamic-form';
import { Formfield } from '../../../data/dto';
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
  implements OnInit, OnDestroy, OnChanges, ControlValueAccessor, Validator {
  // @Output() formGroupChanges = new EventEmitter();

  @Input() formFields: Formfield<any>[] = [];

  @Input() onlyRead: boolean = false;

  _onlyRead!: boolean;

  formValues$!: Observable<Formfield<any>[]>;

  formValuesStructure$!: Observable<Formfield<any>[]>;

  fields: Formfield<any>[] = [];

  onChangeSubs: Subscription[] = [];

  formStatus$!: Observable<'EDITABLE' | 'NEW'>;

  constructor(private store: Store, private cd: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.formStatus$ = this.store.select(selectStatus);
    this.formValues$ = this.store.select(selectDynamicForm);
  }

  ngOnChanges({ formFields, onlyRead }: SimpleChanges) {
    if (formFields) {
      if (formFields.currentValue) {
        this.fields = formFields.currentValue;
        this.formGroup = this.createForm(this.fields);
        this.formGroup.updateValueAndValidity();
        this.formValues$ = using(
          () =>
            this.formGroup.valueChanges
              .pipe(
                tap((formValues) => {
                  this.updateDynamicFormState(this.fields, formValues);
                }),
              )
              .subscribe(),
          () => this.store.select(selectDynamicForm),
        );
      }
      if (this.onlyRead) {
        this.formGroup.disable();
      }
      this.cd.detectChanges();
    }

    if (onlyRead) {
      if (onlyRead.currentValue) {
        this.formGroup.disable();
        this._onlyRead = coerceBooleanProperty(onlyRead.currentValue);
      } else {
        this.formGroup.enable();
        this.formGroup.controls.total.disable();
        this._onlyRead = coerceBooleanProperty(onlyRead.currentValue);
      }
    }
  }

  ngOnDestroy() {
    for (let sub of this.onChangeSubs) {
      sub.unsubscribe();
    }
  }

  createForm(controls: Formfield<any>[]): UntypedFormGroup {
    const group: any = {};
    for (const control of controls) {
      group[control.key] = control.required
        ? new UntypedFormControl(control.value || '', [Validators.required])
        : new UntypedFormControl(control.value || '');
    }
    let formGroup = new UntypedFormGroup(group);
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
            id: item.key,
            changes: {
              value:
                item.controlType === 'number'
                  ? +formValues[field]
                  : formValues[field],
            },
          };
          formUpdate.push(singleFormUpdate);
        }
      }
    }
    this.store.dispatch(updateValues({ form: formUpdate }));
  }
}
