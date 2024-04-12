import { Component } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageHelper } from 'o2c_core';
import { Observable } from 'rxjs';
import { DocumentView } from 'src/app/data/presentation/Document.view';
import { OperationView } from 'src/app/data/presentation/Operation.view';
import { PlaceView } from 'src/app/data/presentation/Place.view';
import { StaffView } from 'src/app/data/presentation/staff.view';
import { ProcessingIncomeService } from 'src/app/data/services/processing-income.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-processing-income-form',
  templateUrl: './processing-income-form.component.html',
  styleUrls: ['./processing-income-form.component.scss'],
})
export class ProcessingIncomeFormComponent {
  edit = false;

  form!: UntypedFormGroup;

  documentProvider = DocumentView;
  placeProvider = PlaceView;
  operationProvider = OperationView;
  staffProvider = StaffView;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _processingService: ProcessingIncomeService,
  ) {
    this.form = new UntypedFormGroup({
      name: new UntypedFormControl(null, [Validators.required]),
      date_income: new UntypedFormControl(null, [Validators.required]),
      place_id: new UntypedFormControl(null, [Validators.required]),
      staff_id: new UntypedFormControl(null, [Validators.required]),
      procedure_id: new UntypedFormControl(null, [Validators.required]),
      operation_id: new UntypedFormControl(null, [Validators.required]),
      document_id_incommign: new UntypedFormControl(null, []),
      document_id_out: new UntypedFormControl(null, []),
      document_id_in: new UntypedFormControl(null, []),
      documents: new UntypedFormControl([]),
    });

    const id = Number(this.route.snapshot.params.id);

    if (!isNaN(id)) {
      this.form.get('procedure_id')?.setValue(id);
      this._processingService.fetch(id).subscribe({
        next: (value) => {
          this.form.patchValue(value);
        },
      });
    } else {
      this.back();
    }

    const idProcessingIncome = Number(
      this.route.snapshot.params.idProcessingIncome,
    );
    if (!isNaN(idProcessingIncome)) {
      this.edit = true;
      this._processingService.fetch(idProcessingIncome).subscribe({
        next: (row) => {
          this.form.addControl('id', new UntypedFormControl(''));
          this.form.patchValue(row);
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
    console.log('formulaio', this.form.value);

    if (this.form.invalid) {
      return;
    }

    this.form
      .get('documents')
      ?.setValue({
        register: { id: this.form.get('document_id_incommign')?.value },
        output: { id: this.form.get('document_id_out')?.value },
        return: { id: this.form.get('document_id_in')?.value },
      });
    let request$: Observable<any>;
    if (!this.edit) {
      request$ = this._processingService.save(this.form.value);
    } else {
      request$ = this._processingService.update(this.form.value);
    }

    Swal.showLoading();

    request$.subscribe({
      next: async () => {
        const message = this.edit ? 'actualizada' : 'registrada';
        await MessageHelper.successMessage(
          '¡Éxito!',
          `La operación ha sido ${message} correctamente.`,
        );
        await this.back();
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
