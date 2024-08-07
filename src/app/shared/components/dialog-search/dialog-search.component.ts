import { Component, HostListener, Inject } from '@angular/core';
import { ClientDto } from '../../../data/dto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-search',
  templateUrl: './dialog-search.component.html',
  styleUrls: ['./dialog-search.component.scss'],
})
export class DialogSearchComponent {
  options!: any;

  optionSelected!: ClientDto | null;

  constructor(
    public dialogRef: MatDialogRef<DialogSearchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    let { componentOptions } = data;
    this.options = componentOptions;
  }

  @HostListener('keydown.esc')
  public onEsc() {
    this.close(false);
  }

  public close(value: ClientDto | boolean) {
    console.log(value);
    // this.dialogRef.close(value);
  }
}
