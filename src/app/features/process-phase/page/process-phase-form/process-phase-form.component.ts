import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcessPhaseService } from '../../../../data/services/process-phase.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../../../../data/services/role.service';
import { Observable, pluck } from 'rxjs';
import { Role } from '../../../../data/models/Role.model';

@Component({
  selector: 'app-process-phase-form',
  templateUrl: './process-phase-form.component.html',
  styleUrls: ['./process-phase-form.component.scss'],
})
export class ProcessPhaseFormComponent {
  step = 1;

  form!: FormGroup;

  roles$: Observable<Role[]>;

  mapRoles = (role: Role) => role.name;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private processPhaseService: ProcessPhaseService,
    private roleService: RoleService,
  ) {
    this.roles$ = this.roleService.fetchAll().pipe(pluck('data'));

    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      reportable: new FormControl(false),
      payments: new FormControl(false),
      admin: new FormControl(false),
      roles: new FormControl(null, [Validators.required]),
      form: new FormControl(null, [Validators.required]),
    });
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
  }
}
