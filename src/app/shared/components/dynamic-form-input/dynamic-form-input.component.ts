import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ControlContainer, UntypedFormGroup } from '@angular/forms';
import { Formfield } from '../../../data/dto/Formfield.dto';

@Component({
  selector: 'app-dynamic-form-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dynamic-form-input.component.html',
  styleUrls: ['./dynamic-form-input.component.scss'],
})
export class DynamicFormInputComponent implements OnInit {
  _form!: UntypedFormGroup;

  @Input() input!: Formfield<any>;

  @Input() set form(formGroup: UntypedFormGroup) {
    this._form = formGroup;
  }

  get form() {
    return this._form;
  }

  get isValid() {
    return this.form.controls[this.input.key].valid;
  }

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit() {
    this.form = this.controlContainer.control as UntypedFormGroup;
  }
}
