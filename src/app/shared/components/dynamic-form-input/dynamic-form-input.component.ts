import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ControlContainer, UntypedFormGroup } from '@angular/forms';
import { Formfield } from '../../../data/dto';

@Component({
  selector: 'app-dynamic-form-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dynamic-form-input.component.html',
  styleUrls: ['./dynamic-form-input.component.scss'],
})
export class DynamicFormInputComponent implements OnInit {
  @Input() input!: Formfield<any>;

  constructor(private controlContainer: ControlContainer) {}

  _form!: UntypedFormGroup;

  get form() {
    return this._form;
  }

  @Input() set form(formGroup: UntypedFormGroup) {
    this._form = formGroup;
  }

  get isValid() {
    return this.form.controls[this.input.key].valid;
  }

  ngOnInit() {
    this.form = this.controlContainer.control as UntypedFormGroup;
  }
}
