/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  UntypedFormControl,
  UntypedFormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { FORM_CLAZZ, FormComponent } from 'o2c_core';
import { debounceTime, map, Observable } from 'rxjs';
import { PredefinedFormLifeCycle } from 'src/app/core/interfaces/PredefinedFormLifeCycle';
import { GrantorView } from 'src/app/data/presentation/Grantor.view';
import { OperationView } from 'src/app/data/presentation/Operation.view';
import { PlaceView } from 'src/app/data/presentation/Place.view';
import { StakeAssignGrantorTable } from 'src/app/data/presentation/Procedure.view';
import { StakeView } from 'src/app/data/presentation/Stake.view';
import { ExcecutePhasePredefinedService } from 'src/app/data/services/excecute-phase-predefined.service';
import { ProcedureService } from 'src/app/data/services/procedure.service';
import { SharedDataService } from 'src/app/data/services/shared-data.service';
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
export class StartFormComponent
  implements OnInit, OnDestroy, PredefinedFormLifeCycle {

  nameProcess = 'DomainTransfer';
  namePhase = 'start';

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
    private synchronizer: SharedDataService,
    private dispacher: ExcecutePhasePredefinedService,
  ) {
    this.form = new UntypedFormGroup({
      name: new UntypedFormControl('', {
        validators: [Validators.required],
        // asyncValidators: [this.uniqueValueValidator.bind(this)],
        updateOn: 'blur',
      }),
      value_operation: new UntypedFormControl('', []),
      operations: new UntypedFormControl('', []),
      appraisal: new UntypedFormControl('', []),
      place_id: new UntypedFormControl('', [Validators.required]),
      grantors: new UntypedFormControl('', [Validators.required]),
    });

    const data = this.route.snapshot.routeConfig?.data;
    console.log('currentRoute -------->', data);

    if (typeof data?.view != 'undefined' && data?.view == 'phase') {
      this.previewBuilderForm = true;
    }
  }

  ngOnInit(): void {
    this.procedureService.recommendationExpedient().subscribe({
      next: (data: any) => {
        this.form.get('name')?.setValue(data.name);
      },
    });

    this.synchronizer.updateLastForm(this.form);

    this.synchronizer.executionCommand$.subscribe((commands) => {
      console.log('this.synchronizer.executionCommand$ ---> ', commands);
      this.executeCommands(commands);  
    });
  }

  executeCommands (commands: { command: string; args?: any; callback?: Function; }) {
    console.log('command entry -->: ', commands);
    switch (commands.command) {
      case 'saveForm':
        this.saveForm();
        break;
      case 'next':
        this.next(commands.args, commands.callback);
        break;
      case 'prev':
        this.prev();
        break;
      case 'patchForm':
        this.patchForm(commands.args);
        break;
      default:
        console.log('Comando no reconocido');
    }
  }
  onSubmit(args?: any, callback?: Function): void {
    console.log(this.form.value);
    this.form
      .get('grantors')
      ?.setValue(this.formComponent.formBuilderComponent.form.value.stakes);

    if (this.form.invalid) {
      console.log("Formulario invalido");
      return;
    }
    console.log("Se envia información a servidor desde fase predefinida");
    this.dispacher.executePhase(args.project_id, args.process_id, { data: this.form.value, namePhase: 'start', nameProcess: 'DomainTransfer' })
      .subscribe({
        next: async (value) => {
          console.log("Petición realizada --> ", value, typeof callback);
          if(typeof callback === 'function')
            callback(JSON.stringify(value));
        }
      });
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

  ngOnDestroy(): void { }

  writeValue(value: any) {
    this.form.patchValue(value);
  }

  next(args?: { process_id: number; project_id: number; data: any }, callback?: Function) {
    console.log('Ejecuto comando ... next');
    this.onSubmit(args, callback);
  }

  prev() {
    console.log('Ejecuto comando ... prev');

    this.form
      .get('grantors')
      ?.setValue(this.formComponent.formBuilderComponent.form.value.stakes);
  }

  saveForm() {
    console.log('Ejecuto comando ... saveForm');

    this.form
      .get('grantors')
      ?.setValue(this.formComponent.formBuilderComponent.form.value.stakes);

    if (this.form.invalid) {
      console.log('Formulario invalido');
    }
  }

  patchForm(values: any) {

    this.form.patchValue(values);
    setTimeout(() => {
      this.formComponent.formBuilderComponent.form.controls.stakes.setValue(
        values.grantors,
      );
    }, 200);
  }
}
