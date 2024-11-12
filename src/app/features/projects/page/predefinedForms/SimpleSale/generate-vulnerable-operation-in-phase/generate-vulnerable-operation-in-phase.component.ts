import { Component, ComponentRef, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { FORM_CLAZZ, HostDirective, LoaderService, MessageHelper } from 'o2c_core';
import { Observable } from 'rxjs';
import { PredefinedFormLifeCycle } from 'src/app/core/interfaces/PredefinedFormLifeCycle';
import { VulnerableOperationForm } from 'src/app/data/presentation/VulnerableOperation.view';
import { ExcecutePhasePredefinedService } from 'src/app/data/services/excecute-phase-predefined.service';
import { ProcedureService } from 'src/app/data/services/procedure.service';
import { SharedDataService } from 'src/app/data/services/shared-data.service';
import { VulnerableOperationService } from 'src/app/data/services/vulnerable-operation.service';
import { VulnerableOperationsFormComponent } from 'src/app/features/vulnerable-operations/page/vulnerable-operations-form/vulnerable-operations-form.component';

@AutoUnsubscribe()
@Component({
  selector: 'app-generate-vulnerable-operation-in-phase',
  templateUrl: './generate-vulnerable-operation-in-phase.component.html',
  styleUrls: ['./generate-vulnerable-operation-in-phase.component.scss'],
  providers: [
    {
      provide: FORM_CLAZZ,
      useValue: VulnerableOperationForm,
    },
  ],
})
export class GenerateVulnerableOperationInPhaseComponent
  extends VulnerableOperationsFormComponent implements OnInit, OnDestroy, PredefinedFormLifeCycle {
  @ViewChild(HostDirective, { static: true }) container!: HostDirective;
  componentRef!: ComponentRef<any>;
  nameProcess: string = 'DomainTransfer';
  namePhase: string = 'vulnerableOperation';
  processId: number = 0;
  projectId: number = 0;

  synchronizer$: any;


  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public _procedureService: ProcedureService,
    public _vulnerableOperationsService: VulnerableOperationService,
    public synchronizer: SharedDataService,
    private dispacher: ExcecutePhasePredefinedService,
    private loader: LoaderService,
  ) {
    super(router, route, _procedureService, _vulnerableOperationsService);
    this.synchronizer.updateLastForm(this.form);
    const { id, idProcess } = this.route.snapshot.params;
    this.projectId = Number(id);
    this.processId = Number(idProcess);
  }

  ngOnInit(): void {

    this.loader.showFullScreenLoader();
    if (this.synchronizer$) this.synchronizer$.unsubscribe();

    this.synchronizer$ = this.synchronizer.executionCommand$.subscribe((commands) => {
      console.log('this.synchronizer.executionCommand$ ---> ', commands);
      this.executeCommands(commands);
    });

    this.dispacher.getInfoProject(this.projectId, this.processId, { namePhase: this.namePhase, nameProcess: this.nameProcess, data: [] })
      .subscribe({
        next: (data: any) => {
          console.log('get infor project', data);

          if (data.project.procedure_id) {
            this.form.get('procedure_id')?.setValue(data.project.procedure_id);
          }

          this.loader.hideLoader();

        },
        error: (error) => {
          console.error(error);
          this.loader.hideLoader();
          MessageHelper.errorMessage('En este momento no se puede generar formas, consulte con su administrador');
        }
      });
  }

  ngOnDestroy(): void {
  }


  executeCommands(commands: { command: string; args?: any; callback?: Function; }) {
    console.log('Ejecuto comando...', commands);
    switch (commands?.command) {
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
        this.writeValue(commands.args);
        break;
      default:
        console.log('Comando no encontrado', commands);
    }
  }

  next(args?: { process_id: number; project_id: number; data: any; }, callback?: Function) {
    this.onSubmit(args, callback, true);
  }
  prev(args?: { process_id: number; project_id: number; data: any; }, callback?: Function) { }
  writeValue(value: any) {
    setTimeout(() => {
      this.form.patchValue(value);
      console.log('vulnerable_operation_data ---> ', value, this.formComponent);
      this.formComponent.formBuilderComponent.form.patchValue(
        value.vulnerable_operation_data,
      );
    }, 300);
  }


  onSubmit(args?: any, callback?: Function, send = false): void {
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
      next: async (value) => {
        const message = this.isEdit ? 'actualizada' : 'registrada';
        await MessageHelper.successMessage(
          '¡Éxito!',
          `La operación ha sido ${message} correctamente.`,
        );
        if (typeof callback === 'function')
          callback(JSON.stringify(value));
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

  saveForm() {
    console.log('Ejecuto comando ... saveForm');

    this.form
      .get('vulnerable_operation_data')
      ?.setValue(this.formComponent.formBuilderComponent.form.value);

    if (this.form.invalid) {
      console.log('Formulario invalido');
    }
  }
}
