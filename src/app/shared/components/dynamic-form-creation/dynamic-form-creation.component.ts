import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormFieldClass } from '../../../core/classes/FormFieldClass';
import { Store } from '@ngrx/store';
import { setField } from '../../../state/dynamic-form/dynamic-form.actions';
import { Formfield } from '../../../data/models/Formfield.model';
import { Observable } from 'rxjs';
import { selectErrorMessage } from '../../../state/dynamic-form/dynamic-form.selector';

@Component({
  selector: 'app-dynamic-form-creation',
  templateUrl: './dynamic-form-creation.component.html',
  styleUrls: ['./dynamic-form-creation.component.scss'],
})
export class DynamicFormCreationComponent implements OnInit {
  @Output() formField = new EventEmitter<FormFieldClass<string>>();

  types = [
    {
      value: 'textbox',
      label: 'Texto',
      type: 'text',
    },
    {
      value: 'number',
      label: 'Número',
      type: 'number',
    },
    {
      value: 'textarea',
      label: 'Area de texto',
    },
    {
      value: 'dropdown',
      label: 'Selección',
    },
    {
      value: 'date',
      label: 'Fecha',
    },
    {
      value: 'radio',
      label: 'Radio',
    },
    {
      value: 'checkbox',
      label: 'Checkbox',
    },
  ];

  form!: FormGroup;

  get f() {
    return this.form.controls;
  }

  get options() {
    return this.form.controls.options as FormArray;
  }

  errorMessage$: Observable<string>;

  constructor(private store: Store) {
    this.errorMessage$ = store.select(selectErrorMessage);
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      controlType: new FormControl('', [Validators.required]),
      key: new FormControl(''),
      label: new FormControl('', [Validators.required]),
      required: new FormControl(false),
      options: new FormArray([]),
    });

    this.f.controlType.valueChanges.subscribe((value) => {
      this.options.clear();
      if (value === 'dropdown' || value === 'radio' || value === 'checkbox') {
        this.addOption();
      }
    });
  }

  hasOptions() {
    const controlType = this.f.controlType.value;
    return controlType === 'dropdown' || controlType === 'radio' || controlType === 'checkbox';
  }

  addOption() {
    const control = this.form.controls.options as FormArray;
    control.push(this.createOption());
  }

  removeOption(index: number) {
    const control = this.options;
    control.removeAt(index);
  }

  createOption() {
    return new FormGroup({
      key: new FormControl('', Validators.required),
      value: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.form.markAllAsTouched();
    console.log(this.form);
    if (this.form.invalid) {
      console.log(this.form.status);
      return;
    }
    const options: Formfield<any> = { ...this.form.value };
    if (!options.controlType || !options.label) {
      return;
    }
    options.key = options.label.toLowerCase();
    this.store.dispatch(setField({ form: options }));
    this.createForm();
  }
}
