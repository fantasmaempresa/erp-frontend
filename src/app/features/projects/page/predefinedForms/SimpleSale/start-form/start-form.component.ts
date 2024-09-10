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
import { FORM_CLAZZ, FormComponent } from 'o2c_core';
import { debounceTime, map, Observable } from 'rxjs';
import { ClientView } from 'src/app/data/presentation';
import { GrantorView } from 'src/app/data/presentation/Grantor.view';
import { OperationView } from 'src/app/data/presentation/Operation.view';
import { PlaceView } from 'src/app/data/presentation/Place.view';
import { StakeAssignGrantorTable } from 'src/app/data/presentation/Procedure.view';
import { StakeView } from 'src/app/data/presentation/Stake.view';
import { ProcedureService } from 'src/app/data/services/procedure.service';
import { ClientFormComponent } from 'src/app/features/clients/page/client-form/client-form.component';
import { GrantorFormComponent } from 'src/app/features/grantor/page/grantor-form/grantor-form.component';
import { PlaceFormComponent } from 'src/app/features/place/page/place-form/place-form.component';
import { StakeFormComponent } from 'src/app/features/stake/page/stake-form/stake-form.component';
import { DialogDynamicAddItemComponent } from 'src/app/shared/components/dialog-dynamic-add-item/dialog-dynamic-add-item.component';

@AutoUnsubscribe()
@Component({
  selector: 'app-start-form',
  templateUrl: './start-form.component.html',
  styleUrls: ['./start-form.component.scss'],
  providers: [
    {
      provide: FORM_CLAZZ,
      useValue: StakeAssignGrantorTable,
    },
  ],
})
export class StartFormComponent implements OnDestroy {
  operationProvider = OperationView;
  grantorProvider = GrantorView;
  stakeProvider = StakeView;
  placeProvider = PlaceView;
  previewBuilderForm = false;

  form: UntypedFormGroup;

  formId = '';

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
      component: PlaceFormComponent,
      title: 'Agregar nuevo lugar',
    },
    {
      component: StakeFormComponent,
      title: 'Agregar participación',
    },
  ];

  private _listFormBuilder!: FormComponent;

  public get formComponent(): FormComponent {
    return this._listFormBuilder;
  }

  @ViewChild(FormComponent)
  public set formComponent(value: FormComponent) {
    console.log('seteando formbuilder ---> ', value);
    this._listFormBuilder = value;
  }

  constructor(
    private procedureService: ProcedureService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ) {
    this.form = new UntypedFormGroup({
      name: new UntypedFormControl('', {
        validators: [Validators.required],
        asyncValidators: [this.uniqueValueValidator.bind(this)],
        updateOn: 'blur',
      }),
      value_operation: new UntypedFormControl('', []),
      appraisal: new UntypedFormControl('', []),
      place_id: new UntypedFormControl('', [Validators.required]),
      staff_id: new UntypedFormControl('', [Validators.required]),
    });

    const data = this.route.snapshot.routeConfig?.data;
    console.log('currentRoute -------->', data);

    if (typeof data?.view != 'undefined' && data?.view == 'phase') {
      this.previewBuilderForm = true;
    }
  }

  onSubmit() {
    console.log(this.form.value);
  }

  uniqueValueValidator(
    control: AbstractControl,
  ): Observable<ValidationErrors | null> {
    console.log('se ejecuto el validador');
    let id = null;
    const value: string = control.value;

    return this.procedureService.checkValueUnique(value, id).pipe(
      debounceTime(200),
      map((isUnique) => (isUnique ? null : { uniqueValue: true })),
    );
  }

  addItem(item: { component: any; title: string }) {
    this.dialog.open(DialogDynamicAddItemComponent, {
      data: { component: item.component, title: item.title },
      width: '800px',
    });
  }

  ngOnDestroy(): void {}
}
