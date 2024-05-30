import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Validators } from 'ngx-editor';
import { MessageHelper } from 'o2c_core';
import { GrantorDto } from 'src/app/data/dto/Grantor.dto';
import { ProcedureService } from 'src/app/data/services/procedure.service';

@AutoUnsubscribe()
@Component({
  selector: 'app-grantor-percentage-dialog',
  templateUrl: './grantor-percentage-dialog.component.html',
  styleUrls: ['./grantor-percentage-dialog.component.scss'],
})
export class GrantorPercentageDialogComponent implements OnDestroy {
  form = this.fb.group({
    grantors: this.fb.array([]),
  });

  constructor(
    private _procedure: ProcedureService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<GrantorPercentageDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { id: number; grantors: GrantorDto[] },
  ) {
    

    this.data.grantors.forEach((grantor) => {
      this.grantors.push(
        this.fb.group({
          grantor_id: [grantor.id, Validators.required],
          percentage: [typeof grantor.pivot?.percentage === 'undefined' ? 0 : grantor.pivot?.percentage , Validators.required],
          amount: [typeof grantor.pivot?.amount === 'undefined' ? 0 : grantor.pivot?.amount, Validators.required],
        })
      );
    });
  }
  ngOnDestroy(): void {}

  public close() {
    this.dialogRef.close();
  }

  onSubmit() {
    console.log("----------> this.form.value", this.form.value);
    
    this._procedure.assingAdditionalData(this.data.id, this.form.value).subscribe({
      next: () => {
        this.dialogRef.close();
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

  get grantors(): any {
    return this.form.controls["grantors"] as FormArray;
  }

  getNameGrantor(id: number): string | undefined {
    return this.data.grantors.find((grantor) => grantor.id == id)?.name;
  }
}
