import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatestWith, map, Observable, startWith } from 'rxjs';
import { Formfield } from '../../../data/models/Formfield.model';
import { selectDynamicForm } from '../../../state/dynamic-form/dynamic-form.selector';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss'],
})
export class OperationsComponent implements OnInit {
  autocompleteControl = new FormControl();

  filteredOptions$!: Observable<Formfield<any>[]>;

  formFields$!: Observable<Formfield<any>[]>;

  operationsForm!: FormGroup;

  constructor(private store: Store) {
    this.formFields$ = store.select(selectDynamicForm);
  }

  ngOnInit(): void {
    let valueOfControl$ = this.autocompleteControl.valueChanges;
    this.filteredOptions$ = valueOfControl$.pipe(
      startWith(''),
      combineLatestWith(this.formFields$),
      map((data) => {
        return this._filter(data[0], data[1]);
      }),
    );
    this.operationsForm = new FormGroup({
      operation_fields: new FormArray([]),
      operation_total: new FormArray([]),
    });
  }

  createOperationGroup(key: string, conceptId?: number): FormGroup {
    return new FormGroup({
      key: new FormControl({ value: key, disabled: true }),
      conceptId: new FormControl(''),
    });
  }

  addOperation(item: Formfield<any>, value?: any) {
    console.log(item);
    if (!item) {
      return;
    }
    const control = this.operationsForm.get('operation_fields') as FormArray;
    control.push(this.createOperationGroup(item.key));
    this.autocompleteControl.reset();
  }

  private _filter(value: string, options: any) {
    console.log(value);
    const filterValue = value.toLowerCase();

    return options.filter((option: any) => {
      return option.key.toLowerCase().includes(filterValue);
    });
  }

  trackByFn(index: any, item: any) {
    console.log(index, item);
    if (!item) {
      return null;
    }
    return index;
  }
}
