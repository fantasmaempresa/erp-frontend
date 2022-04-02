import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatestWith, map, Observable, startWith, take, tap } from 'rxjs';
import { Formfield } from '../../../data/models/Formfield.model';
import { selectDynamicForm } from '../../../state/dynamic-form/dynamic-form.selector';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ConceptService } from '../../../data/services/concept.service';
import { Concept } from '../../../data/models/Concept.model';
import { MatDialog } from '@angular/material/dialog';
import { ConceptFormComponent } from '../../../features/concepts/page/concept-form/concept-form.component';
import { ProjectQuoteService } from '../../../data/services/project-quote.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss'],
})
export class OperationsComponent implements OnInit {
  @Output() form = new EventEmitter();

  @ViewChildren('conceptTotalInput') conceptTotalInput!: QueryList<ElementRef<HTMLInputElement>>;

  @ViewChildren('conceptFieldInput') conceptFieldsInput!: QueryList<ElementRef<HTMLInputElement>>;

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

  separatorKeysCodes: number[] = [ENTER, COMMA];

  preview!: any;

  constructor(
    private store: Store,
    private conceptService: ConceptService,
    public dialog: MatDialog,
    private projectQuoteService: ProjectQuoteService,
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

  createOperationGroup(field: Formfield<any>, target: string): FormGroup {
    let operation = new FormGroup({
      label: new FormControl(field.label),
      value: new FormControl({ value: field.value, disabled: true }),
      key: new FormControl(field.key),
      conceptCtrl: new FormControl(),
      concepts: new FormArray([]),
    });

    if (target === 'total') {
      operation.get('value')?.patchValue('Valor por calcular');
      let valueOfConceptControl = operation.controls.conceptCtrl.valueChanges.pipe(startWith(''));
      this.filteredConceptsTotal$.push(
        this.concepts$.pipe(
          combineLatestWith(valueOfConceptControl),
          map((data) => {
            return this._filterConcepts(data[1], data[0]);
          }),
        ),
      );
    } else {
      let valueOfConceptControl = operation.controls.conceptCtrl.valueChanges.pipe(startWith(''));
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
    if (!item) {
      return;
    }
    let exists = false;
    if (item.key === 'total') {
      const control = this.operationsForm.get('operation_total') as FormArray;
      const controlArray: [] = control.value;
      controlArray.forEach((ctrl: any) => {
        if (ctrl.key === item.key) {
          exists = true;
        }
      });
      if (exists) {
        return;
      }

      control.push(this.createOperationGroup(item, 'total'));
    } else {
      const control = this.operationsForm.get('operation_fields') as FormArray;
      const controlArray: [] = control.value;
      controlArray.forEach((ctrl: any) => {
        if (ctrl.key === item.key) {
          exists = true;
        }
      });
      if (exists) {
        return;
      }
      control.push(this.createOperationGroup(item, 'other'));
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
    this.store
      .select(selectDynamicForm)
      .pipe(take(1))
      .subscribe((form) => {
        const quote = {
          quote: {
            form: {
              ...form,
            },
            operations: {
              ...this.operationsForm.getRawValue(),
            },
          },
        };
        this.projectQuoteService
          .calculateOperations({ ...quote })
          .pipe(
            map((resp: any) => {
              const operation_fields: [] = resp.operation_fields;
              const operation_total = resp.operation_total;
              const concepts: any[] = [];
              for (const opt in operation_fields) {
                // for(const field in resp[opt]) {
                //   console.log(resp[opt][field]);
                const data: any = operation_fields[opt];
                data.name = opt;
                concepts.push(data);
                // }
              }
              concepts.push({
                name: 'total',
                total: operation_total.total,
              });
              console.log(concepts);
              return concepts;
            }),
          )
          .subscribe((resp) => {
            this.preview = resp;
          });
      });
    console.log(this.operationsForm.getRawValue());
  }

  createNewConcept() {
    const dialogRef = this.dialog.open(ConceptFormComponent, {
      data: { isModal: true },
      width: '50vw',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
    });
  }

  selected(event: MatAutocompleteSelectedEvent, index: number, target: string): void {
    if (target === 'total') {
      if (event.option.value === 'create') {
        this.createNewConcept();
        // @ts-ignore
        this.conceptTotalInput.get(index).nativeElement.value = '';
        this.operation_total.at(index).get('conceptCtrl')?.setValue(null);
        return;
      }
      let concepts = this.operation_total.at(index).get('concepts') as FormArray;
      const conceptsArray: Concept[] = concepts.value;
      let isInArray = false;
      conceptsArray.forEach((value) => {
        if (value.id === event.option.value.id) {
          isInArray = true;
        }
      });
      if (isInArray) {
        // @ts-ignore
        this.conceptTotalInput.get(index).nativeElement.value = '';
        return;
      }
      concepts.push(new FormControl(event.option.value));
      // @ts-ignore
      this.conceptTotalInput.get(index).nativeElement.value = '';
      this.operation_total.at(index).get('conceptCtrl')?.setValue(null);
    }
    if (target === 'fields') {
      if (event.option.value === 'create') {
        this.createNewConcept();
        // @ts-ignore
        this.conceptFieldsInput.get(index).nativeElement.value = '';
        this.operation_fields.at(index).get('conceptCtrl')?.setValue(null);
        return;
      }
      let concepts = this.operation_fields.at(index).get('concepts') as FormArray;
      const conceptsArray: Concept[] = concepts.value;
      let isInArray = false;
      conceptsArray.forEach((value) => {
        if (value.id === event.option.value.id) {
          isInArray = true;
        }
      });
      if (isInArray) {
        // @ts-ignore
        this.conceptFieldsInput.get(index).nativeElement.value = '';
        return;
      }
      concepts.push(new FormControl(event.option.value));
      // @ts-ignore
      this.conceptFieldsInput.get(index).nativeElement.value = '';
      this.operation_fields.at(index).get('conceptCtrl')?.setValue(null);
    }
  }

  add(event: MatChipInputEvent, index: number, target: string): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      let concepts = this.operation_fields.at(index).get('concepts') as FormArray;
      concepts.push(new FormControl(value));
    }

    // Clear the input value
    event.chipInput!.clear();

    // this.fruitCtrl.setValue(null);
    this.operation_fields.at(index).get('conceptCtrl')?.setValue(null);
    console.log(this.operation_fields.value);
  }

  remove(concept: Concept, index: number, target: string): void {
    if (target === 'total') {
      const concepts = this.operation_total.at(index).get('concepts') as FormArray;
      const conceptsArray: Concept[] = concepts.value;
      conceptsArray.forEach((value, i) => {
        if (value.id === concept.id) {
          concepts.removeAt(i);
        }
      });
    }
    if (target === 'fields') {
      const concepts = this.operation_fields.at(index).get('concepts') as FormArray;
      const conceptsArray: Concept[] = concepts.value;
      conceptsArray.forEach((value, i) => {
        if (value.id === concept.id) {
          concepts.removeAt(i);
        }
      });
    }
  }
}
