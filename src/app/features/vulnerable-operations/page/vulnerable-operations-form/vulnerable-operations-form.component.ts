import { Component, OnDestroy, ViewChild } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { FORM_CLAZZ, FormComponent, MessageHelper } from 'o2c_core';
import { Observable } from 'rxjs';
import { ProcedureDto } from 'src/app/data/dto';
import { VulnerableOperationDto } from 'src/app/data/dto/VulnerableOperation.dto';
import { GrantorView } from 'src/app/data/presentation/Grantor.view';
import { InversionUnitView } from 'src/app/data/presentation/InversionUnit.view';
import { ProcedureView } from 'src/app/data/presentation/Procedure.view';
import { UnitView } from 'src/app/data/presentation/Unit.view';
import { VulnerableOperationForm } from 'src/app/data/presentation/VulnerableOperation.view';
import { ProcedureService } from 'src/app/data/services/procedure.service';
import { VulnerableOperationService } from 'src/app/data/services/vulnerable-operation.service';

@AutoUnsubscribe()
@Component({
  selector: 'app-vulnerable-operations-form',
  templateUrl: './vulnerable-operations-form.component.html',
  styleUrls: ['./vulnerable-operations-form.component.scss'],
  providers: [
    {
      provide: FORM_CLAZZ,
      useValue: VulnerableOperationForm,
    },
  ],
})
export class VulnerableOperationsFormComponent implements OnDestroy {
  private _listFormBuilder!: FormComponent;

  public get formComponent(): FormComponent {
    return this._listFormBuilder;
  }

  @ViewChild(FormComponent)
  public set formComponent(value: FormComponent) {
    console.log('seteando formbuilder ---> ', value);
    this._listFormBuilder = value;
  }

  vulnerableOperationsCategory: any = [
    {
      value: 'Actividades vulnerables traslativas de dominio',
      label: 'Actividades vulnerables traslativas de dominio',
    },
    {
      value: 'Actividades vulnerables mercantiles',
      label: 'Actividades vulnerables mercantiles',
    },
  ];

  useDataOperation: any = [];
  vulnerableOperationsCommercial: any = [
    {
      value:
        'OTORGAMIENTO DE PODER IRREVOCABLE PARA ACTOS DE ADMINISTRACION O PARA ACTOS DE DOMINIO',
      label:
        'OTORGAMIENTO DE PODER IRREVOCABLE PARA ACTOS DE ADMINISTRACION O PARA ACTOS DE DOMINIO',
    },
    { value: 'REALIZACION DE AVALUOS', label: 'REALIZACION DE AVALUOS' },
    {
      value: 'CONSTITUCION DE PERSONAS MORALES',
      label: 'CONSTITUCION DE PERSONAS MORALES',
    },
    {
      value:
        'MODIFICACION PATRIMONIAL POR AUMENTO DE CAPITAL O POR DISMINUCION DE CAPITAL',
      label:
        'MODIFICACION PATRIMONIAL POR AUMENTO DE CAPITAL O POR DISMINUCION DE CAPITAL',
    },
    { value: 'FUSION', label: 'FUSION' },
    { value: 'ESCISION', label: 'ESCISION' },
    {
      value: 'COMPRA O VENTA DE ACCIONES O PARTES SOCIALES',
      label: 'COMPRA O VENTA DE ACCIONES O PARTES SOCIALES',
    },
    { value: 'SOBRE INMUEBLES', label: 'SOBRE INMUEBLES' },
    {
      value:
        'CESION DE DERECHOS DE FIDEICOMITENTE - CESION DE DERECHOS DE FIDEICOMISARIO',
      label:
        'CESION DE DERECHOS DE FIDEICOMITENTE - CESION DE DERECHOS DE FIDEICOMISARIO',
    },
    {
      value: 'OTORGAMIENTO DE CONTRATOS DE MUTUO O CREDITO CON O SIN GARANTIA',
      label: 'OTORGAMIENTO DE CONTRATOS DE MUTUO O CREDITO CON O SIN GARANTIA',
    },
  ];

  VulnerableOperationsTraslativeDomain: any = [
    { value: 'Compraventa de inmuebles', label: 'Compraventa de inmuebles' },
    {
      value: 'Adjudicaciones por herencia',
      label: 'Adjudicaciones por herencia',
    },
    { value: 'Donaciones', label: 'Donaciones' },
    {
      value: 'Compraventa de ejidatarios',
      label: 'Compraventa de ejidatarios',
    },
    { value: 'Hipotecas', label: 'Hipotecas' },
    { value: 'Cesión onerosa', label: 'Cesión onerosa' },
    { value: 'Cesión gratuita', label: 'Cesión gratuita' },
    {
      value: 'Servidumbre con indemnización',
      label: 'Servidumbre con indemnización',
    },
    {
      value: 'Servidumbre sin indemnización',
      label: 'Servidumbre sin indemnización',
    },
    { value: 'Adjudicación judicial', label: 'Adjudicación judicial' },
  ];

  step = 0;
  isEdit: boolean = false;
  procedureProvider = ProcedureView;
  unitProvider = UnitView;
  inversionUnitViewProvider = InversionUnitView;
  grantorProvider = GrantorView;
  dataProcedure: ProcedureDto | null = null;
  formFields: any = [];
  form: UntypedFormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _procedureService: ProcedureService,
    private _vulnerableOperationsService: VulnerableOperationService,
  ) {
    this.form = new UntypedFormGroup({
      type_category: new UntypedFormControl(null, [Validators.required]),
      type_vulnerable_operation: new UntypedFormControl(null, [
        Validators.required,
      ]),
      procedure_id: new UntypedFormControl(null, [Validators.required]),
      inversion_unit_id: new UntypedFormControl(null, []),
      unit_id: new UntypedFormControl(null, []),
      grantor_first_id: new UntypedFormControl(null, [Validators.required]),
      grantor_second_id: new UntypedFormControl(null, [Validators.required]),
      vulnerable_operation_data: new UntypedFormControl(null, [
        Validators.required,
      ]),
    });

    this.form.controls.procedure_id.valueChanges.subscribe((value) => {
      this._procedureService.fetch(value).subscribe({
        next: (procedure) => {
          console.log('value ---> ', procedure);
          this.dataProcedure = procedure;
        },
      });
    });

    const id = Number(this.route.snapshot.params.id);
    if (!isNaN(id)) {
      this.isEdit = true;
      this._vulnerableOperationsService.fetch(id).subscribe({
        next: (operation: VulnerableOperationDto) => {
          this.form.addControl('id', new UntypedFormControl(''));
          this.form.patchValue(operation);
          this.formComponent.formBuilderComponent.form.patchValue(
            operation.vulnerable_operation_data,
          );
        },
      });
    }

    const idProcedure = Number(this.route.snapshot.params.idProcedure);
    if (!isNaN(idProcedure)) {
      this.form.get('procedure_id')?.setValue(idProcedure);
    }
  }

  loadVulnerableOperations($event: any) {
    this.useDataOperation =
      $event == 'Actividades vulnerables traslativas de dominio'
        ? this.VulnerableOperationsTraslativeDomain
        : this.vulnerableOperationsCommercial;
  }

  async backToList() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }

  goToNext() {
    console.log('next ---> ', this.step);
    // @ts-ignore
    event.preventDefault();
    if (this.step == 3) {
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

  onSubmit(send = false) {
    if (!send) return;

    this.form
      .get('vulnerable_operation_data')
      ?.setValue(this.formComponent.formBuilderComponent.form.value);
    console.log('forrrrm ---> ', this.form.value);

    if (this.form.invalid) return;

    let request$: Observable<any>;
    if (!this.isEdit) {
      request$ = this._vulnerableOperationsService.save(this.form.value);
    } else {
      request$ = this._vulnerableOperationsService.update(this.form.value);
    }

    request$.subscribe({
      next: async () => {
        const message = this.isEdit ? 'actualizada' : 'registrada';
        await MessageHelper.successMessage(
          '¡Éxito!',
          `La operación ha sido ${message} correctamente.`,
        );
        await this.backToList();
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
      },
    });
  }

  ngOnDestroy(): void {}
}
