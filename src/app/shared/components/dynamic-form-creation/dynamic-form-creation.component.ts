import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroupDirective,
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  clearError,
  emptyForm,
  loadForm,
  removeField,
  selectDynamicForm,
  selectDynamicFormEssentialData,
  selectErrorMessage,
  selectIsEditable,
  setField,
  updateField,
} from '../../../state/dynamic-form';
import { Formfield, QuoteTemplate } from '../../../data/dto';
import { map, Observable, of, switchMap } from 'rxjs';
import { MessageHelper } from '../../helpers/MessageHelper';
import {
  FormStructureService,
  QuoteTemplateService,
} from '../../../data/services';
import { Update } from '@ngrx/entity';
import { FormStructure } from '../../../data/models/FormStructure.model';
import { OnSaveDialogComponent } from './on-save-dialog/on-save-dialog.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { v4 as uuidv4 } from 'uuid';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dynamic-form-creation',
  templateUrl: './dynamic-form-creation.component.html',
  styleUrls: ['./dynamic-form-creation.component.scss'],
})
export class DynamicFormCreationComponent implements OnInit {
  templateControl = new UntypedFormControl(null);

  _template!: QuoteTemplate;

  @Input() set template(value: QuoteTemplate) {
    if (value) {
      this._template = value;
      this.templateControl.patchValue(value.form);
    }
  }

  get template() {
    return this._template;
  }

  formFields$!: Observable<Formfield<any>[]>;

  formFields!: Formfield<any>[];

  templateId = 0;

  templateName = '';

  templateDescription = '';

  dynamicFormEssentialData$!: Observable<{
    id: number;
    name: string;
    description: string;
  }>;

  isEditable$: Observable<boolean>;

  isEdit = false;

  saveMessageButtonLabel = '';

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

  form!: UntypedFormGroup;

  formStructures!: FormStructure[];

  get f() {
    return this.form.controls;
  }

  get options() {
    return this.form.controls.options as UntypedFormArray;
  }

  errorMessage$: Observable<string>;

  constructor(
    private store: Store,
    private templateQuotesService: QuoteTemplateService,
    private formStructureService: FormStructureService,
    public dialog: MatDialog,
  ) {
    this.getFormStructures();
    this.templateControl.valueChanges.subscribe({
      next: (value) => {
        if (value) {
          this.store.dispatch(emptyForm());
          this.store.dispatch(
            loadForm({
              form: value.form,
              id: value.id,
              name: value.name,
              description: value.description,
            }),
          );
          this.store.dispatch(clearError());
        } else {
          this.store.dispatch(emptyForm());
          this.addTotalToTemplate();
        }
      },
    });

    this.errorMessage$ = store.select(selectErrorMessage);
    this.formFields$ = store.select(selectDynamicForm);
    this.formFields$.subscribe((data) => {
      this.formFields = data.sort((a, b) => {
        if (a.order < b.order) {
          return -1;
        }
        if (a.order > b.order) {
          return 1;
        }
        return 0;
      });
    });

    this.dynamicFormEssentialData$ = store.select(
      selectDynamicFormEssentialData,
    );
    this.dynamicFormEssentialData$.subscribe((data) => {
      this.templateId = data.id;
      this.templateName = data.name;
      this.templateDescription = data.description;
    });

    this.isEditable$ = store.select(selectIsEditable);
  }

  ngOnInit(): void {
    this.createForm();
    this.addTotalToTemplate();
    this.store.dispatch(clearError());
  }

  getFormStructures() {
    this.formStructureService
      .fetchAll()
      .pipe(
        map((formStructures) => {
          return formStructures.data;
        }),
      )
      .subscribe((data) => (this.formStructures = data));
  }

  createForm() {
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

    this.f.controlType.valueChanges.subscribe((value) => {
      this.options.clear();
      if (value === 'dropdown' || value === 'radio' || value === 'checkbox') {
        this.addOption();
      }
    });
  }

  hasOptions() {
    const controlType = this.f.controlType.value;
    return (
      controlType === 'dropdown' ||
      controlType === 'radio' ||
      controlType === 'checkbox'
    );
  }

  addOption() {
    const control = this.form.controls.options as UntypedFormArray;
    control.push(this.createOption());
  }

  removeOption(index: number) {
    const control = this.options;
    control.removeAt(index);
  }

  createOption() {
    return new UntypedFormGroup({
      key: new UntypedFormControl('', Validators.required),
      value: new UntypedFormControl('', Validators.required),
    });
  }

  removeField(formField: Formfield<any>) {
    this.store.dispatch(removeField({ payload: formField }));
  }

  onSubmit(ngForm: FormGroupDirective) {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    const options: Formfield<any> = { ...this.form.value };
    options.key = options.label.toLowerCase();
    this.store.dispatch(clearError());
    if (this.isEdit) {
      const updatedField: Update<Formfield<any>> = {
        id: options.id,
        changes: { ...options },
      };
      this.store.dispatch(updateField({ form: updatedField }));
    } else {
      options.id = uuidv4();
      options.order = this.formFields.length;
      this.store.dispatch(setField({ form: options }));
    }
    ngForm.form.markAsPristine();
    ngForm.resetForm();
    // this.createForm();
    // this.form.markAsPristine();
    // this.form.markAsUntouched();
    this.isEdit = false;
  }

  saveTemplate() {
    const template: FormStructure = {
      id: this.templateId,
      name: this.templateName,
      form: this.formFields,
      description: this.templateDescription,
    };
    let dialogRef: MatDialogRef<any>;
    if (this.templateId !== 0) {
      dialogRef = this.dialog.open(OnSaveDialogComponent, {
        width: '50vw',
        data: {
          title: '¿Desea actualizar la estructura de formulario?',
          payload: {
            name: this.templateName,
            description: this.templateDescription,
          },
        },
      });

      dialogRef
        .afterClosed()
        .pipe(
          switchMap(
            (result: {
              name: string;
              description: string;
              isConfirmed: boolean;
            }) => {
              if (result.isConfirmed) {
                template.name = result.name;
                template.description = result.description;
                return this.formStructureService.update(template);
              } else {
                return of(false);
              }
            },
          ),
        )
        .subscribe({
          next: (resp) => {
            if (!resp) {
              return;
            }
            MessageHelper.successMessage(
              'Exito',
              'Estructura de formulario actualizada con éxito',
            );
            this.getFormStructures();
          },
          error: ({ error }) => {
            MessageHelper.errorMessage(error.error);
          },
        });
    }

    if (this.templateId === 0) {
      dialogRef = this.dialog.open(OnSaveDialogComponent, {
        width: '50vw',
        data: {
          title: '¿Desea guardar la estructura de formulario?',
        },
      });

      dialogRef
        .afterClosed()
        .pipe(
          switchMap(
            (result: {
              name: string;
              description: string;
              isConfirmed: boolean;
            }) => {
              if (result.isConfirmed) {
                template.name = result.name;
                template.description = result.description;
                return this.formStructureService.save(template);
              } else {
                return of(false);
              }
            },
          ),
        )
        .subscribe({
          next: (resp) => {
            if (!resp) {
              return;
            }
            MessageHelper.successMessage(
              'Exito',
              'Estructura de formulario guardada con éxito',
            );
            this.getFormStructures();
          },
          error: ({ error }) => {
            MessageHelper.errorMessage(error.error);
          },
        });
    }
  }

  deleteTemplate() {
    MessageHelper.decisionMessage(
      `¿Deseas borrar la estructura de formulario ${this.templateName}?`,
      'Una vez borrada no hay marcha atras.',
      () => {
        this.formStructureService.delete(this.templateId).subscribe({
          next: () => {
            this.getFormStructures();
            MessageHelper.successMessage(
              'Éxito',
              'Se ha eliminado correctamente',
            );
            this.store.dispatch(emptyForm());
            this.addTotalToTemplate();
          },
          error: ({ error }) => {
            MessageHelper.errorMessage(error.error);
          },
        });
      },
    );
  }

  drop(event: CdkDragDrop<Formfield<any>[]>) {
    moveItemInArray(this.formFields, event.previousIndex, event.currentIndex);
    this.formFields.forEach((field, index) => {
      const updatedForm: Update<Formfield<any>> = {
        id: field.id,
        changes: {
          order: index,
        },
      };
      this.store.dispatch(updateField({ form: updatedForm }));
    });
  }

  setDataInForm(field: Formfield<any>) {
    this.isEdit = true;
    this.form.patchValue(field);
  }

  cancelEditField() {
    this.isEdit = false;
    this.createForm();
  }

  addTotalToTemplate() {
    const form: Formfield<number> = {
      id: uuidv4(),
      required: true,
      controlType: 'number',
      label: 'Total',
      value: 0,
      options: [],
      key: 'total',
      type: 'number',
      order: Number.MAX_SAFE_INTEGER,
    };
    this.store.dispatch(setField({ form }));
  }

  compareObjects(o1: any, o2: any): boolean {
    if (!o2) {
      return false;
    }
    return o1.name === o2.name && o1.id === o2.id;
  }
}
