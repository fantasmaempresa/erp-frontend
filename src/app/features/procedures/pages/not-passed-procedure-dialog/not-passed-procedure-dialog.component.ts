import { Component, Inject, OnDestroy } from '@angular/core';
import { FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { MessageHelper } from 'o2c_core';
import { ProcedureService } from 'src/app/data/services/procedure.service';

@AutoUnsubscribe()
@Component({
  selector: 'app-not-passed-procedure-dialog',
  templateUrl: './not-passed-procedure-dialog.component.html',
  styleUrls: ['./not-passed-procedure-dialog.component.scss']
})
export class NotPassedProcedureDialogComponent implements OnDestroy {

  form: FormGroup;
  constructor(
    private _procedure: ProcedureService,
    public dialogRef: MatDialogRef<NotPassedProcedureDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { id: number},
  ) { 
    this.form = new FormGroup({
      id: new UntypedFormControl('', [Validators.required]),
      description: new UntypedFormControl('', [Validators.required])
    });

    this.form.controls.id.setValue(this.data.id);
  }

  ngOnDestroy(): void {}

  public close() {
    this.dialogRef.close(false);
  }

  submit() {

    if (this.form.invalid) return;

    this._procedure.notPassedProcedure(this.form.value).subscribe({
      next: async() => {
        this.dialogRef.close(true);
        await MessageHelper.successMessage(
          'Expediente cancelado',
          'El expediente se cancelo con éxito'
        )
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
