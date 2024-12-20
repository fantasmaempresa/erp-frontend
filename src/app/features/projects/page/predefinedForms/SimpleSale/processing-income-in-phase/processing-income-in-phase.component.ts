import { Component, ComponentRef, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BasicViewComponent, HostDirective, LoaderService, MessageHelper, VIEW_CLAZZ, ViewActionsBuilder, ViewContextService } from 'o2c_core';
import { PredefinedFormLifeCycle } from 'src/app/core/interfaces/PredefinedFormLifeCycle';
import { ProcessingIncomeDto } from 'src/app/data/dto/ProcessingIncome.dto';
import { ProcessingIncomePhaseView } from 'src/app/data/presentation/ProcessingIncome.view';
import { ExcecutePhasePredefinedService } from 'src/app/data/services/excecute-phase-predefined.service';
import { SharedDataService } from 'src/app/data/services/shared-data.service';

@Component({
  selector: 'app-processing-income-in-phase',
  templateUrl: './processing-income-in-phase.component.html',
  styleUrls: ['./processing-income-in-phase.component.scss']
})
export class ProcessingIncomeInPhaseComponent implements PredefinedFormLifeCycle, OnInit, OnDestroy {
  @ViewChild(HostDirective, { static: true }) container!: HostDirective;
  componentRef!: ComponentRef<any>;
  public viewActionBuilder: ViewActionsBuilder<ProcessingIncomeDto>;
  form: FormGroup;
  configStage: boolean = false;

  nameProcess: string = 'DomainTransfer';
  namePhase: string = 'ProcessingIncomePhase';
  projectId: number = 0;
  processId: number = 0;
  synchronizer$: any;

  constructor(
    public route: ActivatedRoute,
    public synchronizer: SharedDataService,
    private dispacher: ExcecutePhasePredefinedService,
    private loader: LoaderService,
    private inj: Injector
  ) {
    const { id, idProcess } = this.route.snapshot.params;
    this.projectId = Number(id);
    this.processId = Number(idProcess);
    this.viewActionBuilder = new ViewActionsBuilder(this.getLocalInjector());
    this.form = new FormGroup({
      phase: new FormControl('Processing Income Phase', []),
    });

    this.synchronizer.updateLastForm(this.form);
  }

  ngOnInit(): void {
    const data = this.route.snapshot.routeConfig?.data;
    if (typeof data?.stage != 'undefined' && data?.stage == 'config') {
      this.configStage = true;
    } else {
      this.loader.showFullScreenLoader();
      // this.synchronizer.updateLastForm(this.shapeForm);

      if (this.synchronizer$) this.synchronizer$.unsubscribe();

      this.synchronizer$ = this.synchronizer.executionCommand$.subscribe((commands) => {
        console.log('this.synchronizer.executionCommand$ ---> ', commands);
        this.executeCommands(commands);
      });
      this.configStage = false;
      this.dispacher.getInfoProject(this.projectId, this.processId, { namePhase: this.namePhase, nameProcess: this.nameProcess, data: [] })
        .subscribe({
          next: (data: any) => {
            console.log('get infor project', data);
            localStorage.setItem('phase_procedure_id', data.project.procedure_id);
            setTimeout(() => {
              const injector = this.getLocalInjector();
              console.log('this.container --> ', this.container);
              this.componentRef = this.container.viewContainerRef.createComponent(
                BasicViewComponent,
                {
                  injector,
                }
              );

              this.componentRef.instance.multiSelection = false;
            }, 500);
            this.loader.hideLoader();

          },
          error: (error) => {
            console.error(error);
            this.loader.hideLoader();
            MessageHelper.errorMessage('En este momento no se puede generar formas, consulte con su administrador');
          }
        });
    }
  }

  ngOnDestroy(): void {
    if (this.synchronizer$) this.synchronizer$.unsubscribe();
  }
  next(args?: { process_id: number; project_id: number; data: any; }, callback?: Function) {
    if (typeof callback == 'function') callback('shape phase complete');
  }
  prev(args?: { process_id: number; project_id: number; data: any; }, callback?: Function) { }

  writeValue(value: any) {
    if(this.componentRef.injector){
      const viewContextService = this.componentRef.injector.get(ViewContextService);
      viewContextService.reloadView();
    }    
  }
  executeCommands(commands: { command: string; args?: any; callback?: Function; }) {
    console.log('Ejecuto comando...', commands);
    switch (commands?.command) {
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

  saveForm() {
  }

  private getLocalInjector() {
    return Injector.create({
      providers: [{ provide: VIEW_CLAZZ, useValue: ProcessingIncomePhaseView }],
      parent: this.inj,
    });
  }
}
