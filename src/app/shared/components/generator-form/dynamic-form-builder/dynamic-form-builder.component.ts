import { Component, forwardRef, Injector, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormArray,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControl,
  Validators,
} from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Formfield } from '../../../../data/models/Formfield.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dynamic-form-builder',
  templateUrl: './dynamic-form-builder.component.html',
  styleUrls: ['./dynamic-form-builder.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DynamicFormBuilderComponent),
      multi: true,
    },
  ],
})
export class DynamicFormBuilderComponent implements ControlValueAccessor, OnInit {
  form!: FormGroup;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (_: any) => {};

  onTouch = () => {};

  formFields: Formfield<any>[] = [];

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

  edit = false;

  ngControl!: NgControl;

  constructor(private inj: Injector) {
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

  ngOnInit(): void {
    this.ngControl = this.inj.get(NgControl);
    this.ngControl.valueAccessor = this;
  }

  writeValue(formFields: Formfield<any>[]): void {
    if (formFields) {
      this.formFields = formFields;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  getControlType = (value: any) => this.types.find((type) => type.value === value);

  canShowOptions = (value: any) => this.getControlType(value)?.options;

  labelButton = (edit: boolean) => (edit ? 'Modificar' : 'Crear');

  onSubmit(ngForm: FormGroupDirective) {
    if (this.form.invalid) {
      return;
    }
    const label: string = this.form.get('label')?.value;
    this.form.get('key')?.setValue(label.toLowerCase());
    // @ts-ignore
    const field = this.form.value;
    if (this.edit) {
      const index = this.formFields.findIndex((formField) => formField.id === field.id);
      this.formFields[index] = field;
      this.edit = false;
    } else {
      this.formFields.push(field);
    }
    ngForm.form.markAsPristine();
    ngForm.resetForm();

    this.notifyValueChange();
  }

  private notifyValueChange() {
    this.onChange(this.formFields);
    this.onTouch();
  }

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

  deleteOption(index: number) {
    this.options.removeAt(index);
  }

  removeFormField(field: Formfield<any>) {
    const index = this.formFields.findIndex((formField) => formField.id === field.id);
    this.formFields.splice(index, 1);
    this.notifyValueChange();
  }

  drop(event: CdkDragDrop<Formfield<any>[]>) {
    moveItemInArray(this.formFields, event.previousIndex, event.currentIndex);
    this.notifyValueChange();
  }

  editFormField(field: Formfield<any>) {
    this.edit = true;
    this.form.patchValue(field);
    if (field.options.length > 0) {
      this.options.clear();
      field.options.forEach(() => {
        this.addOption();
      });
      this.options.patchValue(field.options);
    }

    this.notifyValueChange();
  }

  cancelEdit(ngForm: FormGroupDirective) {
    ngForm.form.markAsPristine();
    ngForm.resetForm();
    this.edit = false;
  }
}
