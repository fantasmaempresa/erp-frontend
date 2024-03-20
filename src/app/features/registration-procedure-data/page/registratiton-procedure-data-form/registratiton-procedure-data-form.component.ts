import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageHelper } from 'o2c_core';
import { DocumentView } from 'src/app/data/presentation/Document.view';
import { RegistrationProcedureDataService } from 'src/app/data/services/registration-procedure-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registratiton-procedure-data-form',
  templateUrl: './registratiton-procedure-data-form.component.html',
  styleUrls: ['./registratiton-procedure-data-form.component.scss']
})
export class RegistratitonProcedureDataFormComponent {
  edit = false;

  step = 0;

  form!: UntypedFormGroup;

  documentProvider = DocumentView;

  view: string = '';

  constructor(private router: Router,
    private route: ActivatedRoute,
    private _registrationService: RegistrationProcedureDataService) {

    this.form = new UntypedFormGroup({
      inscription: new UntypedFormControl(null, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      sheets: new UntypedFormControl(null, []),
      took: new UntypedFormControl(null, []),
      date: new UntypedFormControl(null, [Validators.required]),
      property: new UntypedFormControl(null, []),
      procedure_id: new UntypedFormControl(null, [Validators.required]),
      document_id: new UntypedFormControl(null, [Validators.required]),
      description: new UntypedFormControl(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),
      file: new UntypedFormControl(null, [Validators.required]),
    });

    const id = Number(this.route.snapshot.params.id);

    if (!isNaN(id)) {
      this.form.get("procedure_id")?.setValue(id);
    }
  }

  async back() {
    await this.router.navigate(["../"], { relativeTo: this.route });
  }

  onSubmit() {
    if (this.form.invalid) {
      console.log(
        'Alguno de los formularios no es valido',
        this.form.valid,
      );
      return;
    }

    const formData = new FormData();
    formData.append("file", this.form.value.file);
    formData.append("inscription", this.form.value.inscription);
    formData.append("sheets", this.form.value.sheets);
    formData.append("took", this.form.value.took);
    // let date = Date.parse(this.form.value.date);
    const formattedDate = new Date(this.form.value.date).toISOString();
    formData.append("date", formattedDate);
    formData.append("property", this.form.value.property);
    formData.append("procedure_id", this.form.value.procedure_id);
    formData.append("document_id", this.form.value.document_id);
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
      }
    });
  }

}
