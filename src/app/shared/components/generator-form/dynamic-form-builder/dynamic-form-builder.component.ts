import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-dynamic-form-builder',
  templateUrl: './dynamic-form-builder.component.html',
  styleUrls: ['./dynamic-form-builder.component.scss'],
})
export class DynamicFormBuilderComponent implements OnInit {
  form!: FormGroup;

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
      options: true,
    },
    {
      value: 'date',
      label: 'Fecha',
    },
    {
      value: 'radio',
      label: 'Radio',
      options: true,
    },
    {
      value: 'checkbox',
      label: 'Checkbox',
      options: true,
    },
  ];

  constructor() {
    this.form = new FormGroup({
      id: new FormControl(uuidv4()),
      controlType: new FormControl('', [Validators.required]),
      key: new FormControl(''),
      label: new FormControl('', [Validators.required]),
      required: new FormControl(false),
      options: new FormArray([]),
      value: new FormControl(''),
      order: new FormControl(0),
    });

    this.form.get('controlType')?.valueChanges.subscribe({
      next: (value) => {
        const controlType = this.getControlType(value);
        this.options.clear();
        if (controlType && controlType.options) {
          this.addOption();
        }
      },
    });
  }

  getControlType = (value: any) => this.types.find((type) => type.value === value);

  canShowOptions = (value: any) => this.getControlType(value)?.options;

  ngOnInit(): void {}

  onSubmit() {}

  get options() {
    return this.form.controls.options as FormArray;
  }

  addOption() {
    this.options.push(
      new FormGroup({
        key: new FormControl('', Validators.required),
        value: new FormControl('', Validators.required),
      }),
    );
  }
}
