import { Component } from '@angular/core';
import {
  AbstractControl,
  UntypedFormControl,
  UntypedFormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FORM_CLAZZ, MessageHelper } from 'o2c_core';
import { Observable } from 'rxjs';
import { FolioDto } from 'src/app/data/dto/Folio.dto';
import { BookView } from 'src/app/data/presentation/Book.view';
import { FolioErrorsTable } from 'src/app/data/presentation/Folio.view';
import { FolioService } from 'src/app/data/services/folio-service.service';

@Component({
  selector: 'app-folio-form',
  templateUrl: './folio-form.component.html',
  styleUrls: ['./folio-form.component.scss'],
  providers: [
    {
      provide: FORM_CLAZZ,
      useValue: FolioErrorsTable,
    },
  ],
})
export class FolioFormComponent {
  isEdit: boolean = false;

  isDialog: boolean = false;

  bookProvider = BookView;

  form: UntypedFormGroup;

  errors: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _folioService: FolioService,
  ) {
    this.form = new UntypedFormGroup(
      {
        name: new UntypedFormControl(null, [Validators.required]),
        folio_min: new UntypedFormControl(null, [Validators.required]),
        folio_max: new UntypedFormControl(null, [Validators.required]),
        book_id: new UntypedFormControl(null, [Validators.required]),
        number_of_folios: new UntypedFormControl(null, [Validators.required]),
      },
      {
        validators: this.compareValuesValidator('folio_min', 'folio_max'),
      },
    );

    const currentRoute = this.route.snapshot.routeConfig?.path;
    const idError = this.route.snapshot.params.idError;

    if (typeof currentRoute === 'undefined') {
      this.isDialog = true;
    }

    const id = Number(this.route.snapshot.params.id);
    if (!isNaN(id)) {
      this.isEdit = true;
      _folioService.fetch(id).subscribe({
        next: (folio) => {
          this.form.addControl('id', new UntypedFormControl(''));
          this.form.patchValue(folio);
        },
      });
    }

    if (!isNaN(idError)) {
      this.errors = true;
      _folioService.fetch(idError).subscribe({
        next: (folio) => {
          this.form.addControl('id', new UntypedFormControl(''));
          this.form.patchValue(folio);
        },
      });
    }
  }

  ngOnDestroy() {}

  async backToList() {
    if (this.isDialog) {
      return;
    }
    await this.router.navigate(['../'], { relativeTo: this.route });
  }

  submit() {
    if (this.form.invalid) return;

    let request$: Observable<FolioDto>;
    if (!this.isEdit) {
      request$ = this._folioService.save(this.form.value);
    } else {
      request$ = this._folioService.update(this.form.value);
    }
    request$.subscribe({
      next: async () => {
        const message = this.isEdit ? 'actualizado' : 'registrado';
        await MessageHelper.successMessage(
          '¡Éxito!',
          `El libro ha sido ${message} correctamente.`,
        );
        await this.backToList();
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

  compareValuesValidator(
    controlName: string,
    compareControlName: string,
  ): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: any } | null => {
      const control = formGroup.get(controlName);
      const compareControl = formGroup.get(compareControlName);

      if (!control || !compareControl) {
        return null;
      }

      const controlValue = control.value;
      const compareControlValue = compareControl.value;

      if (controlValue >= compareControlValue) {
        compareControl.setErrors({ greaterThan: true });
      } else if (controlValue < 0 || compareControlValue < 0) {
        compareControl.setErrors({ negativeNumber: true });
      } else {
        compareControl.setErrors(null);
      }

      return null;
    };
  }

  recomments() {
    if (
      this.form.get('book_id')?.value &&
      this.form.get('number_of_folios')?.value
    ) {
      this._folioService.recommendationInstrument().subscribe({
        next: (response: any) => {
          this.form.get('name')?.setValue(response.name);
        },
      });

      this._folioService
        .recommendationFolio(
          this.form.get('book_id')?.value,
          this.form.get('number_of_folios')?.value,
        )
        .subscribe({
          next: (response: any) => {
            this.form.get('folio_min')?.setValue(response.folio_min);
            this.form.get('folio_max')?.setValue(response.folio_max);
          },
        });
    }
  }

  setValidator() {
    const enable = [
      'name',
      'folio_min',
      'folio_max',
      'book_id',
      'number_of_folios',
    ];
    // this.form.get
  }
}
