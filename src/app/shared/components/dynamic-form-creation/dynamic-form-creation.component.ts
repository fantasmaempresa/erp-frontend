import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormFieldClass } from '../../../core/classes/FormFieldClass';
import { Store } from '@ngrx/store';
import { removeField, setField } from '../../../state/dynamic-form/dynamic-form.actions';
import { Formfield } from '../../../data/models/Formfield.model';
import { lastValueFrom, Observable } from 'rxjs';
import {
  selectDynamicForm,
  selectDynamicFormId,
  selectDynamicFormName,
  selectErrorMessage,
} from '../../../state/dynamic-form/dynamic-form.selector';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TemplateQuotes } from '../../../data/models/TemplateQuotes.model';
import Swal from 'sweetalert2';
import { MessageHelper } from '../../helpers/MessageHelper';
import { TemplateQuotesService } from '../../../data/services/template-quotes.service';

@Component({
  selector: 'app-dynamic-form-creation',
  templateUrl: './dynamic-form-creation.component.html',
  styleUrls: ['./dynamic-form-creation.component.scss'],
})
export class DynamicFormCreationComponent implements OnInit {
  @Output() formField = new EventEmitter<FormFieldClass<string>>();

  formFields$!: Observable<Formfield<any>[]>;

  formFields!: Formfield<any>[];

  templateId = 0;

  templateName = '';

  dynamicFormId$!: Observable<number>;

  dynamicFormName$!: Observable<string>;

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

  constructor(private store: Store, private templateQuotesService: TemplateQuotesService) {
    this.errorMessage$ = store.select(selectErrorMessage);
    this.formFields$ = store.select(selectDynamicForm);
    this.formFields$.subscribe((data) => {
      this.formFields = data;
    });

    this.dynamicFormId$ = store.select(selectDynamicFormId);
    this.dynamicFormId$.subscribe((id) => (this.templateId = id));
    this.dynamicFormName$ = store.select(selectDynamicFormName);
    this.dynamicFormName$.subscribe((name) => (this.templateName = name));
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
      value: new FormControl(''),
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

  removeField(formField: Formfield<any>) {
    this.store.dispatch(removeField({ payload: formField }));
  }

  onSubmit() {
    this.form.markAllAsTouched();
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

  saveTemplate() {
    const template: TemplateQuotes = {
      id: this.templateId,
      name: this.templateName,
      form: this.formFields,
    };
    if (this.templateId !== 0) {
      this.templateQuotesService.update(template).subscribe((data) => console.log(data));
      return;
    }

    if (this.templateId === 0) {
      // TODO: Modificar para utilizar un dialog de angular
      Swal.fire({
        title: 'Guardar plantilla',
        icon: 'question',
        input: 'text',
        text: 'Ponle un titulo a la plantilla',
        confirmButtonColor: '#dfc356',
        focusConfirm: false,
        confirmButtonText: 'Guardar',
        preConfirm: (name) => {
          template.name = name;
          let request = this.templateQuotesService.save(template);
          return lastValueFrom(request);
        },
      }).then(() => {
        MessageHelper.successMessage('Exito', 'Plantilla guardada con éxito');
      });
    }
  }

  drop(event: CdkDragDrop<Formfield<any>[]>) {
    moveItemInArray(this.formFields, event.previousIndex, event.currentIndex);
  }
}
