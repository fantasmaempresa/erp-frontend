import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcessPhaseService } from '../../../../data/services/process-phase.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../../../../data/services/role.service';
import { map, Observable, pluck, startWith } from 'rxjs';
import { Role } from '../../../../data/models/Role.model';
import { MessageHelper } from '../../../../shared/helpers/MessageHelper';

@Component({
  selector: 'app-process-phase-form',
  templateUrl: './process-phase-form.component.html',
  styleUrls: ['./process-phase-form.component.scss'],
})
export class ProcessPhaseFormComponent {
  step = 0;

  form!: FormGroup;

  roles$: Observable<Role[]>;

  mapRoles = (role: Role) => role.name;

  form$!: Observable<any> | undefined;

  edit = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private processPhaseService: ProcessPhaseService,
    private roleService: RoleService,
  ) {
    const id = Number(this.route.snapshot.params.id);

    this.roles$ = this.roleService.fetchAll().pipe(pluck('data'));

    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      reportable: new FormControl(false),
      payments: new FormControl(false),
      admin: new FormControl(false),
      roles: new FormControl(null, [Validators.required]),
      form: new FormControl([], Validators.required),
    });

    if (!isNaN(id)) {
      this.edit = true;
      this.processPhaseService.fetch(id).subscribe({
        next: (value: any) => {
          this.form.patchValue(value);
        },
      });
    }

    this.form$ = this.form.get('form')?.valueChanges.pipe(
      startWith(this.form.get('form')?.value),
      map((array: any[]) => [...array]),
    );
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
    console.log(this.form.value);
    if (this.form.invalid) {
      MessageHelper.infoMessage('Revisa los campos que te faltan');
      this.setStep(0);
      return;
    }
    this.form.value.payments = [];
    const message = this.edit ? 'actualizado' : 'registrado';
    if (!this.edit) {
      this.processPhaseService.save(this.form.value).subscribe({
        next: async () => {
          MessageHelper.successMessage('¡Éxito!', `La fase ha sido ${message} correctamente.`);
          await this.back();
        },
      });
    }
  }
}
