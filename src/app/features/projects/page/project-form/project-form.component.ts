import { Component, StaticProvider } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ClientServiceOld,
  ProcessService,
  ProjectService,
} from '../../../../data/services';
import { MessageHelper } from 'o2c_core';
import {
  CLAZZ,
  LOAD_ACTION,
  LOAD_NEXT_ACTION,
  SELECTOR,
} from '../../../../shared/components/dynamic-views/dynamic-views.module';
import {
  loadNextPageOfProcess,
  loadProcess,
  selectProcess,
} from '../../../../state/process';
import { format } from 'date-fns';
import { ClientView, ProcessView } from '../../../../data/presentation';

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

  processProvider: StaticProvider[] = [
    { provide: SELECTOR, useValue: selectProcess },
    { provide: CLAZZ, useValue: ProcessView },
    { provide: LOAD_ACTION, useValue: loadProcess() },
    { provide: LOAD_NEXT_ACTION, useValue: loadNextPageOfProcess },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    public clientService: ClientServiceOld,
    public processService: ProcessService,
  ) {
    this.form = new UntypedFormGroup({
      name: new UntypedFormControl(null, Validators.required),
      folio: new UntypedFormControl(null),
      description: new UntypedFormControl(null, Validators.required),
      estimate_end_date: new UntypedFormControl(null, Validators.required),
      client_id: new UntypedFormControl(null, Validators.required),
      config: new UntypedFormControl(null, Validators.required),
    });

    const id = Number(this.route.snapshot.params.id);
    if (!isNaN(id)) {
      this.edit = true;
      projectService.fetch(id).subscribe({
        next: (project) => {
          this.form.addControl('id', new UntypedFormControl(''));
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
    if (this.form.invalid) return;
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
