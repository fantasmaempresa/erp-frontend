import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { Formfield } from '../../../data/models/Formfield.model';

@Component({
  selector: 'app-dynamic-form-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dynamic-form-input.component.html',
  styleUrls: ['./dynamic-form-input.component.scss'],
})
export class DynamicFormInputComponent implements OnChanges, OnInit {
  _form!: FormGroup;

  @Input() input!: Formfield<any>;

  @Input() set form(formGroup: FormGroup) {
    console.log(formGroup);
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
    this.form = this.controlContainer.control as FormGroup;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
