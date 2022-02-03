import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormField } from '../../../core/classes/FormField';

@Component({
  selector: 'app-dynamic-form-creation',
  templateUrl: './dynamic-form-creation.component.html',
  styleUrls: ['./dynamic-form-creation.component.scss'],
})
export class DynamicFormCreationComponent implements OnInit {
  @Output() formField = new EventEmitter<FormField<string>>();

  types = [
    {
      value: 'textbox',
      label: 'Texto',
      type: 'text',
    },
    {
      value: 'textbox',
      label: 'Número',
      type: 'number',
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
      label: 'Opciones',
    },
    {
      value: 'checkbox',
      label: 'Multiples valores',
    },
  ];

  form!: FormGroup;

  get f() {
    return this.form.controls;
  }

  get options() {
    return this.form.controls.options as FormArray;
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      controlType: new FormControl(''),
      key: new FormControl(''),
      label: new FormControl(''),
      required: new FormControl(false),
      options: new FormArray([this.createOption()]),
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
    const options = this.form.value;
    if (!options.controlType || !options.label) {
      return;
    }
    console.log('Pase la guarda');
    options.key = options.label.toLowerCase();
    console.log(options);
    this.formField.emit(new FormField(options));
    this.createForm();
  }
}
