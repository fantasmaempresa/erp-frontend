import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { ProcessService } from "../../../../data/services/process.service";
import { MessageHelper } from "../../../../shared/helpers/MessageHelper";

@Component({
  selector: "app-process-form",
  templateUrl: "./process-form.component.html",
  styleUrls: ["./process-form.component.scss"]
})
export class ProcessFormComponent {
  edit = false;

  step = 0;

  form!: UntypedFormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private processService: ProcessService,
  ) {
    this.form = new UntypedFormGroup({
      name: new UntypedFormControl(null, Validators.required),
      description: new UntypedFormControl(null, Validators.required),
      config: new UntypedFormControl(null)
    });

    const id = Number(this.route.snapshot.params.id);
    if (!isNaN(id)) {
      this.edit = true;
      processService.fetch(id).subscribe({
        next: (process) => {
          this.form.addControl("id", new UntypedFormControl(""));
          this.form.patchValue(process);
        }
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
    const request$ = this.edit ? this.processService.update(body) : this.processService.save(body);
    const message = `El proceso se ha ${this.edit ? 'actualizado' : 'creado'} correctamente`;
    request$.subscribe({
      next: async () => {
        MessageHelper.successMessage('Éxito', message);
        await this.back();
      },
    });
  }
}
