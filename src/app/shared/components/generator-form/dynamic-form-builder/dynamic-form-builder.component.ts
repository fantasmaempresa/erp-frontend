import { Component, forwardRef, Injector, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControl,
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Formfield } from '../../../../data/dto/Formfield.dto';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { v4 as uuidv4 } from 'uuid';

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
export class DynamicFormBuilderComponent
  implements ControlValueAccessor, OnInit
{
  form!: UntypedFormGroup;

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
    },
    {
      value: 'file',
      label: 'Archivo',
    },
    {
      value: 'image',
      label: 'Imagen',
    },
    {
      value: 'coordinate',
      label: 'Coordenada',
    },
  ];

  edit = false;

  ngControl!: NgControl;

  constructor(private inj: Injector) {
    this.form = new UntypedFormGroup({
      id: new UntypedFormControl(),
      controlType: new UntypedFormControl('', [Validators.required]),
      key: new UntypedFormControl(''),
      label: new UntypedFormControl('', [Validators.required]),
      required: new UntypedFormControl(false),
      options: new UntypedFormArray([]),
      value: new UntypedFormControl(''),
      order: new UntypedFormControl(0),
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

  getControlType = (value: any) =>
    this.types.find((type) => type.value === value);

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
      console.log(this.formFields);
      const index = this.formFields.findIndex(
        (formField) => formField.id === field.id,
      );
      console.log(index);
      this.formFields[index] = field;
      console.log(this.formFields[index]);
      this.edit = false;
    } else {
      field.id = uuidv4(); //generate a new id for new fields
      this.formFields.push(field);
    }
    ngForm.form.markAsPristine();
    ngForm.resetForm();

    this.notifyValueChange();
  }

  private notifyValueChange() {
    if (this.formFields.length > 0) {
      this.onChange(this.formFields);
    } else {
      this.onChange(null);
    }
    this.onTouch();
  }

  get options() {
    return this.form.controls.options as UntypedFormArray;
  }

  addOption() {
    this.options.push(
      new UntypedFormGroup({
        key: new UntypedFormControl('', Validators.required),
        value: new UntypedFormControl('', Validators.required),
      }),
    );
  }

  deleteOption(index: number) {
    this.options.removeAt(index);
  }

  removeFormField(field: Formfield<any>) {
    const index = this.formFields.findIndex(
      (formField) => formField.id === field.id,
    );
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
