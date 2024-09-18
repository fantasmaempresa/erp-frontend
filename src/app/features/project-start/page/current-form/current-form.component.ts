import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyProjectsService } from '../../../../data/services';
import { map, Observable, switchMap, tap } from 'rxjs';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MessageHelper } from 'o2c_core';
import { messageDecision } from '../../../../shared/helpers/message-wrapper';
import { SharedDataService } from 'src/app/data/services/shared-data.service';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-current-form',
  templateUrl: './current-form.component.html',
  styleUrls: ['./current-form.component.scss'],
})
export class CurrentFormComponent implements OnInit, OnDestroy {
  projectId!: number;

  processId!: number;

  form$!: Observable<any>;

  formControl = new UntypedFormControl();

  type_form: number = 0;

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

  constructor(
    private route: ActivatedRoute,
    private myProjectService: MyProjectsService,
    private router: Router,
    private synchronizer: SharedDataService,
  ) {
    const { id, idProcess } = this.route.snapshot.params;
    this.projectId = Number(id);
    this.processId = Number(idProcess);
  }

  ngOnInit(): void {
    this.form$ = this.myProjectService
      .getCurrentForm(this.projectId, this.processId)
      .pipe(
        tap(
          ({ controls, type_form }: any) => (
            (this.controls = controls), (this.type_form = type_form)
          ),
        ),
        map(({ form, type_form }: any) => ({ form, type_form })),
      );

    this.form$.subscribe((value) => {
      console.log('this.form$. ---> ', value);
      if (value.type_form == 2) {
        this.synchronizer.form$.subscribe((form) => {
          this.form_predefined_render = form;
          console.log(
            'this.form_predefined_render ---> ',
            this.form_predefined_render,
          );
        });
      }
    });
  }

  @messageDecision('¿Pasar Fase?', '¿Estas seguro?')
  nextPhase() {
    MessageHelper.showLoading();
    this.myProjectService
      .nextPhase({
        projectId: this.projectId,
        processId: this.processId,
        comment: 'Comentario random para pasar el proyecto',
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

    if (this.type_form == 2) {
      this.synchronizer.executionCommand('saveForm');
      if(this.form_predefined_render?.invalid) complete = false;
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

  ngOnDestroy(): void {}
}

// lmUQKnDrOll
