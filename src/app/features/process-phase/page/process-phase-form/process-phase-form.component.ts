import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ProcessPhaseServiceOld,
  RoleServiceOld,
} from '../../../../data/services';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { map, Observable, pluck, startWith } from 'rxjs';
import { RoleDto } from '../../../../data/dto';
import { MessageHelper } from 'o2c_core';
import { PredefinedFormsProjectsService } from 'src/app/data/services/predefined-forms-projects.service';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-process-phase-form',
  templateUrl: './process-phase-form.component.html',
  styleUrls: ['./process-phase-form.component.scss'],
})
export class ProcessPhaseFormComponent implements OnDestroy {
  step = 0;
  form!: UntypedFormGroup;
  roles$: Observable<RoleDto[]>;
  form$!: Observable<any> | undefined;
  edit = false;
  menuPredefinedForms = this.menuForms.getMenuPredefinedForms();
  renderComponent: any;
  previewPredefinedForm = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private processPhaseService: ProcessPhaseServiceOld,
    private roleService: RoleServiceOld,
    private menuForms: PredefinedFormsProjectsService,
  ) {
    const id = Number(this.route.snapshot.params.id);

    this.roles$ = this.roleService.fetchAll().pipe(pluck('data'));

    this.form = new UntypedFormGroup({
      name: new UntypedFormControl(null, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      description: new UntypedFormControl(null, [Validators.maxLength(400)]),
      notification: new UntypedFormControl(false),
      payments: new UntypedFormControl(false),
      form: new UntypedFormControl([], Validators.required),
      type_form: new UntypedFormControl(null, Validators.required),
    });

    if (!isNaN(id)) {
      this.edit = true;
      this.processPhaseService.fetch(id).subscribe({
        next: (value: any) => {
          this.form.addControl('id', new UntypedFormControl());
          console.log('value edit ---> ', value);
          this.form.patchValue(value);
          this.form.controls.type_form.setValue(value.type_form.toString());
          this.form.controls.form.setValue(value.form);
        },
      });
    }

    this.form$ = this.form.get('form')?.valueChanges.pipe(
      startWith(this.form.get('form')?.value),
      map((array: any) => {
        if (this.form.controls.type_form.value == 1) {
          return [...array];
        } else if (this.form.controls.type_form.value == 2) {
          return array;
        }
      }),
    );

    this.form$?.subscribe((value) => {
      if (this.form.controls.type_form.value == 2 && value != null) {
        console.log('this.menuForms.getRenderMenu', value);
        this.renderComponent = this.menuForms.getRenderMenu(value.value);
      } else {
        this.renderComponent = false;
      }
    });

    this.form.get('type_form')?.valueChanges.subscribe({
      next: (value) => {
        if ((value = 1)) {
          this.form.get('form')?.setValue([]);
          this.renderComponent = false;
        } else if ((value = 2)) {
          this.form.get('form')?.setValue(null);
        }
      },
    });
  }

  mapRoles = (role: RoleDto) => role.name;

  async back() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }

  setStep(step: number) {
    this.step = step;
    if (this.step === 2) {
      console.log(
        'setStep --> ',
        this.renderComponent,
        this.previewPredefinedForm,
      );
      this.previewPredefinedForm = true;
    }
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  async onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      await MessageHelper.infoMessage('Revisa los campos que te faltan');
      this.setStep(0);
      return;
    }
    const message = this.edit ? 'actualizada' : 'guardada';
    const request$ = this.edit
      ? this.processPhaseService.update(this.form.value)
      : this.processPhaseService.save(this.form.value);
    request$.subscribe({
      next: async () => {
        await MessageHelper.successMessage(
          '¡Éxito!',
          `La fase ha sido ${message} correctamente.`,
        );
        await this.back();
      },
    });
  }

  ngOnDestroy() {}
}
