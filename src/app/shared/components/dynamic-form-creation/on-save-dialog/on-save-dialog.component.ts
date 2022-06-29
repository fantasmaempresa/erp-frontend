import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-on-save-dialog',
  templateUrl: './on-save-dialog.component.html',
  styleUrls: ['./on-save-dialog.component.scss'],
})
export class OnSaveDialogComponent implements OnInit {
  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<OnSaveDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string; payload?: { name: string; description: string } },
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
