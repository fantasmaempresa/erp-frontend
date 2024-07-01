import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { MessageHelper } from 'o2c_core';
import { ShapeService } from '../../../../data/services/shape.service';
import { ShapeDto } from '../../../../data/dto/Shape.dto';
import { TemplateShapeService } from '../../../../data/services/template-shape.service';
import { TemplateShapeDto } from '../../../../data/dto/TemplateShape.dto';
import { Editor } from 'ngx-editor';
import { GrantorView } from '../../../../data/presentation/Grantor.view';
import { DialogDynamicAddItemComponent } from '../../../../shared/components/dialog-dynamic-add-item/dialog-dynamic-add-item.component';
import { MatDialog } from '@angular/material/dialog';
import { ProcedureView } from '../../../../data/presentation/Procedure.view';
import { GrantorFormComponent } from '../../../grantor/page/grantor-form/grantor-form.component';
import { OperationView } from 'src/app/data/presentation/Operation.view';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { ProcedureService } from 'src/app/data/services/procedure.service';

@AutoUnsubscribe()
@Component({
  selector: 'app-shape-form',
  templateUrl: './shape-form.component.html',
  styleUrls: ['./shape-form.component.scss'],
})
export class ShapeFormComponent implements OnInit, OnDestroy {
  // @ts-ignore
  editor: Editor;

  // @ts-ignore
  editorDescription: Editor;

  placeholderDescription: string = 'Descripción';

  html = '';

  step = 0;

  builderFormStructure: any;

  grantorProvider = GrantorView;

  builderForm: any;

  fields: any[] = [];

  send: boolean = false;

  isEdit: boolean = false;

  templateShapes!: TemplateShapeDto[];

  procedureProvider = ProcedureView;

  operationProvider = OperationView;

  shapeForm = new UntypedFormGroup({
    folio: new UntypedFormControl('', [
      Validators.required,
      Validators.maxLength(50),
    ]),
    notary: new UntypedFormControl('', [Validators.required]),
    scriptures: new UntypedFormControl('', [
      Validators.required,
      Validators.maxLength(100),
    ]),
    property_account: new UntypedFormControl('', [
      Validators.required,
      Validators.maxLength(50),
    ]),
    signature_date: new UntypedFormControl('', [Validators.required]),
    departure: new UntypedFormControl('', []),
    inscription: new UntypedFormControl('', []),
    sheets: new UntypedFormControl('', []),
    took: new UntypedFormControl('', []),
    book: new UntypedFormControl('', []),
    operation_value: new UntypedFormControl('', []),
    description: new UntypedFormControl('', []),
    total: new UntypedFormControl('', []),
    data_form: new UntypedFormControl('', []),
    template_shape_id: new UntypedFormControl('', [Validators.required]),
    procedure_id: new UntypedFormControl('', [Validators.required]),
    operation_id: new UntypedFormControl('', [Validators.required]),
    reverse: new UntypedFormControl('', []),
    alienating: new UntypedFormControl('', [Validators.required]),
    acquirer: new UntypedFormControl('', []),
    extra_alienating: new UntypedFormControl('', []),
    extra_acquirers: new UntypedFormControl('', []),
    grantors: new UntypedFormControl('', []),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private shapeService: ShapeService,
    private templateShapeService: TemplateShapeService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private _procedureService: ProcedureService,
  ) {
    // this.builderForm = this.fb.group({});

    this.templateShapeService
      .fetchAll()
      .pipe(
        map((templates) => {
          return templates.data;
        }),
      )
      .subscribe((data) => (this.templateShapes = data));

    const id = Number(this.route.snapshot.params.id);
    if (!isNaN(id)) {
      this.isEdit = true;
      shapeService.fetch(id).subscribe({
        next: (shape: ShapeDto) => {
          this.shapeForm.addControl('id', new UntypedFormControl(''));
          this.shapeForm.patchValue(shape);

          this.shapeForm.get('alienating')?.setValue(shape?.alienator.id);
          this.shapeForm.get('acquirer')?.setValue(shape?.acquirer.id);
          this.shapeForm
            .get('extra_alienating')
            ?.setValue(shape?.grantors?.alienators);
          this.shapeForm
            .get('extra_acquirers')
            ?.setValue(shape?.grantors?.acquirers);
          this.templateShapes.forEach((template: TemplateShapeDto) => {
            if (template.id == shape.template_shape_id) {
              this.shapeForm.get('template_shape_id')?.setValue(template);
              this.changeShape(template);
              this.builderForm.patchValue(shape.data_form);
            }
          });
        },
      });
    }

    if (!this.isEdit) {
      this.shapeForm.get("procedure_id")?.valueChanges.subscribe((value) => {
        this._procedureService.fetch(value).subscribe((procedure) => {
          this.shapeForm.get("signature_date")?.setValue(procedure.date);
          this.shapeForm.get("operation_value")?.setValue(procedure.value_operation);
          this.shapeForm.get("scriptures")?.setValue(procedure.instrument);
        })
      })
    }
  }

  ngOnInit(): void {
    this.editor = new Editor();
    this.editorDescription = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  async backToListDocuments() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {
    if (this.step < 4) return;

    this.builderForm.markAsTouched();
    console.log('this.shapeForm', this.shapeForm.value);
    console.log('this.builderForm', this.builderForm.value);
    if (this.shapeForm.invalid || this.builderForm.invalid) {
      console.log(
        'Alguno de los formularios no es valido',
        this.shapeForm.invalid,
        this.builderForm.invalid,
      );
      return;
    }

    let dataForm = this.shapeForm.value;
    dataForm.data_form = this.builderForm.value;
    dataForm.template_shape_id = this.builderFormStructure.id;
    dataForm.grantors = {
      alienating: this.shapeForm.get('extra_alienating')?.value,
      acquirer: this.shapeForm.get('extra_acquirers')?.value,
    };
    let request$: Observable<ShapeDto>;
    if (!this.isEdit) {
      request$ = this.shapeService.save(dataForm);
    } else {
      request$ = this.shapeService.update(dataForm);
    }
    request$.subscribe({
      next: async () => {
        const message = this.isEdit ? 'actualizado' : 'registrado';
        await MessageHelper.successMessage(
          '¡Éxito!',
          `La forma se ha registrado con ${message} correctamente.`,
        );
        await this.backToListDocuments();
      },
      error: async (error) => {
        console.log(error);
        if (error.error.code != null && error.error.code == 422) {
          if (typeof error.error.error === 'object') {
            let message = '';

            for (let item in error.error.error) {
              message = message + '\n' + error.error.error[item];
            }

            await MessageHelper.errorMessage(message);
          } else {
            await MessageHelper.errorMessage(error.error.error);
          }
        } else if (error.error.code != null && error.error.code == 409) {
          await MessageHelper.errorMessage(
            'Error referente a la base de datos, consulte a su administrador',
          );
        } else if (error.error.code != null && error.error.code == 500) {
          await MessageHelper.errorMessage(
            'Existe un error dentro del servidor, consulte con el administrador',
          );
        } else {
          await MessageHelper.errorMessage(
            'Hubo un error, intente más tarde por favor',
          );
        }
        this.shapeForm.value.template_shape_id = this.builderFormStructure;
      },
    });
  }

  goToNext() {
    console.log('next ---> ', this.step);
    // @ts-ignore
    event.preventDefault();
    if (this.step == 4) {
      return;
    }

    this.step++;
  }

  goToPrev() {
    console.log('prev ---> ', this.step);
    // @ts-ignore
    event.preventDefault();
    if (this.step == 0) return;

    this.step--;
    setTimeout(() => {
      console.log('sleeping...');
    });
  }

  changeShape(value: any) {
    if (value.id == 1) {
      this.placeholderDescription =
        'Descripción del inmueble y ubicación oficial actual';
    } else {
      this.placeholderDescription = 'Descripción de la operación';
    }
    console.log('value----> ', value.form);
    this.builderFormStructure = value;
    this.builderForm = this.fb.group({});
    value.form.forEach((field: any) => {
      this.builderForm.addControl(field.name, this.fb.control('', []));
    });
    this.fields = value.form;
  }

  openNewGrantor() {
    this.dialog.open(DialogDynamicAddItemComponent, {
      data: {
        component: GrantorFormComponent,
        title: 'Agregar nuevo otrogante',
      },
      width: '800px',
    });
  }
}
