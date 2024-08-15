import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GrantorDto } from 'src/app/data/dto/Grantor.dto';

@Component({
  selector: 'app-dialog-grantors',
  templateUrl: './dialog-grantors.component.html',
  styleUrls: ['./dialog-grantors.component.scss'],
})
export class DialogGrantorsComponent {
  grantors: GrantorDto[] = [];
  procedure_id: number = 0;
  constructor(
    public dialogRef: MatDialogRef<DialogGrantorsComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { grantors: GrantorDto[]; procedure_id: number },
  ) {
    this.grantors = this.data.grantors.map((grantor) => {
      //@ts-ignore
      const matchingProcedure = grantor.grantor_procedure.find(
        (item) => item.procedure_id === this.data.procedure_id
      );
      return matchingProcedure ? { ...grantor, procedure: matchingProcedure } : grantor;
    });

    // this.procedure_id = this.data.procedure_id;
    console.log('------------->', data, this.grantors);
  }

  public close() {
    this.dialogRef.close();
  }
}
