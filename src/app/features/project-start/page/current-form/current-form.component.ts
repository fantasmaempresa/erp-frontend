import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { MyProjectsService } from '../../../../data/services';
import { map, Observable, tap } from 'rxjs';
import { UntypedFormControl } from '@angular/forms';
import { MessageHelper } from 'o2c_core';
import { messageDecision } from '../../../../shared/helpers/message-wrapper';

@Component({
  selector: 'app-current-form',
  templateUrl: './current-form.component.html',
  styleUrls: ['./current-form.component.scss'],
})
export class CurrentFormComponent implements OnInit {
  projectId!: number;

  processId!: number;

  form$!: Observable<any>;

  formControl = new UntypedFormControl();

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
  ) {
    const { id, idProcess } = this.route.snapshot.params;
    this.projectId = Number(id);
    this.processId = Number(idProcess);
  }

  ngOnInit(): void {
    this.form$ = this.myProjectService
      .getCurrentForm(this.projectId, this.processId)
      .pipe(
        tap(({ controls }: any) => (this.controls = controls)),
        map(({ form }: any) => form),
      );
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
          await MessageHelper.successMessage('Éxito', `${value}`);
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
    console.log(this.formControl);
    const values = this.formControl.value;
    if (values) {
      let complete = true;
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
      if (complete) {
        MessageHelper.showLoading();
        this.myProjectService
          .saveForm({
            projectId: this.projectId,
            processId: this.processId,
            form: {
              ...this.formControl.value,
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
    } else {
      MessageHelper.errorMessage('faltan datos del formulario');
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
}
