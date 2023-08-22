import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-dynamic-add-item',
  templateUrl: './dialog-dynamic-add-item.component.html',
  styleUrls: ['./dialog-dynamic-add-item.component.scss'],
})
export class DialogDynamicAddItemComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogDynamicAddItemComponent>,
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
