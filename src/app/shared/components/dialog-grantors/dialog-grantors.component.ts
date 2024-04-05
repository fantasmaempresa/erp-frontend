import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GrantorDto } from 'src/app/data/dto/Grantor.dto';

@Component({
  selector: 'app-dialog-grantors',
  templateUrl: './dialog-grantors.component.html',
  styleUrls: ['./dialog-grantors.component.scss']
})
export class DialogGrantorsComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogGrantorsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {grantors: GrantorDto[]}
  ) {
    console.log('------------->', data);
  }

  public close() {
    this.dialogRef.close();
  }

}
