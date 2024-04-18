import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { AreaServiceOld } from '../../../../data/services';
import { WorkAreaDto } from '../../../../data/dto';
import { MessageHelper } from 'o2c_core';

@Component({
  selector: 'app-area-form',
  templateUrl: './area-form.component.html',
  styleUrls: ['./area-form.component.scss'],
})
export class AreaFormComponent {
  areaForm = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required]),
    description: new UntypedFormControl('', [Validators.required]),
    config: new UntypedFormControl({ test: 'test' }),
  });

  isEdit = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private areaService: AreaServiceOld,
  ) {
    const id = Number(this.route.snapshot.params.id);
    if (!isNaN(id)) {
      this.isEdit = true;
      areaService.fetch(id).subscribe({
        next: (area) => {
          this.areaForm.addControl('id', new UntypedFormControl(''));
          this.areaForm.patchValue(area);
        },
      });
    }
  }

  async backToListAreas() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {
    let request$: Observable<WorkAreaDto>;
    if (!this.isEdit) {
      request$ = this.areaService.save(this.areaForm.value);
    } else {
      request$ = this.areaService.update(this.areaForm.value);
    }
    request$.subscribe({
      next: async () => {
        const message = this.isEdit ? 'actualizada' : 'registrada';
        await MessageHelper.successMessage(
          '¡Éxito!',
          `El area ha sido ${message} correctamente.`,
        );
        await this.backToListAreas();
      },
      error: async (error) => {
        console.log(error);
        if (error.error.code != null && error.error.code == 422) {
          if (typeof(error.error.error) === 'object') {
            await MessageHelper.errorMessage('Faltan algunos datos en este formulario');
          }
          await MessageHelper.errorMessage(error.error.error);
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
