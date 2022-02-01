import { Component, Input, OnInit } from '@angular/core';
import { FormField } from '../../../core/classes/FormField';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form-input',
  templateUrl: './dynamic-form-input.component.html',
  styleUrls: ['./dynamic-form-input.component.scss'],
})
export class DynamicFormInputComponent implements OnInit {
  @Input() input!: FormField<string>;

  @Input() form!: FormGroup;

  get isValid() {
    return this.form.controls[this.input.key].valid;
  }

  constructor() {}

  ngOnInit(): void {}
}
