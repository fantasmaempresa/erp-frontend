import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField } from '../../../core/classes/FormField';
import { FormfieldControlService } from '../../../core/services/formfield-control.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  @Input() formFields: FormField<string>[] = [];

  form!: FormGroup;

  payLoad = ' ';

  constructor(private formfieldService: FormfieldControlService) {}

  ngOnInit(): void {
    console.log(this.formFields);
    this.form = this.formfieldService.toFormGroup(this.formFields);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }
}
