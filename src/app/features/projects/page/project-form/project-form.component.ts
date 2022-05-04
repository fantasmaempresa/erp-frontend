import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../../../data/services/project.service';
import { MessageHelper } from '../../../../shared/helpers/MessageHelper';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent {
  edit = false;

  step = 0;

  form!: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
  ) {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      folio: new FormControl(null),
      description: new FormControl(null, Validators.required),
      estimate_end_date: new FormControl(null, Validators.required),
      client_id: new FormControl(null, Validators.required),
      processes: new FormControl(null, Validators.required),
    });
  }

  async back() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const { config } = this.form.value,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      { phases_process } = config;
    const body = { ...this.form.value, phases_process };
    const request$ = this.edit ? this.projectService.update(body) : this.projectService.save(body);
    const message = `El proyecto se ha ${this.edit ? 'actualizado' : 'creado'} correctamente`;
    request$.subscribe({
      next: async () => {
        MessageHelper.successMessage('Éxito', message);
        await this.back();
      },
    });
  }
}
