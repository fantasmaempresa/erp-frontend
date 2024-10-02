import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { MessageHelper } from 'o2c_core';
import { map, Observable, startWith, Subject, switchMap, tap } from 'rxjs';
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

  form$!: Observable<any>;

  formControl = new UntypedFormControl();

  type_form: number = 0;

  PREDEFINED_FORM = 2;
  CUSTOM_FORM = 1;

  form_predefined_render: UntypedFormGroup | null = null;

  controls: {
    next: boolean;
    prev: boolean;
    supervision: boolean;
    saveData: boolean;
    completeProcess: boolean;
  } = {
      next: false,
      prev: false,
      supervision: false,
      saveData: false,
      completeProcess: false,
    };

  viewAction = true;

  synchronizer$: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private myProjectService: MyProjectsService,
    private synchronizer: SharedDataService,
  ) {
    const { id, idProcess } = this.route.snapshot.params;
    this.projectId = Number(id);
    this.processId = Number(idProcess);

    this.form$ = this.refresh$.pipe(
      startWith(1),
      tap((value) => {
        console.log('refreshing form', value);
      }),
      switchMap(() =>
        this.myProjectService
          .getCurrentForm(this.projectId, this.processId)
          .pipe(
            tap(({ controls, type_form, values_form }: any) => {
              this.controls = controls;
              this.type_form = type_form;
              if (this.synchronizer$) this.synchronizer$.unsubscribe();
              if (type_form == this.PREDEFINED_FORM) {
                this.synchronizer$ = this.synchronizer.form$.subscribe(
                  (form) => {
                    this.form_predefined_render = form;
                    this.synchronizer.executionCommand({
                      args: values_form,
                      command: 'patchForm',
                    });
                    
                    setTimeout(() => {
                      this.synchronizer.executionCommand({
                        args: {project_id: this.projectId, process_id: this.processId},
                        command: 'loadStructureFormat',
                      });                      
                    }, 100);
                    
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

  @messageDecision('Enviar formulario', '¿Estas seguro?')
  saveForm() {
    console.log(
      ' currente form --> this.formControl',
      this.form_predefined_render?.value,
    );
    // return;
    let complete = true;
    let values = null;

    if (this.type_form == this.PREDEFINED_FORM) {
      this.synchronizer.executionCommand({ command: 'saveForm' });
      if (this.form_predefined_render?.invalid) complete = false;
      values = this.form_predefined_render?.value;

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
      console.log('save format ----> ', {
        projectId: this.projectId,
        processId: this.processId,
        form: {
          ...values,
        },
      });
      this.myProjectService
        .saveForm({
          projectId: this.projectId,
          processId: this.processId,
          form: {
            ...values,
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

  @messageDecision('¿La información es correcta?', '¿Estas seguro?')
  completeProcess() {
    MessageHelper.showLoading();
    this.myProjectService
      .completeProcessProject({
        projectId: this.projectId,
        processId: this.processId,
      })
      .subscribe({
        next: async (value) => {
          await MessageHelper.successMessage('Éxito', `${value}`);
          await this.router.navigate([`../`], {
            relativeTo: this.route,
          });
        },
        error: async (value) => {
          await MessageHelper.errorMessage(value.error.error);
        },
      });
  }

  ngOnDestroy(): void { }

}
