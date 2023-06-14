import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-preview-pdf',
  templateUrl: './dialog-preview-pdf.component.html',
  styleUrls: ['./dialog-preview-pdf.component.scss'],
})
export class DialogPreviewPdfComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogPreviewPdfComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string; file: string },
  ) {}
}
