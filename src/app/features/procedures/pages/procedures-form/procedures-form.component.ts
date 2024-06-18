import { Component, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  UntypedFormControl,
  UntypedFormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, map, Observable, of } from 'rxjs';
import { ProcedureService } from '../../../../data/services/procedure.service';
import { OperationView } from '../../../../data/presentation/Operation.view';
import { MessageHelper } from 'o2c_core';
import { PlaceView } from '../../../../data/presentation/Place.view';
import { ClientView } from '../../../../data/presentation';
import { StaffView } from '../../../../data/presentation/staff.view';
import { GrantorView } from '../../../../data/presentation/Grantor.view';
import { DocumentView } from '../../../../data/presentation/Document.view';
import { MatDialog } from '@angular/material/dialog';
import { DialogDynamicAddItemComponent } from '../../../../shared/components/dialog-dynamic-add-item/dialog-dynamic-add-item.component';
import { ClientFormComponent } from '../../../clients/page/client-form/client-form.component';
import { GrantorFormComponent } from '../../../grantor/page/grantor-form/grantor-form.component';
import { DocumentFormComponent } from '../../../documents/page/document-form/document-form.component';
import { PlaceFormComponent } from '../../../place/page/place-form/place-form.component';
import { StaffMemberFormComponent } from '../../../staff/page/staff-member-form/staff-member-form.component';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { OperationService } from 'src/app/data/services/operation.service';

@AutoUnsubscribe()
@Component({
  selector: 'app-procedures-form',
  templateUrl: './procedures-form.component.html',
  styleUrls: ['./procedures-form.component.scss'],
})
export class ProceduresFormComponent implements OnDestroy {
  procedureForm = new UntypedFormGroup(
    {
      name: new UntypedFormControl('', {
        validators: [Validators.required],
        asyncValidators: [this.uniqueValueValidator.bind(this)],
        updateOn: 'blur',
      }),
      value_operation: new UntypedFormControl('', []),
      appraisal: new UntypedFormControl('', []),
      instrument: new UntypedFormControl('', [Validators.required]),
      date: new UntypedFormControl('', [Validators.required]),
      volume: new UntypedFormControl('', [Validators.required]),
      folio_min: new UntypedFormControl('', {
        validators: [],
        asyncValidators: [this.uniqueFolioValueValidatorMin.bind(this)],
      }),
      folio_max: new UntypedFormControl('', {
        validators: [Validators.required],
        asyncValidators: [this.uniqueFolioValueValidatorMax.bind(this)],
      }),
      credit: new UntypedFormControl('', []),
      observation: new UntypedFormControl('', []),
      documents: new UntypedFormControl('', [Validators.required]),
      grantors: new UntypedFormControl('', [Validators.required]),
      operations: new UntypedFormControl('', [Validators.required]),
      place_id: new UntypedFormControl('', [Validators.required]),
      client_id: new UntypedFormControl('', [Validators.required]),
      staff_id: new UntypedFormControl('', [Validators.required]),
    },
    {
      validators: this.compareValuesValidator('folio_min', 'folio_max'),
    },
  );

  isEdit: boolean = false;

  operationProvider = OperationView;

  placeProvider = PlaceView;

  clientProvider = ClientView;

  staffProvider = StaffView;

  grantorProvider = GrantorView;

  documentProvider = DocumentView;

  addItems = [
    {
      component: ClientFormComponent,
      title: 'Agregar nuevo cliente',
    },
    {
      component: GrantorFormComponent,
      title: 'Agregar nuevo otrogante',
    },
    {
      component: DocumentFormComponent,
      title: 'Agregar nuevo documento',
    },
    {
      component: PlaceFormComponent,
      title: 'Agregar nuevo lugar',
    },
    {
      component: StaffMemberFormComponent,
      title: 'Agregar nuevo responsalbe',
    },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private procedureService: ProcedureService,
    public dialog: MatDialog,
    private _operationService: OperationService,
  ) {
    const id = Number(this.route.snapshot.params.id);
    if (!isNaN(id)) {
      this.isEdit = true;
      procedureService.fetch(id).subscribe({
        next: (operation) => {
          this.procedureForm.addControl('id', new UntypedFormControl(''));
          this.procedureForm.patchValue(operation);
        },
      });
    }
    
    this.procedureForm.get('operation_id')?.valueChanges.subscribe((value) => {
      this._operationService.fetch(value).subscribe({
        next: (operation) => {
          if(typeof operation.config.documents_required !== 'undefined'){
            this.procedureForm.get('documents')?.setValue(operation.config.documents_required);
          }
        },
      })
    })
  }
  ngOnDestroy(): void {
  }

  async backToListDocuments() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {
    console.log('formulaio', this.procedureForm.value);

    if (this.procedureForm.invalid) {
      return;
    }

    let request$: Observable<any>;
    if (!this.isEdit) {
      request$ = this.procedureService.save(this.procedureForm.value);
    } else {
      request$ = this.procedureService.update(this.procedureForm.value);
    }

    const datosFormulario = this.procedureForm.value;
    if (datosFormulario.folio_min)
      datosFormulario.folio_min = datosFormulario.folio_min.toString();

    if (datosFormulario.credit)
      datosFormulario.credit = datosFormulario.credit.toString();


    datosFormulario.folio_max = datosFormulario.folio_max.toString();

    request$.subscribe({
      next: async () => {
        const message = this.isEdit ? 'actualizada' : 'registrada';
        await MessageHelper.successMessage(
          '¡Éxito!',
          `La operación ha sido ${message} correctamente.`,
        );
        await this.backToListDocuments();
      },
      error: async (error) => {
        console.log(error);
        if (error.error.code != null && error.error.code == 422) {
          if (typeof(error.error.error) === 'object') {
            let message = '';

            for (let item in error.error.error) {
              message = message + '\n' + error.error.error[item];
            }

            await MessageHelper.errorMessage(message);          }else{
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

  compareValuesValidator(
    controlName: string,
    compareControlName: string,
  ): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: any } | null => {
      const control = formGroup.get(controlName);
      const compareControl = formGroup.get(compareControlName);

      if (!control || !compareControl) {
        return null;
      }

      const controlValue = control.value;
      const compareControlValue = compareControl.value;

      if (controlValue >= compareControlValue) {
        compareControl.setErrors({ greaterThan: true });
      } else {
        compareControl.setErrors(null);
      }

      return null;
    };
  }

  uniqueValueValidator(
    control: AbstractControl,
  ): Observable<ValidationErrors | null> {
    console.log('se ejecuto el validador');
    let id = null;
    if(this.isEdit){
      id = this.procedureForm.get('id')?.value;
    }
    const value: string = control.value;
    return this.procedureService.checkValueUnique(value, id).pipe(
      debounceTime(200),
      map((isUnique) => (isUnique ? null : { uniqueValue: true })),
    );
  }

  uniqueFolioValueValidatorMin(
    control: AbstractControl,
  ): Observable<ValidationErrors | null> {
    let id = null;
    if(this.isEdit){
      id = this.procedureForm.get('id')?.value;
    }

    const value: number = control.value;

    if (value == 0 || value == null) return of(null);

    return this.procedureService.checkFolioMinValueUnique(value, 'folio_min', id).pipe(
      debounceTime(300),
      map((isUnique) => (isUnique ? null : { uniqueValue: true })),
    );
  }

  uniqueFolioValueValidatorMax(
    control: AbstractControl,
  ): Observable<ValidationErrors | null> {
    let id = null;
    if(this.isEdit){
      id = this.procedureForm.get('id')?.value;
    }

    const value: number = control.value;

    return this.procedureService.checkFolioMinValueUnique(value, 'folio_max', id).pipe(
      debounceTime(300),
      map((isUnique) => (isUnique ? null : { uniqueValue: true })),
    );
  }

  addItem(item: { component: any; title: string }) {
    this.dialog.open(DialogDynamicAddItemComponent, {
      data: { component: item.component, title: item.title },
      width: '800px',
    });
  }
}
