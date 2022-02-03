import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField } from '../../../core/classes/FormField';
import { FormfieldControlService } from '../../../core/services/formfield-control.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnChanges {
  // private _formFields!: FormField<string>[];

  @Input() formFields: FormField<string>[] = [];

  // get formFields(): FormField<string>[] {
  //   return this._formFields;
  // }

  form!: FormGroup;

  payLoad = ' ';

  constructor(private formfieldService: FormfieldControlService, private ref: ChangeDetectorRef) {}

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }

  ngOnChanges(changes: SimpleChanges): void {
    const formFields = changes.formFields.currentValue;
    console.log(changes.formFields.currentValue);
    this.form = this.formfieldService.toFormGroup(formFields);
    // console.log(this._formFields);
    // this._formFields = formFields;
    // this.form = this.formfieldService.toFormGroup(formFields);
    // this.ref.detectChanges();
  }
}
