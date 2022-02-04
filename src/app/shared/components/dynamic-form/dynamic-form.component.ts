import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormfieldControlService } from '../../../core/services/formfield-control.service';
import { Store } from '@ngrx/store';
import { selectDynamicForm } from '../../../state/dynamic-form/dynamic-form.selector';
import { Observable } from 'rxjs';
import { Formfield } from '../../../data/models/Formfield.model';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent {
  form: FormGroup = new FormGroup({});

  payLoad = '';

  fields$!: Observable<Formfield<any>[]>;

  isLoading = false;

  constructor(private formfieldService: FormfieldControlService, private store: Store) {
    this.fields$ = store.select(selectDynamicForm);
    this.fields$.subscribe((data) => {
      console.log(data);
      this.isLoading = true;
      data.forEach((control) => {
        this.form.setControl(control.key, new FormControl(''));
      });
      this.isLoading = false;
    });
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }

  createOption() {
    return new FormGroup({
      key: new FormControl('', Validators.required),
      value: new FormControl('', Validators.required),
    });
  }
}
