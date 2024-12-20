import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { MessageHelper } from 'o2c_core';
import { map, Observable, startWith, Subject, switchMap, tap } from 'rxjs';
import { CommandProjectDto, ProcedureDto } from 'src/app/data/dto';
import { ProjectActionEventService } from 'src/app/data/services/project-action-event.service';
import { SharedDataService } from 'src/app/data/services/shared-data.service';
import { MyProjectsService } from '../../../../data/services';
import { messageDecision } from '../../../../shared/helpers/message-wrapper';

@AutoUnsubscribe()
@Component({
  selector: 'app-current-form',
  templateUrl: './current-form.component.html',
  styleUrls: ['./current-form.component.scss'],
})
export class CurrentFormComponent implements OnInit, OnDestroy {
  refresh = new Subject<number>();
  refresh$ = this.refresh.asObservable();

  projectId!: number;

  processId!: number;

  procedure_id!: number;

  form$!: Observable<any>;

  formControl = new UntypedFormControl();

  type_form: number = 0;

  PREDEFINED_FORM = 2;
  CUSTOM_FORM = 1;

  disableComments: boolean = true;

  form_predefined_render: UntypedFormGroup | null = null;

  controls: {
    next: boolean;
    prev: boolean;
    supervision: boolean;
    saveData: boolean;
    completeProcess: boolean;
    correction: boolean;
  } = {
      next: false,
      prev: false,
      supervision: false,
      saveData: false,
      completeProcess: false,
      correction: false,
    };

  viewAction = true;

  synchronizer$: any;
  socket$: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private myProjectService: MyProjectsService,
    private synchronizer: SharedDataService,
    private _socket: ProjectActionEventService,
  ) {

    const { id, idProcess } = this.route.snapshot.params;
    this.projectId = Number(id);
    this.processId = Number(idProcess);

    if (this.socket$) this.socket$.unsubscribe();
    this.socket$ = this._socket.action$.subscribe((action: CommandProjectDto) => {
      console.log('action ---> ', action);
      if (action.action.command == 'reload_current_form' &&
        action.process_id == this.processId &&
        action.project_id == this.projectId) {
        if (action.action.action == 'skipPhase' || action.action.action == 'saveFormData') {
          this.ngOnInit();
        }
      } else if (action.action.command == 'reload_current_form' &&
        action.project_id == this.projectId
      ) {
        if (action.action.action == 'finishProject') {
          this.router.navigate(['/app/project-start/list']);
        }
      }

      if (action.action.command == 'send_internal_notification' &&
        action.process_id == this.processId &&
        action.project_id == this.projectId) {
        this.synchronizer.executionCommand({
          args: action.data,
          command: 'show_notification',
        });
      }
    },
    );

    this.form$ = this.refresh$.pipe(
      startWith(1),
      tap((value) => {
        console.log('refreshing form', value);
      }),
      switchMap(() =>
        this.myProjectService
          .getCurrentForm(this.projectId, this.processId)
          .pipe(
            tap(({ controls, type_form, values_form, form, procedure }: any) => {
              this.enableComments(procedure);
              this.controls = controls;
              this.type_form = type_form;
              if (this.synchronizer$) this.synchronizer$.unsubscribe();
              if (type_form == this.PREDEFINED_FORM) {
                this.synchronizer$ = this.synchronizer.form$.subscribe(

                  (childrenForm) => {
                    this.form_predefined_render = childrenForm;
                    this.synchronizer.executionCommand({
                      args: values_form,
                      command: 'patchForm',
                    });

                    let useformat = form.withFormat ? form.formats : [];

                    setTimeout(() => {
                      this.synchronizer.executionCommand({
                        args: { project_id: this.projectId, process_id: this.processId, format: useformat },
                        command: 'loadStructureFormat',
                      });
                    }, 300);

                    console.log(
                      'this.form_predefined_render ---> ',
                      this.form_predefined_render,
                    );
                  },
                );
              }
            }),
            map(({ form, type_form }: any) => ({ form, type_form })),
          ),
      ),
    );
  }

  ngOnInit(): void {
    console.log('ngOnInit --> ');
    this.refresh.next(1);
  }

  @messageDecision('¿Pasar Fase?', '¿Estas seguro?')
  nextPhase() {
    MessageHelper.showLoading();
    let callback = (value?: string) => {
      this.myProjectService
        .nextPhase({
          projectId: this.projectId,
          processId: this.processId,
          comment: value ?? 'Fase completada con éxito',
        })
        .subscribe({
          next: async (value) => {
            await MessageHelper.successMessage(
              'Éxito',
              `Continua la siguiete fase`,
            );
            this.ngOnInit();
          },
          error: async (value) => {
            await MessageHelper.errorMessage(value.error.error);
          },
        });
    };

    if (this.type_form == this.PREDEFINED_FORM) {
      this.synchronizer.executionCommand({
        command: 'next',
        args: {
          project_id: this.projectId,
          process_id: this.processId,
        },
        callback: callback,
      });
    } else {
      callback();
    }
  }

  @messageDecision('¿Ir a una fase previa?', '¿Estas seguro?')
  prevPhase() {
    MessageHelper.showLoading();
    this.myProjectService
      .prevPhase({
        projectId: this.projectId,
        processId: this.processId,
        comment: 'Comentario random para ir para atrás en el proyecto',
      })
      .subscribe({
        next: async (value) => {
          await MessageHelper.successMessage('Éxito', `${value}`);
          this.ngOnInit();
        },
        error: async (value) => {
          await MessageHelper.errorMessage(value.error.error);
        },
      });
  }

  saveForm(correction: boolean) {

    let callback = () => {
      let complete = true;
      let values = null;

      if (this.type_form == this.PREDEFINED_FORM) {
        this.synchronizer.executionCommand({ command: 'saveForm' });
        if (this.form_predefined_render?.invalid) complete = false;
        values = this.form_predefined_render?.value;

      } else {
        values = this.formControl.value;
        if (values) {
          for (let value in values) {
            console.log('---> value', values[value]);
            if (values[value]) {
              continue;
            } else {
              MessageHelper.errorMessage('faltan datos del formulario');
              complete = false;
              break;
            }
          }
        } else {
          MessageHelper.errorMessage('faltan datos del formulario');
        }
      }

      if (complete) {
        MessageHelper.showLoading();
        console.info('correction : correction --> ', { correction: correction });
        this.myProjectService
          .saveForm({
            projectId: this.projectId,
            processId: this.processId,
            form: {
              correction: correction,
              form: { ...values },
            },
          })
          .subscribe({
            next: async (value) => {
              await MessageHelper.successMessage('Éxito', `${value}`);
              this.ngOnInit();
            },
            error: async (value) => {
              console.log(value.error);
              await MessageHelper.errorMessage(value.error.error);
            },
          });
      }
    }

    MessageHelper.decisionMessage(
      'Enviar formulario',
      '¿Estas seguro?',
      callback,
    );
  }

  @messageDecision('¿La información es correcta?', '¿Estas seguro?')
  supervise() {
    MessageHelper.showLoading();
    this.myProjectService
      .supervisionProject({
        projectId: this.projectId,
        processId: this.processId,
        comment: 'comment',
      })
      .subscribe({
        next: async (value) => {
          await MessageHelper.successMessage('Éxito', `${value}`);
          this.ngOnInit();
        },
        error: async (value) => {
          await MessageHelper.errorMessage(value.error.error);
        },
      });
  }

  @messageDecision('¿Desea terminar el proceso?', '¿Estas seguro?')
  completeProcess() {
    let callback = () => {
      this.myProjectService
        .completeProcessProject({
          projectId: this.projectId,
          processId: this.processId,
        })
        .subscribe({
          next: async (value: any) => {
            await MessageHelper.successMessage('Éxito', `${value.message}`);
            await this.router.navigate(['./../../../'], {
              relativeTo: this.route,
            });
          },
          error: async (value) => {
            await MessageHelper.errorMessage(value.error.error);
          },
        });
    };

    if (this.type_form == this.PREDEFINED_FORM) {
      MessageHelper.decisionMessage(
        '¿Guardar progreso?',
        '¿Desea guardar la información de esta actividad?',
        () => {
          this.synchronizer.executionCommand({
            command: 'next',
            args: {
              project_id: this.projectId,
              process_id: this.processId,
            },
            callback: callback,
          });
        }
      );
    } else {
      callback();
    }
  }

  async back() {
    await this.router.navigate(['../../../'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    if (this.refresh) this.refresh.unsubscribe();
    if (this.socket$) this.socket$.unsubscribe();
    if (this.synchronizer$) this.synchronizer$.unsubscribe();

  }

  addCommentToProcedure() {
    this.router.navigate([this.procedure_id, 'Pcomments'],
      { relativeTo: this.route }
    );
  }

  enableComments(procedure: ProcedureDto | null): void {
    if (procedure) {
      this.disableComments = false;
      this.procedure_id = procedure.id;
    }
  }
}
