import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
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
  implements OnInit, OnDestroy, ControlValueAccessor, Validator
{
  @Input()
  public set formFields(val: Formfield<any>[]) {
    if (val) {
      console.log(val);
      this.fields = val;
      this.formGroup = this.createForm(val);
      this.formGroup.updateValueAndValidity();
      this.formValues$ = using(
        () =>
          this.formGroup.valueChanges
            .pipe(
              tap((formValues) => {
                let formUpdate: Update<Formfield<any>>[] = [];
                for (const field in formValues) {
                  for (const item of val) {
                    if (item.key === field) {
                      let singleFormUpdate: Update<Formfield<any>> = {
                        id: item.id,
                        changes: {
                          value:
                            item.controlType === 'number' ? +formValues[field] : formValues[field],
                        },
                      };
                      formUpdate.push(singleFormUpdate);
                    }
                  }
                }
                this.store.dispatch(updateValues({ form: formUpdate }));
              }),
            )
            .subscribe(),
        () => this.store.select(selectDynamicForm),
      );
      this.formGroupChanges.emit(this.formGroup);
      // console.log(this.formGroup.parent);
      // this.formGroup.parent?.updateValueAndValidity();
      if (this.onlyRead) {
        this.formGroup.disable();
      }
    }
  }

  @Output() formGroupChanges = new EventEmitter();

  @Input()
  public set onlyRead(val: boolean) {
    console.log('ONLY READ => ', val);
    if (val) {
      this.formGroup.disable();
      console.log(this.formGroup.disabled);
    } else {
      this.formGroup.enable();
    }
  }

  formValues$!: Observable<any>;

  @Input()
  public set save(val: boolean) {
    if (this.formGroup.status === 'VALID' && this.formGroup.touched) {
      if (val) {
        console.log('Formulario valido y save true');
        this.saveInStore();
      }
    }
    this.formGroup.markAllAsTouched();
  }

  fields!: Formfield<any>[];

  onChangeSubs: Subscription[] = [];

  onTouched = () => {};

  onChange = () => {};

  payLoad = '';

  fields$!: Observable<Formfield<any>[]>;

  formStatus$!: Observable<'EDITABLE' | 'NEW'>;

  constructor(private formfieldService: FormfieldControlService, private store: Store) {
    super();
    this.formGroup = new FormGroup({});
    this.fields$ = store.select(selectDynamicForm);
    // .pipe(tap((value) => console.log('fields$ => ', value)));
    this.formStatus$ = store.select(selectStatus);
    // this.fields$.pipe(take(1)).subscribe({
    //   next: (formFields) => {
    //     console.log('===== Creando form!! =====');
    //     if (formFields) {
    //       this.formFields = formFields;
    //       this.formGroup = this.createForm(formFields);
    //       this.formGroup.updateValueAndValidity();
    //       if (this.onlyRead) {
    //         this.formGroup.disable();
    //       }
    //     }
    //   },
    // });
  }

  ngOnInit(): void {}

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
    console.log('CREAND FORM');
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
    // for (const field in this.form.value) {
    //   for (const item of this.formFields) {
    //     if (item.key === field) {
    //       formUpdate = {
    //         id: item.id,
    //         changes: {
    //           value:
    //             item.controlType === 'number' ? +this.form.value[field] : this.form.value[field],
    //         },
    //       };
    //       this.store.dispatch(updateField({ form: formUpdate }));
    //     }
    //   }
    // }
  }

  registerOnChange(onChange: any): void {
    const sub = this.formGroup.valueChanges.subscribe(onChange);
    this.onChangeSubs.push(sub);
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
