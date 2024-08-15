import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageHelper } from 'o2c_core';
import { Observable, map, pluck, startWith } from 'rxjs';
import { RoleDto } from 'src/app/data/dto';
import { GeneralTemplateService } from 'src/app/data/services/general-template.service';

@Component({
  selector: 'app-general-template-form',
  templateUrl: './general-template-form.component.html',
  styleUrls: ['./general-template-form.component.scss']
})
export class GeneralTemplateFormComponent {
  step = 0;

  form!: UntypedFormGroup;


  form$!: Observable<any> | undefined;

  edit = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _generalTemplateService: GeneralTemplateService,
  ) {
    const id = Number(this.route.snapshot.params.id);


    this.form = new UntypedFormGroup({
      name: new UntypedFormControl(null, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      form: new UntypedFormControl([], Validators.required),
    });

    if (!isNaN(id)) {
      console.log('value edit ---> true');
      this.edit = true;
      this._generalTemplateService.fetch(id).subscribe({
        next: (value: any) => {
          this.form.addControl('id', new UntypedFormControl());
          console.log('value edit ---> ', value);
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

  async onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      await MessageHelper.infoMessage('Revisa los campos que te faltan');
      this.setStep(0);
      return;
    }
    const message = this.edit ? 'actualizada' : 'guardada';
    const request$ = this.edit
      ? this._generalTemplateService.update(this.form.value)
      : this._generalTemplateService.save(this.form.value);
    request$.subscribe({
      next: async () => {
        await MessageHelper.successMessage(
          '¡Éxito!',
          `La fase ha sido ${message} correctamente.`,
        );
        await this.back();
      },
      error: async (error) => {
        console.log(error);
        if (error.error.code != null && error.error.code == 422) {
          if (typeof error.error.error === 'object') {
            let message = '';

            for (let item in error.error.error) {
              message = message + '\n' + error.error.error[item];
            }

            await MessageHelper.errorMessage(message);
          } else {
            await MessageHelper.errorMessage(error.error.error);
          }
        } else if (error.error.code != null && error.error.code == 409) {
          await MessageHelper.errorMessage(
            'Error referente a la base de datos, consulte a su administrador',
          );
        } else if (error.error.code != null && error.error.code == 500) {
          await MessageHelper.errorMessage(
            'Existe un error dentro del servidor, consulte con el administrador',
          );
        } else {
          await MessageHelper.errorMessage(
            'Hubo un error, intente más tarde por favor',
          );
        }
      },
    });
  }
}
