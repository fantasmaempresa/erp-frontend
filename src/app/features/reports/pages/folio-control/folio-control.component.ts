import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl } from '@angular/forms';
import { BookView } from 'src/app/data/presentation/Book.view';
import { SharedDataService } from 'src/app/data/services/shared-data.service';

@Component({
  selector: 'app-folio-control',
  templateUrl: './folio-control.component.html',
  styleUrls: ['./folio-control.component.scss']
})
export class FolioControlComponent {

    childForm: FormGroup;

    bookProvider = BookView;

    constructor(private fb: FormBuilder, private sharedData: SharedDataService) {
       this.childForm = this.fb.group({
        book_id: new UntypedFormControl(null, []),
      })
    }

    onSubmit() {
      if (this.childForm.valid) {
        this.sharedData.updateData(this.childForm.value);
      }
    }
}
