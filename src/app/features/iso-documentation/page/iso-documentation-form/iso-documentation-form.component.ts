import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageHelper } from 'o2c_core';
import { IsoDocumentationService } from 'src/app/data/services/iso-documentation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-iso-documentation-form',
  templateUrl: './iso-documentation-form.component.html',
  styleUrls: ['./iso-documentation-form.component.scss']
})
export class IsoDocumentationFormComponent {
  edit = false;

  form!: UntypedFormGroup;

  view: string = '';

  constructor(private router: Router,
    private route: ActivatedRoute,
    private _isoDocumentationService: IsoDocumentationService) {

    this.form = new UntypedFormGroup({
      name: new UntypedFormControl(null, [Validators.required]),
      rule: new UntypedFormControl(null, [Validators.required]),
      description: new UntypedFormControl(null, [Validators.required]),
      file: new UntypedFormControl(null, [Validators.required]),
    });

    const id = Number(this.route.snapshot.params.id);

    if (!isNaN(id)) {
      this.form.get("id")?.setValue(id);
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
    formData.append("name", this.form.value.name);
    formData.append("rule", this.form.value.rule);
    formData.append("description", this.form.value.description);
    formData.append("file", this.form.value.file);

    Swal.showLoading();

    this._isoDocumentationService.save(formData).subscribe({
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