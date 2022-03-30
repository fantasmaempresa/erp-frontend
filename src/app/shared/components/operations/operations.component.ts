import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatestWith, map, Observable, startWith, tap } from 'rxjs';
import { Formfield } from '../../../data/models/Formfield.model';
import { selectDynamicForm } from '../../../state/dynamic-form/dynamic-form.selector';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ConceptService } from '../../../data/services/concept.service';
import { Concept } from '../../../data/models/Concept.model';
import { MatDialog } from '@angular/material/dialog';
import { ConceptFormComponent } from '../../../features/concepts/page/concept-form/concept-form.component';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss'],
})
export class OperationsComponent implements OnInit {
  @Output() form = new EventEmitter();

  @ViewChild('fieldInput') fieldInput!: ElementRef;

  autocompleteControl = new FormControl();

  autocompleteConceptControl = new FormControl();

  filteredOptions$!: Observable<Formfield<any>[]>;

  filteredConcepts$: Observable<Concept[]>[] = [];

  filteredConceptsTotal$: Observable<Concept[]>[] = [];

  formFields$!: Observable<Formfield<any>[]>;

  operationsForm!: FormGroup;

  concepts$: Observable<Concept[]>;

  get operation_fields() {
    return this.operationsForm.controls.operation_fields as FormArray;
  }

  get operation_total() {
    return this.operationsForm.controls.operation_total as FormArray;
  }

  constructor(
    private store: Store,
    private conceptService: ConceptService,
    public dialog: MatDialog,
  ) {
    this.formFields$ = store.select(selectDynamicForm);
    this.concepts$ = this.conceptService.fetchAll().pipe(map((concepts) => concepts.data));
    this.initOperationsFormGroup();
    this.autocompleteControl.valueChanges.subscribe((value) => {
      if (typeof value !== 'object') {
        return;
      }
    });
  }

  ngOnInit(): void {
    let valueOfControl$ = this.autocompleteControl.valueChanges.pipe(startWith(''));
    this.filteredOptions$ = this.formFields$.pipe(
      map((value) => value.filter((x) => x.controlType === 'number')),
      tap(() => this.initOperationsFormGroup()),
      combineLatestWith(valueOfControl$),
      map((data) => {
        return this._filter(data[1], data[0]);
      }),
    );
  }

  initOperationsFormGroup() {
    this.operationsForm = new FormGroup({
      operation_fields: new FormArray([]),
      operation_total: new FormArray([]),
    });

    this.operationsForm.valueChanges.subscribe(() => this.form.emit(this.operationsForm));
  }

  createOperationGroup(key: string, target: string): FormGroup {
    let operation = new FormGroup({
      key: new FormControl({ value: key, disabled: true }),
      concept: new FormControl(''),
    });

    if (target === 'total') {
      let valueOfConceptControl = operation.controls.concept.valueChanges.pipe(startWith(''));
      this.filteredConceptsTotal$.push(
        this.concepts$.pipe(
          combineLatestWith(valueOfConceptControl),
          map((data) => {
            return this._filterConcepts(data[1], data[0]);
          }),
        ),
      );
    } else {
      let valueOfConceptControl = operation.controls.concept.valueChanges.pipe(startWith(''));
      this.filteredConcepts$.push(
        this.concepts$.pipe(
          combineLatestWith(valueOfConceptControl),
          map((data) => {
            return this._filterConcepts(data[1], data[0]);
          }),
        ),
      );
    }
    return operation;
  }

  addOperation(item: Formfield<any>) {
    this.fieldInput.nativeElement.blur();
    if (!item) {
      return;
    }
    if (item.key === 'total') {
      const control = this.operationsForm.get('operation_total') as FormArray;
      control.push(this.createOperationGroup(item.key, 'total'));
    } else {
      const control = this.operationsForm.get('operation_fields') as FormArray;
      control.push(this.createOperationGroup(item.key, 'other'));
    }
    // this.autocompleteControl = new FormControl();
  }

  removeOperation(index: number, target: string) {
    let control!: any;

    if (target === 'total') {
      control = this.operation_total;
      this.filteredConceptsTotal$.splice(index, 1);
    } else {
      control = this.operation_fields;
      this.filteredConcepts$.splice(index, 1);
    }

    control.removeAt(index);
  }

  private _filter(value: string | object, options: any) {
    if (typeof value !== 'string') {
      return;
    }

    const filterValue = value.toLowerCase();

    return options.filter((option: any) => {
      return option.key.toLowerCase().includes(filterValue);
    });
  }

  private _filterConcepts(value: string | object, options: Concept[]) {
    if (typeof value !== 'string') {
      return [];
    }

    const filterValue = value.toLowerCase();

    return options.filter((option: Concept) => {
      return option.name.toLowerCase().includes(filterValue);
    });
  }

  trackByFn(index: any, item: any) {
    if (!item) {
      return null;
    }
    return index;
  }

  trackConceptsByFn(index: number, item: any) {
    if (!item) {
      return null;
    }
    return `concept-${item.id}`;
  }

  displayConceptFn(concept: Concept) {
    return concept && concept.name ? concept.name : '';
  }

  calculateOperations() {
    console.log(this.operationsForm.getRawValue());
  }

  createNewConcept() {
    const dialogRef = this.dialog.open(ConceptFormComponent, {
      width: '75vw',
      height: '75vh',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
    });
  }
}
