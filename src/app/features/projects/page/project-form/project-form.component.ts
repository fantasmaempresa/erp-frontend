import { Component } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectServiceOld } from '../../../../data/services';
import { MessageHelper } from 'o2c_core';
import { format } from 'date-fns';
import { ClientView } from '../../../../data/presentation';
import { ProcedureView } from '../../../../data/presentation/Procedure.view';
import { ProjectQuoteView } from "../../../../data/presentation/ProjectQuote.view";

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent {
  edit = false;

  step = 0;

  form!: UntypedFormGroup;

  clientProvider = ClientView;

  procedureProvider = ProcedureView;

  projectQuoteProvider = ProjectQuoteView;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectServiceOld,
  ) {
    this.form = new UntypedFormGroup({
      name: new UntypedFormControl(null, Validators.required),
      folio: new UntypedFormControl(null),
      description: new UntypedFormControl(null, Validators.required),
      estimate_end_date: new UntypedFormControl(null, Validators.required),
      client_id: new UntypedFormControl(null, Validators.required),
      procedure_id: new UntypedFormControl(null, Validators.required),
      project_quote_id: new UntypedFormControl(null, Validators.required),
      config: new UntypedFormControl(null, Validators.required),
    });

    const id = Number(this.route.snapshot.params.id);
    if (!isNaN(id)) {
      this.edit = true;
      projectService.fetch(id).subscribe({
        next: (project) => {
          console.log('project ---> ', project);
          this.form.addControl('id', new UntypedFormControl(id));
          // @ts-ignore
          const roles = project.roles.filter(
            (elemento, index, arr) =>
              !arr.slice(0, index).some((e) => e.id === elemento.id),
          );

          const config = [
            project.users,
            project.process,
            project.config,
            roles,
          ];
          project.config = config;
          console.log('set config --> ', project);
          this.form.patchValue(project);
        },
      });
    }
  }

  async back() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      console.log('fomulario no valido');
      return;
    }
    this.form.value.estimate_end_date = format(
      this.form.value.estimate_end_date,
      'yyyy-MM-dd',
    );
    console.log(this.form.value.estimate_end_date);
    const request$ = this.edit
      ? this.projectService.update(this.form.value)
      : this.projectService.save(this.form.value);
    const message = `El proyecto se ha ${
      this.edit ? 'actualizado' : 'creado'
    } correctamente`;
    MessageHelper.showLoading('Enviando al Servidor...');
    request$.subscribe({
      next: async () => {
        await MessageHelper.successMessage('Éxito', message);
        await this.back();
      },
      error: () => {
        MessageHelper.hide();
      },
    });
  }
}
