import { Component, OnDestroy, ViewChild } from '@angular/core';
import {
  AbstractControl,
  UntypedFormControl,
  UntypedFormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import {
  FORM_CLAZZ,
  FormComponent,
  MessageHelper,
  LoaderService,
} from 'o2c_core';
import { Observable, debounceTime, map, of } from 'rxjs';
import { FolioDialogView } from 'src/app/data/presentation/FolioDialog.view';
import { StakeAssignGrantorTable } from 'src/app/data/presentation/Procedure.view';
import { OperationService } from 'src/app/data/services/operation.service';
import { ClientView } from '../../../../data/presentation';
import { DocumentView } from '../../../../data/presentation/Document.view';
import { OperationView } from '../../../../data/presentation/Operation.view';
import { PlaceView } from '../../../../data/presentation/Place.view';
import { StaffView } from '../../../../data/presentation/staff.view';
import { ProcedureService } from '../../../../data/services/procedure.service';
import { DialogDynamicAddItemComponent } from '../../../../shared/components/dialog-dynamic-add-item/dialog-dynamic-add-item.component';
import { ClientFormComponent } from '../../../clients/page/client-form/client-form.component';
import { DocumentFormComponent } from '../../../documents/page/document-form/document-form.component';
import { GrantorFormComponent } from '../../../grantor/page/grantor-form/grantor-form.component';
import { PlaceFormComponent } from '../../../place/page/place-form/place-form.component';
import { StaffMemberFormComponent } from '../../../staff/page/staff-member-form/staff-member-form.component';

@AutoUnsubscribe()
@Component({
  selector: 'app-procedures-form',
  templateUrl: './procedures-form.component.html',
  styleUrls: ['./procedures-form.component.scss'],
  providers: [
    {
      provide: FORM_CLAZZ,
      useValue: StakeAssignGrantorTable,
    },
  ],
})
export class ProceduresFormComponent implements OnDestroy {
  private _listFormBuilder!: FormComponent;

  public get formComponent(): FormComponent {
    return this._listFormBuilder;
  }

  @ViewChild(FormComponent)
  public set formComponent(value: FormComponent) {
    console.log('seteando formbuilder ---> ', value);
    this._listFormBuilder = value;
  }

  procedureForm = new UntypedFormGroup({
    name: new UntypedFormControl('', {
      validators: [Validators.required],
      asyncValidators: [this.uniqueValueValidator.bind(this)],
      updateOn: 'blur',
    }),
    value_operation: new UntypedFormControl('', []),
    appraisal: new UntypedFormControl('', []),
    date: new UntypedFormControl('', [Validators.required]),
    credit: new UntypedFormControl('', []),
    observation: new UntypedFormControl('', []),
    documents: new UntypedFormControl('', [Validators.required]),
    grantors: new UntypedFormControl('', [Validators.required]),
    operations: new UntypedFormControl('', [Validators.required]),
    place_id: new UntypedFormControl('', [Validators.required]),
    client_id: new UntypedFormControl('', [Validators.required]),
    staff_id: new UntypedFormControl('', [Validators.required]),
    folio_id: new UntypedFormControl('', []),
  });

  isEdit: boolean = false;

  operationProvider = OperationView;

  placeProvider = PlaceView;

  clientProvider = ClientView;

  staffProvider = StaffView;

  documentProvider = DocumentView;

  folioProvider = FolioDialogView;

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
    private loaderService: LoaderService,
  ) {
    const id = Number(this.route.snapshot.params.id);
    if (!isNaN(id)) {
      this.isEdit = true;
      procedureService.fetch(id).subscribe({
        next: (procedure) => {
          this.procedureForm.addControl('id', new UntypedFormControl(''));
          this.procedureForm.patchValue(procedure);
          this.procedureForm.controls.folio_id.setValue(procedure.folio?.id);
          this.formComponent.formBuilderComponent.form.controls.stakes.setValue(
            procedure.grantors,
          );
        },
      });
    } else {
      this.procedureService.recommendationExpedient().subscribe({
        next: (data: any) => {
          this.procedureForm.get('name')?.setValue(data.name);
        },
      });
    }

    this.procedureForm.get('operations')?.valueChanges.subscribe((value) => {
      this._operationService.getDocuments({ operations: value }).subscribe({
        next: (documents) => {
          this.procedureForm.get('documents')?.setValue(documents);
          if (documents.length > 0) {
            this.procedureForm.controls.documents.disable();
          }
        },
      });
    });
    // this.procedureForm.controls.name.disable();
  }
  ngOnDestroy(): void {}

  async backToListDocuments() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {
    console.log('formulaio', this.procedureForm.value);
    this.procedureForm.controls.name.enable();
    this.procedureForm.controls.documents.enable();

    this.procedureForm
      .get('grantors')
      ?.setValue(this.formComponent.formBuilderComponent.form.value.stakes);

    if (this.procedureForm.invalid) return;

    this.loaderService.showFullScreenLoader();
    let request$: Observable<any>;
    if (!this.isEdit) {
      request$ = this.procedureService.save(this.procedureForm.value);
    } else {
      request$ = this.procedureService.update(this.procedureForm.value);
    }

    const datosFormulario = this.procedureForm.value;

    if (datosFormulario.credit)
      datosFormulario.credit = datosFormulario.credit.toString();

    request$.subscribe({
      next: async () => {
        const message = this.isEdit ? 'actualizada' : 'registrada';
        await MessageHelper.successMessage(
          '¡Éxito!',
          `La operación ha sido ${message} correctamente.`,
        );
        this.loaderService.hideLoader();
        await this.backToListDocuments();
      },
      error: async (error) => {
        console.log(error);
        this.loaderService.hideLoader();
        // this.procedureForm.controls.name.disable();
        // this.procedureForm.controls.documents.disable();
        if (error.error.code != null && error.error.code == 422) {
          if (typeof error.error.error === 'object') {
            let message = '';

            for (let item in error.error.error) {
              message = message + '\n' + error.error.error[item];
              if (
                error.error.error[item] == 'The name has already been taken.'
              ) {
                this.procedureService.recommendationExpedient().subscribe({
                  next: (data: any) => {
                    this.procedureForm.get('name')?.setValue(data.name);
                  },
                });
              }
            }

            await MessageHelper.errorMessage(message);
          } else {
            await MessageHelper.errorMessage(error.error.error);
            if (error.error.error == 'The name has already been taken.') {
              this.procedureService.recommendationExpedient().subscribe({
                next: (data: any) => {
                  this.procedureForm.get('name')?.setValue(data.name);
                },
              });
            }
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

  uniqueValueValidator(
    control: AbstractControl,
  ): Observable<ValidationErrors | null> {
    console.log('se ejecuto el validador');
    let id = null;
    if (this.isEdit) {
      id = this.procedureForm.get('id')?.value;
    }
    const value: string = control.value;

    return this.procedureService.checkValueUnique(value, id).pipe(
      debounceTime(200),
      map((isUnique) => (isUnique ? null : { uniqueValue: true })),
    );
  }

  uniqueValueInstrumentValidator(
    control: AbstractControl,
  ): Observable<ValidationErrors | null> {
    console.log('se ejecuto el validador');
    let id = null;
    if (this.isEdit) {
      id = this.procedureForm.get('id')?.value;
    }
    const value: string = control.value;

    return this.procedureService.checkValueInstrumentUnique(value, id).pipe(
      debounceTime(200),
      map((isUnique) => (isUnique ? null : { uniqueValue: true })),
    );
  }

  uniqueFolioValueValidatorMin(
    control: AbstractControl,
  ): Observable<ValidationErrors | null> {
    let id = null;
    if (this.isEdit) {
      id = this.procedureForm.get('id')?.value;
    }

    const value: number = control.value;

    if (value == 0 || value == null) return of(null);

    if (value < 0) {
      control.setErrors({ negativeNumber: true });
      return of(null);
    } else {
      control.setErrors(null);
    }

    return this.procedureService
      .checkFolioMinValueUnique(value, 'folio_min', id)
      .pipe(
        debounceTime(300),
        map((isUnique) => (isUnique ? null : { uniqueValue: true })),
      );
  }

  uniqueFolioValueValidatorMax(
    control: AbstractControl,
  ): Observable<ValidationErrors | null> {
    let id = null;
    if (this.isEdit) {
      id = this.procedureForm.get('id')?.value;
    }

    const value: number = control.value;

    if (value < 0) {
      control.setErrors({ negativeNumber: true });
      return of(null);
    } else {
      control.setErrors(null);
    }

    return this.procedureService
      .checkFolioMinValueUnique(value, 'folio_max', id)
      .pipe(
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

  generateInstrument() {}
}
