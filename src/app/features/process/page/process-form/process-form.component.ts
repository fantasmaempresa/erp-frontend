import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ProcessServiceOld } from '../../../../data/services';
import { MessageHelper } from 'o2c_core';

@Component({
  selector: 'app-process-form',
  templateUrl: './process-form.component.html',
  styleUrls: ['./process-form.component.scss'],
})
export class ProcessFormComponent {
  edit = false;

  step = 0;

  form!: UntypedFormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private processService: ProcessServiceOld,
  ) {
    this.form = new UntypedFormGroup({
      name: new UntypedFormControl(null, Validators.required),
      description: new UntypedFormControl(null, Validators.required),
      config: new UntypedFormControl(null),
    });

    const id = Number(this.route.snapshot.params.id);
    if (!isNaN(id)) {
      this.edit = true;
      processService.fetch(id).subscribe({
        next: (process) => {
          this.form.addControl('id', new UntypedFormControl(''));
          console.log('process ---> ', process);
          const config = {
            ...process.config,
            // order_phases: process.config.order_phases,
            // phases_process: process.config.phases_process,
            phases: process.phases,
            roles: process.roles,
          };
          process.config = config;
          console.log('process ---> ', process);
          this.form.patchValue(process);
        },
      });
    }
  }

  async back() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }

  setStep(step: number) {
    this.step = step;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const { config } = this.form.value,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      { phases_process } = config;
    const body = { ...this.form.value, phases_process };
    const request$ = this.edit
      ? this.processService.update(body)
      : this.processService.save(body);
    const message = `El proceso se ha ${
      this.edit ? 'actualizado' : 'creado'
    } correctamente`;
    request$.subscribe({
      next: async () => {
        await MessageHelper.successMessage('Éxito', message);
        await this.back();
      },
    });
  }
}
