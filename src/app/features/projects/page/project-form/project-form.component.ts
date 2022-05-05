import { Component, StaticProvider } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../../../data/services/project.service';
import { MessageHelper } from '../../../../shared/helpers/MessageHelper';
import {
  CLAZZ,
  LOAD_ACTION,
  LOAD_NEXT_ACTION,
  SELECTOR,
} from '../../../../shared/components/dinamyc-views/dynamic-views.module';
import { selectClients } from '../../../../state/clients/clients.selector';
import { Client } from '../../../../data/models/Client.model';
import { loadClients, loadNextPageOfClients } from '../../../../state/clients/clients.actions';
import { ClientService } from '../../../../data/services/client.service';
import { ProcessService } from '../../../../data/services/process.service';
import { selectProcess } from '../../../../state/process/process.selector';
import { Process } from '../../../../data/models/Process.model';
import { loadNextPageOfProcess, loadProcess } from '../../../../state/process/process.actions';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent {
  edit = false;

  step = 0;

  form!: FormGroup;

  clientProvider: StaticProvider[] = [
    { provide: SELECTOR, useValue: selectClients },
    { provide: CLAZZ, useValue: Client },
    { provide: LOAD_ACTION, useValue: loadClients() },
    { provide: LOAD_NEXT_ACTION, useValue: loadNextPageOfClients },
  ];

  processProvider: StaticProvider[] = [
    { provide: SELECTOR, useValue: selectProcess },
    { provide: CLAZZ, useValue: Process },
    { provide: LOAD_ACTION, useValue: loadProcess() },
    { provide: LOAD_NEXT_ACTION, useValue: loadNextPageOfProcess },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    public clientService: ClientService,
    public processService: ProcessService,
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
