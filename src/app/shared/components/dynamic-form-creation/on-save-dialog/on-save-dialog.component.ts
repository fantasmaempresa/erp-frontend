import { Component, Inject, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-on-save-dialog',
  templateUrl: './on-save-dialog.component.html',
  styleUrls: ['./on-save-dialog.component.scss'],
})
export class OnSaveDialogComponent implements OnInit {
  formGroup = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required]),
    description: new UntypedFormControl('', [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<OnSaveDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      payload?: { name: string; description: string };
    },
  ) {}

  ngOnInit(): void {
    if (this.data.payload) {
      this.formGroup.patchValue(this.data.payload);
    }
  }

  submit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) {
      return;
    }
    let result = {
      ...this.formGroup.value,
      isConfirmed: true,
    };
    this.dialogRef.close(result);
  }

  onNoClick(): void {
    this.dialogRef.close({
      isConfirmed: false,
    });
  }
}
