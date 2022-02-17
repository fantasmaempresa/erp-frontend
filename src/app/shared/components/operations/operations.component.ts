import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Formfield } from '../../../data/models/Formfield.model';
import { selectDynamicForm } from '../../../state/dynamic-form/dynamic-form.selector';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss'],
})
export class OperationsComponent implements OnInit {
  formFields$!: Observable<Formfield<any>[]>;

  operationsForm = new FormGroup({
    groups: new FormArray([]),
  });

  constructor(private store: Store) {
    this.formFields$ = store.select(selectDynamicForm);
  }

  ngOnInit(): void {}

  createOperationGroup(operator: string): FormGroup {
    return new FormGroup({
      operator: new FormControl(),
      operands: new FormArray([]),
    });
  }

  addOperation(item?: any, value?: any) {
    if (!item) {
      return;
    }
  }
}
