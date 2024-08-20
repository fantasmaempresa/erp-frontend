import { Component, ViewChild } from '@angular/core';
import {
  AbstractControl,
  UntypedFormControl,
  UntypedFormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FORM_CLAZZ,
  MessageHelper,
  LoaderService,
  FormComponent,
} from 'o2c_core';
import { concatMap, Observable } from 'rxjs';
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
  private _listFormBuilder!: FormComponent;

  public get formComponent(): FormComponent {
    return this._listFormBuilder;
  }

  @ViewChild(FormComponent)
  public set formComponent(value: FormComponent) {
    console.log('seteando formbuilder ---> ', value);
    this._listFormBuilder = value;
  }

  isEdit: boolean = false;

  isDialog: boolean = false;

  bookProvider = BookView;

  form: UntypedFormGroup;

  errors: boolean = false;

  saveErrors: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _folioService: FolioService,
    private loaderService: LoaderService,
  ) {
    this.form = new UntypedFormGroup({
      name: new UntypedFormControl(null, [Validators.required]),
      folio_min: new UntypedFormControl(null, [Validators.required]),
      folio_max: new UntypedFormControl(null, [Validators.required]),
      book_id: new UntypedFormControl(null, [Validators.required]),
      number_of_folios: new UntypedFormControl(null, [Validators.required]),
    });

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
          this._listFormBuilder.formBuilderComponent.form.controls.canceled_folios.setValue(
            folio.unused_folios,
          );
          this.form.controls.name.disable();
          this.form.controls.folio_min.disable();
          this.form.controls.folio_max.disable();
        },
      });

      this.form.controls.number_of_folios.disable();
    }
  }

  ngOnDestroy() {}

  async backToList() {
    if (this.isDialog) return;
    if (this.errors){ await this.router.navigate(["../../"], { relativeTo: this.route });}
    else{
      await this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  submit() {
    if (this.errors) {
      this.verifyErrors();
      return;
    }
    this.form.controls.name.enable();
    this.form.controls.folio_min.enable();
    this.form.controls.folio_max.enable();

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
        // this.form.controls.name.disable();
        // this.form.controls.folio_min.disable();
        // this.form.controls.folio_max.disable();
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
      this.loaderService.showFullScreenLoader();
      this._folioService
        .recommendationInstrument()
        .pipe(
          concatMap((instrumentResponse) => {
            //@ts-ignore
            this.form.get('name')?.setValue(instrumentResponse.name);
            return this._folioService.recommendationFolio(
              this.form.get('book_id')?.value,
              this.form.get('number_of_folios')?.value,
            );
          }),
        )
        .subscribe({
          next: (folioResponse) => {
            //@ts-ignore
            this.form.get('folio_min')?.setValue(folioResponse.folio_min);
            //@ts-ignore
            this.form.get('folio_max')?.setValue(folioResponse.folio_max);
            this.loaderService.hideLoader();
          },
          error: (error) => {
            console.error('Error al realizar las peticiones:', error);
            this.loaderService.hideLoader();
            MessageHelper.errorMessage('Ocurrio un error al generar el folio');
          },
          complete: () => {
            this.loaderService.hideLoader();
          },
        });
    }
  }

  verifyErrors() {
    this.loaderService.showFullScreenLoader();

    this._folioService
      .registerErrors(this.form.controls.id.value, {
        ...this._listFormBuilder.formBuilderComponent.form.value,
        save: this.saveErrors,
      })
      .subscribe({
        next: (folio: any) => {
          this.loaderService.hideLoader();
          if(this.saveErrors){
            MessageHelper.successMessage('¡Correcto!', 'Errores registrados');
            this.backToList();
          }
          else{MessageHelper.successMessage('¡Correcto!', 'Ya puedes registrar los errores');}
          this.saveErrors = true;
          this.form.controls.folio_min.setValue(folio.folio_min);
          this.form.controls.folio_max.setValue(folio.folio_max);
          this.form.controls.name.disable();
          this.form.controls.folio_min.disable();
          this.form.controls.folio_max.disable();
        },
        error: (error) => {
          if (error.error.code != null && error.error.code == 422) {
            if (typeof error.error.error === 'object') {
              let message = '';

              for (let item in error.error.error) {
                message = message + '\n' + error.error.error[item];
              }

              MessageHelper.errorMessage(message);
            } else {
              MessageHelper.errorMessage(error.error.error);
            }
          }
          this.loaderService.hideLoader();
        },
        complete: () => {
          this.loaderService.hideLoader();
        },
      });
  }
}
