import { Component } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OperationService } from '../../../../data/services/operation.service';
import { Observable } from 'rxjs';
import { OperationsDto } from '../../../../data/dto/Operations.dto';
import { MessageHelper } from 'o2c_core';
import { PlaceService } from '../../../../data/services/place.service';
import { PlaceDto } from '../../../../data/dto/Place.dto';

@Component({
  selector: 'app-place-form',
  templateUrl: './place-form.component.html',
  styleUrls: ['./place-form.component.scss'],
})
export class PlaceFormComponent {
  placeForm = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required]),
  });

  isEdit: boolean = false;

  isDialog: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private placeService: PlaceService,
  ) {
    const currentRoute = this.route.snapshot.routeConfig?.path;
    if (typeof currentRoute === 'undefined') {
      this.isDialog = true;
    }

    const id = Number(this.route.snapshot.params.id);
    if (!isNaN(id)) {
      this.isEdit = true;
      placeService.fetch(id).subscribe({
        next: (operation) => {
          this.placeForm.addControl('id', new UntypedFormControl(''));
          this.placeForm.patchValue(operation);
        },
      });
    }
  }

  async backToListPlaces() {
    if (this.isDialog) {
      return;
    } else {
      await this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  onSubmit() {
    let request$: Observable<PlaceDto>;
    if (!this.isEdit) {
      request$ = this.placeService.save(this.placeForm.value);
    } else {
      request$ = this.placeService.update(this.placeForm.value);
    }
    request$.subscribe({
      next: async () => {
        const message = this.isEdit ? 'actualizada' : 'registrada';
        await MessageHelper.successMessage(
          '¡Éxito!',
          `Lugar ha sido ${message} correctamente.`,
        );
        await this.backToListPlaces();
      },
      error: async (error) => {
        console.log(error);
        if (error.error.code != null && error.error.code == 422) {
          if (typeof(error.error.error) === 'object') {
            await MessageHelper.errorMessage('Faltan algunos datos en este formulario');
          }else{
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
