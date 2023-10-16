import { Component } from '@angular/core';
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

@Component({
  selector: 'app-procedures-form',
  templateUrl: './procedures-form.component.html',
  styleUrls: ['./procedures-form.component.scss'],
})
export class ProceduresFormComponent {
  procedureForm = new UntypedFormGroup(
    {
      name: new UntypedFormControl('', {
        validators: [Validators.required],
        asyncValidators: [this.uniqueValueValidator.bind(this)],
        updateOn: 'blur',
      }),
      value_operation: new UntypedFormControl('', [Validators.required]),
      date_proceedings: new UntypedFormControl('', [Validators.required]),
      instrument: new UntypedFormControl('', [Validators.required]),
      date: new UntypedFormControl('', [Validators.required]),
      volume: new UntypedFormControl('', [Validators.required]),
      folio_min: new UntypedFormControl('', {
        validators: [],
        asyncValidators: [this.uniqueFolioValueValidator.bind(this)],
      }),
      folio_max: new UntypedFormControl('', {
        validators: [Validators.required],
        asyncValidators: [this.uniqueFolioValueValidator.bind(this)],
      }),
      credit: new UntypedFormControl('', []),
      observation: new UntypedFormControl('', []),
      documents: new UntypedFormControl('', [Validators.required]),
      grantors: new UntypedFormControl('', [Validators.required]),
      operation_id: new UntypedFormControl('', [Validators.required]),
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
      error: async () => {
        await MessageHelper.errorMessage('Ocurrio un error, intente más tarde');
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
    const value: string = control.value;
    return this.procedureService.checkValueUnique(value).pipe(
      debounceTime(200),
      map((isUnique) => (isUnique ? null : { uniqueValue: true })),
    );
  }

  uniqueFolioValueValidator(
    control: AbstractControl,
  ): Observable<ValidationErrors | null> {
    console.log('se ejecuto el validador folio');
    const value: number = control.value;

    if (value == 0) return of(null);

    return this.procedureService.checkFolioMinValueUnique(value).pipe(
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
