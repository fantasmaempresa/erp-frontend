import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Formfield } from '../../../../data/dto/Formfield.dto';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-preview-form-builder',
  templateUrl: './preview-form-builder.component.html',
  styleUrls: ['./preview-form-builder.component.scss'],
})
export class PreviewFormBuilderComponent implements OnChanges {
  @Input()
  formFields: Formfield<any>[] = [];

  form: FormGroup = new FormGroup({});

  constructor() {}

  buildFormGroup(): FormGroup {
    const group: any = {};
    //Todo add creation of validators
    for (const control of this.formFields) {
      group[control.key] = new FormControl(null);
    }
    return new FormGroup(group);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.formFields.currentValue) {
      this.form = this.buildFormGroup();
    }
  }
}
