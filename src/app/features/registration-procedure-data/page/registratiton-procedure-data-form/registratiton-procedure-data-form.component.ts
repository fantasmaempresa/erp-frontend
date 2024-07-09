import { Component, OnDestroy } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageHelper } from 'o2c_core';
import { Observable } from 'rxjs';
import { RegistrationProcedureDataDto } from 'src/app/data/dto/RegistrationProcedureData.dto';
import { DocumentView } from 'src/app/data/presentation/Document.view';
import { PlaceView } from 'src/app/data/presentation/Place.view';
import { RegistrationProcedureDataService } from 'src/app/data/services/registration-procedure-data.service';
import Swal from 'sweetalert2';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-registratiton-procedure-data-form',
  templateUrl: './registratiton-procedure-data-form.component.html',
  styleUrls: ['./registratiton-procedure-data-form.component.scss'],
})
export class RegistratitonProcedureDataFormComponent implements OnDestroy {
  edit = false;

  form!: UntypedFormGroup;

  documentProvider = DocumentView;
  placeProvider = PlaceView;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _registrationService: RegistrationProcedureDataService,
  ) {
    this.form = new UntypedFormGroup({
      date: new UntypedFormControl(null, [Validators.required]),
      place_id: new UntypedFormControl(null, [Validators.required]),
      inscription: new UntypedFormControl(null, []),
      sheets: new UntypedFormControl(null, []),
      took: new UntypedFormControl(null, []),
      book: new UntypedFormControl(null, []),
      departure: new UntypedFormControl(null, []),
      folio_real_estate: new UntypedFormControl(null, []),
      folio_electronic_merchant: new UntypedFormControl(null, []),
      nci: new UntypedFormControl(null, []),
      description: new UntypedFormControl(null, []),
      procedure_id: new UntypedFormControl(null, [Validators.required]),
      document_id: new UntypedFormControl(null, []),
      file: new UntypedFormControl(null, []),
    });

    const id = Number(this.route.snapshot.params.id);
    const idRegistration = Number(this.route.snapshot.params.idRegistration);

    if (!isNaN(id)) {
      this.form.get('procedure_id')?.setValue(id);
      this._registrationService.fetch(id).subscribe({
        next: (value) => {
            this.form.patchValue(value);
        },
      });
    }

    if (!isNaN(idRegistration)) {
      this.edit = true;
      this.edit = true;
      _registrationService.fetch(idRegistration).subscribe({
        next: (client) => {
          this.form.addControl('id', new UntypedFormControl(''));
          this.form.patchValue(client);
        },
      });
    }

    this.form.get('document_id')?.valueChanges.subscribe((value) => {
      this.form.get('file')?.setValidators(Validators.required);
    });
  }
  ngOnDestroy(): void {
  }

  async back() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {
    if (this.form.invalid) {
      console.log('Alguno de los formularios no es valido', this.form.valid);
      return;
    }

    const formData = new FormData();
    const formattedDate = new Date(this.form.value.date).toISOString();
    formData.append('file', this.form.value.file);
    formData.append('date', formattedDate);
    formData.append('inscription', this.form.value.inscription);
    formData.append('sheets', this.form.value.sheets);
    formData.append('took', this.form.value.took);
    formData.append('book', this.form.value.book);
    formData.append('departure', this.form.value.departure);
    formData.append('folio_real_estate', this.form.value.folio_real_estate);
    formData.append('folio_electronic_merchant', this.form.value.folio_electronic_merchant);
    formData.append('nci', this.form.value.nci);
    formData.append('description', this.form.value.description);
    formData.append('procedure_id', this.form.value.procedure_id);
    formData.append('document_id', this.form.value.document_id);
    formData.append('place_id', this.form.value.place_id);
    Swal.showLoading();
    
    let request$: Observable<RegistrationProcedureDataDto>;
    if (!this.edit) {
      request$ = this._registrationService.save(formData);
    } else {
      formData.append('id', this.form.value.id);
      request$ = this._registrationService.updateAlternative(this.form.value.id, formData);
    }

    request$.subscribe({
      next: async () => {
        await MessageHelper.successMessage(
          '¡Éxito!',
          `El registro ha sido guardado correctamente.`,
        );
        await this.back();
      },
      error: async (error) => {
        console.log(error);
        if (error.error.code != null && error.error.code == 422) {
          if (typeof(error.error.error) === 'object') {
            let message = '';

            for (let item in error.error.error) {
              message = message + '\n' + error.error.error[item];
            }

            await MessageHelper.errorMessage(message);
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
