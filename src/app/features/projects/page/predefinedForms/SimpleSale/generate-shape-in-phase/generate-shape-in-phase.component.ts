import { Component, ComponentRef, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { BasicViewComponent, HostDirective, LoaderService, MessageHelper, VIEW_CLAZZ, ViewActionsBuilder, ViewContextService } from 'o2c_core';
import { PredefinedFormLifeCycle } from 'src/app/core/interfaces/PredefinedFormLifeCycle';
import { ShapeDto } from 'src/app/data/dto/Shape.dto';
import { ShapePhaseView } from 'src/app/data/presentation/Shape.view';
import { ExcecutePhasePredefinedService } from 'src/app/data/services/excecute-phase-predefined.service';
import { SharedDataService } from 'src/app/data/services/shared-data.service';

@AutoUnsubscribe()
@Component({
  selector: 'app-generate-shape-in-phase',
  templateUrl: './generate-shape-in-phase.component.html',
  styleUrls: ['./generate-shape-in-phase.component.scss']
})
export class GenerateShapeInPhaseComponent implements PredefinedFormLifeCycle, OnInit, OnDestroy {
  @ViewChild(HostDirective, { static: true }) container!: HostDirective;
  componentRef!: ComponentRef<any>;
  public viewActionBuilder: ViewActionsBuilder<ShapeDto>;
  form: FormGroup;
  configStage: boolean = false;

  nameProcess: string = 'DomainTransfer';
  namePhase: string = 'generateShape';
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
      phase: new FormControl('Shape Phase', []),
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
      providers: [{ provide: VIEW_CLAZZ, useValue: ShapePhaseView }],
      parent: this.inj,
    });
  }

}
