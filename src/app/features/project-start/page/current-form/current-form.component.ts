import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  } = {
    next: false,
    prev: false,
    supervision: false,
  };

  constructor(
    private route: ActivatedRoute,
    private myProjectService: MyProjectsService,
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
        },
        error: async (value) => {
          await MessageHelper.errorMessage(`${value}`);
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
        },
        error: async (value) => {
          await MessageHelper.errorMessage(`${value}`);
        },
      });
  }

  @messageDecision('Enviar formulario', '¿Estas seguro?')
  saveForm() {
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
        },
        error: async (value) => {
          await MessageHelper.errorMessage(`${value}`);
        },
      });
  }

  @messageDecision('¿La información es correcta?', '¿Estas seguro?')
  supervise() {
    MessageHelper.showLoading();
    this.myProjectService
      .supervisionProject({
        projectId: this.projectId,
        processId: this.processId,
        comment: 'Otro comentario random nomas para poder avanzar',
      })
      .subscribe({
        next: async (value) => {
          await MessageHelper.successMessage('Éxito', `${value}`);
        },
        error: async (value) => {
          await MessageHelper.errorMessage(`${value}`);
        },
      });
  }
}
