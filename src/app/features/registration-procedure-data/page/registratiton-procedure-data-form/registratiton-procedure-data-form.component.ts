import { A } from '@angular/cdk/keycodes';
import { Component } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageHelper } from 'o2c_core';
import { DocumentView } from 'src/app/data/presentation/Document.view';
import { PlaceView } from 'src/app/data/presentation/Place.view';
import { RegistrationProcedureDataService } from 'src/app/data/services/registration-procedure-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registratiton-procedure-data-form',
  templateUrl: './registratiton-procedure-data-form.component.html',
  styleUrls: ['./registratiton-procedure-data-form.component.scss'],
})
export class RegistratitonProcedureDataFormComponent {
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

    if (!isNaN(id)) {
      this.form.get('procedure_id')?.setValue(id);
      this._registrationService.fetch(id).subscribe({
        next: (value) => {
            this.form.patchValue(value);
        },
      });
    }

    this.form.get('document_id')?.valueChanges.subscribe((value) => {
      this.form.get('file')?.setValidators(Validators.required);
    });
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
    formData.append('book', this.form.value.took);
    formData.append('departure', this.form.value.departure);
    formData.append('folio_real_estate', this.form.value.departure);
    formData.append('folio_electronic_merchant', this.form.value.departure);
    formData.append('nci', this.form.value.departure);
    formData.append('description', this.form.value.departure);
    formData.append('procedure_id', this.form.value.procedure_id);
    formData.append('document_id', this.form.value.document_id);
    formData.append('place_id', this.form.value.place_id);
    Swal.showLoading();

    this._registrationService.save(formData).subscribe({
      next: async () => {
        await MessageHelper.successMessage(
          '¡Éxito!',
          `El registro ha sido guardado correctamente.`,
        );
        await this.back();
      },
      error: async (error) => {
        await MessageHelper.errorMessage(
          '¡Error!',
          `El registro no ha sido guardado correctamente.`,
        );
      },
    });
  }
}
