import { Component } from '@angular/core';
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
import { ProcedureView } from '../../../../data/presentation/Procedure.view';
import { TemplateShapeDto } from '../../../../data/dto/TemplateShape.dto';

@Component({
  selector: 'app-shape-form',
  templateUrl: './shape-form.component.html',
  styleUrls: ['./shape-form.component.scss'],
})
export class ShapeFormComponent {
  step = 0;

  builderFormStructure: any;

  procedureProvider = ProcedureView;

  builderForm: any;

  fields: any[] = [];

  shapeForm = new UntypedFormGroup({
    folio: new UntypedFormControl('', [Validators.required]),
    notary: new UntypedFormControl('', [Validators.required]),
    scriptures: new UntypedFormControl('', [Validators.required]),
    property_account: new UntypedFormControl('', [Validators.required]),
    signature_date: new UntypedFormControl('', [Validators.required]),
    departure: new UntypedFormControl('', [Validators.required]),
    inscription: new UntypedFormControl('', [Validators.required]),
    sheets: new UntypedFormControl('', [Validators.required]),
    took: new UntypedFormControl('', [Validators.required]),
    book: new UntypedFormControl('', [Validators.required]),
    operation_value: new UntypedFormControl('', [Validators.required]),
    alienating_name: new UntypedFormControl('', [Validators.required]),
    alienating_street: new UntypedFormControl('', [Validators.required]),
    alienating_outdoor_number: new UntypedFormControl('', [
      Validators.required,
    ]),
    alienating_interior_number: new UntypedFormControl('', []),
    alienating_colony: new UntypedFormControl('', [Validators.required]),
    alienating_locality: new UntypedFormControl('', [Validators.required]),
    alienating_municipality: new UntypedFormControl('', [Validators.required]),
    alienating_entity: new UntypedFormControl('', [Validators.required]),
    alienating_zipcode: new UntypedFormControl('', [Validators.required]),
    alienating_phone: new UntypedFormControl('', [Validators.required]),
    acquirer_name: new UntypedFormControl('', [Validators.required]),
    description: new UntypedFormControl('', [Validators.required]),
    total: new UntypedFormControl('', [Validators.required]),
    data_form: new UntypedFormControl('', []),
    template_shape_id: new UntypedFormControl('', [Validators.required]),
    procedure_id: new UntypedFormControl('', [Validators.required]),
  });

  isEdit: boolean = false;

  templateShapes!: TemplateShapeDto[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private shapeService: ShapeService,
    private templateShapeService: TemplateShapeService,
    private fb: FormBuilder,
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
  }

  async backToListDocuments() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {
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
    dataForm.sheets = dataForm.sheets.toString();
    dataForm.took = dataForm.took.toString();
    dataForm.book = dataForm.book.toString();
    dataForm.operation_value = dataForm.operation_value.toString();
    dataForm.alienating_outdoor_number =
      dataForm.alienating_outdoor_number.toString();
    dataForm.alienating_interior_number =
      dataForm.alienating_interior_number.toString();
    dataForm.alienating_zipcode = dataForm.alienating_zipcode.toString();
    dataForm.alienating_phone = dataForm.alienating_phone.toString();
    dataForm.total = dataForm.total.toString();

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
          `El cliente ha sido ${message} correctamente.`,
        );
        await this.backToListDocuments();
      },
      error: async () => {
        await MessageHelper.errorMessage(
          'Ocurrio un error inesperado, intente más tarde',
        );
        this.shapeForm.value.template_shape_id = this.builderFormStructure;
      },
    });
  }

  goToNext() {
    console.log('neext ---> ', this.step);
    if (this.step == 3) return;

    this.step++;
  }

  goToPrev() {
    console.log('prev ---> ', this.step);
    if (this.step == 0) return;

    this.step--;
    setTimeout(() => {
      console.log('sleeping...');
    });
  }

  changeShape(value: any) {
    console.log('value----> ', value.form);
    this.builderFormStructure = value;
    this.builderForm = this.fb.group({});
    value.form.forEach((field: any) => {
      this.builderForm.addControl(
        field.name,
        this.fb.control('', [Validators.required]),
      );
    });
    this.fields = value.form;
  }
}
