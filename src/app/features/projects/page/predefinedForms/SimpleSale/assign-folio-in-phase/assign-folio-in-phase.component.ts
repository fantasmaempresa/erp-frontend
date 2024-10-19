import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { LoaderService, MessageHelper } from 'o2c_core';
import { PredefinedFormLifeCycle } from 'src/app/core/interfaces/PredefinedFormLifeCycle';
import { ExcecutePhasePredefinedService } from 'src/app/data/services/excecute-phase-predefined.service';
import { FolioService } from 'src/app/data/services/folio-service.service';
import { SharedDataService } from 'src/app/data/services/shared-data.service';
import { FolioFormComponent } from 'src/app/features/folio/pages/folio-form/folio-form.component';

@AutoUnsubscribe()
@Component({
  selector: 'app-assign-folio-in-phase',
  templateUrl: './assign-folio-in-phase.component.html',
  styleUrls: ['./assign-folio-in-phase.component.scss']
})
export class AssignFolioInPhaseComponent extends FolioFormComponent implements PredefinedFormLifeCycle, OnInit, OnDestroy {
  nameProcess: string = 'DomainTransfer';
  namePhase: string = 'generateFolio';
  synchronizer$: any;


  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public _folioService: FolioService,
    public loaderService: LoaderService,
    private synchronizer: SharedDataService,
    private dispacher: ExcecutePhasePredefinedService,
  ) {
    super(router, route, _folioService, loaderService);
  }
  //Controles
  next(args?: { process_id: number; project_id: number; data: any; }, callback?: Function) {
    console.log('Ejecuto comando ... next');
    this.submit(args, callback);
  }
  prev(args?: { process_id: number; project_id: number; data: any; }, callback?: Function) { };

  writeValue(value: any) { };

  executeCommands(commands: { command: string; args?: any; callback?: Function; }) {
    switch (commands.command) {
      case 'saveForm':
        console.log('saveForm');
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
  };
  ngOnInit(): void {
    this.synchronizer.updateLastForm(this.form);
    if (this.synchronizer$) this.synchronizer$.unsubscribe();

    this.synchronizer$ = this.synchronizer.executionCommand$.subscribe((commands) => {
      console.log('this.synchronizer.executionCommand$ ---> ', commands);
      this.executeCommands(commands);
    });
  }

  patchForm(values: any) {
    this.form.patchValue(values);
  }

  submit(args?: any, callback?: Function): void {
    if (this.errors) {
      this.verifyErrors();
      return;
    }
    this.form.controls.name.enable();
    this.form.controls.folio_min.enable();
    this.form.controls.folio_max.enable();

    if (this.form.invalid) return;

    this.dispacher.executePhase(
      args.project_id,
      args.process_id,
      {
        namePhase: this.namePhase,
        nameProcess: this.nameProcess,
        data: this.form.value,
      }
    ).subscribe({
      next: async (value: any) => {
        const message = this.isEdit ? 'actualizado' : 'registrado';
        await MessageHelper.successMessage(
          '¡Éxito!',
          `El libro ha sido ${message} correctamente.`,
        );

        if (typeof callback === 'function') callback(JSON.stringify({ id: value.id ?? 0 }));
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
  ngOnDestroy(): void {
    if (this.synchronizer$) this.synchronizer$.unsubscribe();

  }

}
