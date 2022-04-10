import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormfieldControlService } from '../../../core/services/formfield-control.service';
import { Store } from '@ngrx/store';
import { selectDynamicForm, selectStatus } from '../../../state/dynamic-form/dynamic-form.selector';
import { Observable } from 'rxjs';
import { Formfield } from '../../../data/models/Formfield.model';
import { updateField } from '../../../state/dynamic-form/dynamic-form.actions';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnChanges {
  @Input() formFields!: Formfield<any>[];

  @Input() public set save(val: boolean) {
    console.log(val);
    if (val) {
      this.saveInStore();
    }
  }

  form: FormGroup = new FormGroup({});

  payLoad = '';

  fields$!: Observable<Formfield<any>[]>;

  formStatus$!: Observable<'EDITABLE' | 'NEW'>;

  constructor(private formfieldService: FormfieldControlService, private store: Store) {
    this.fields$ = store.select(selectDynamicForm);
    this.formStatus$ = store.select(selectStatus);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.form = this.createForm(this.formFields);
  }

  createForm(controls: Formfield<any>[]): FormGroup {
    const group: any = {};
    console.log(controls);
    for (const control of controls) {
      if (control.key === 'total') {
        group[control.key] = new FormControl({ value: null, disabled: true });
      } else {
        group[control.key] = control.required
          ? new FormControl(control.value || '', [Validators.required])
          : new FormControl(control.value || '');
      }
    }
    return new FormGroup(group);
  }

  saveInStore() {
    console.log('Estoy guardando en el state');
    let formUpdate: Update<Formfield<any>>;
    for (const field in this.form.value) {
      for (const item of this.formFields) {
        if (item.key === field) {
          formUpdate = {
            id: item.id,
            changes: {
              value:
                item.controlType === 'number' ? +this.form.value[field] : this.form.value[field],
            },
          };
          this.store.dispatch(updateField({ form: formUpdate }));
        }
      }
    }
  }
}
