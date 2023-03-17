import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyProjectsService } from '../../../../data/services/my-projects.service';
import { Observable } from 'rxjs';
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

  constructor(
    private route: ActivatedRoute,
    private myProjectService: MyProjectsService,
  ) {
    const { id, idProcess } = this.route.snapshot.params;
    this.projectId = Number(id);
    this.processId = Number(idProcess);
  }

  ngOnInit(): void {
    this.form$ = this.myProjectService.getCurrentForm(
      this.projectId,
      this.processId,
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
        next: (value) => {
          MessageHelper.successMessage('Éxito', `${value}`);
        },
        error: (value) => {
          MessageHelper.errorMessage(`${value}`);
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
        next: (value) => {
          MessageHelper.successMessage('Éxito', `${value}`);
        },
        error: (value) => {
          MessageHelper.errorMessage(`${value}`);
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
        next: (value) => {
          MessageHelper.successMessage('Éxito', `${value}`);
        },
        error: (value) => {
          MessageHelper.errorMessage(`${value}`);
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
        next: (value) => {
          MessageHelper.successMessage('Éxito', `${value}`);
        },
        error: (value) => {
          MessageHelper.errorMessage(`${value}`);
        },
      });
  }
}
