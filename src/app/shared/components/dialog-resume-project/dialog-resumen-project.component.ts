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


  constructor(
    public dialogRef: MatDialogRef<DialogResumeProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { form: any[]; rules: { supervisor: any[], work_group: any[] } },
  ) {
  }
}
