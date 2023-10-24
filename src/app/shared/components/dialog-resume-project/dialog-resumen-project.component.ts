import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-dialog-resumen-project',
  templateUrl: './dialog-resumen-project.component.html',
  styleUrls: ['./dialog-resumen-project.component.scss'],
})
export class DialogResumeProjectComponent {
  formFields: any;

  form: UntypedFormGroup = new UntypedFormGroup({});

  constructor(
    public dialogRef: MatDialogRef<DialogResumeProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { form: any[]; rules:  {supervisor: any[], work_group: any[]}},
  ) {
    this.form = this.buildFormGroup();
    this.formFields = this.data.form;
  }

  buildFormGroup(): UntypedFormGroup {
    const group: any = {};
    for (const control of this.data.form) {
      group[control.key] = new UntypedFormControl(
        control.value ? control.value : null,
        [Validators.required],
      );
      group[control.key].disable();
    }
    return new UntypedFormGroup(group);
  }
}
