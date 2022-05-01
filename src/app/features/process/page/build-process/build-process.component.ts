import { Component, forwardRef, Injector, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  CLAZZ,
  LOAD_ACTION,
  LOAD_NEXT_ACTION,
  SELECTOR,
} from '../../../../shared/components/dinamyc-views/dynamic-views.module';
import { PopupSelectorComponent } from '../../../../shared/components/dinamyc-views/popup-selector/popup-selector.component';
import { ProcessPhase } from '../../../../data/models/ProcessPhase.model';
import {
  loadNextPageOfProcessPhase,
  loadProcessPhase,
} from '../../../../state/process-phase/processPhase.actions';
import { selectProcessPhase } from '../../../../state/process-phase/processPhase.selector';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  ControlValueAccessor,
  FormArray,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { debounceTime, Subject, take, takeUntil } from 'rxjs';
import { Process } from '../../../../data/models/Process.model';

@Component({
  selector: 'app-build-process',
  templateUrl: './build-process.component.html',
  styleUrls: ['./build-process.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BuildProcessComponent),
      multi: true,
    },
  ],
})
export class BuildProcessComponent implements ControlValueAccessor, OnDestroy {
  processPhases!: ProcessPhase[];

  orderFormArray = new FormArray([]);

  form = new FormGroup({
    order_phases: this.orderFormArray,
  });

  private onDestroy$ = new Subject<number>();

  constructor(private dialog: MatDialog) {
    this.form.valueChanges
      .pipe(debounceTime(100), takeUntil(this.onDestroy$))
      .subscribe((value) => this.notifyValueChange(value));
  }

  private notifyValueChange(value: any) {
    this.onChange(Process.mapConfig(value, this.processPhases));
    this.onTouch();
  }

  onChange = (_: any) => {};

  onTouch = () => {};

  onlyPrevious = (array: any[], [index]: [number]) => {
    return array.reduce((acc, currentItem, i) => {
      return i < index ? [...acc, currentItem] : acc;
    }, []);
  };

  openDialog() {
    const inj = Injector.create({
      providers: [
        { provide: CLAZZ, useValue: ProcessPhase },
        { provide: LOAD_ACTION, useValue: loadProcessPhase() },
        { provide: LOAD_NEXT_ACTION, useValue: loadNextPageOfProcessPhase },
        { provide: SELECTOR, useValue: selectProcessPhase },
      ],
    });

    const dialogRef = this.dialog.open(PopupSelectorComponent, {
      data: {
        title: 'Fases de Proceso',
        property: 'name',
        inj,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((processPhases: any[]) => {
        this.processPhases = processPhases;
        this.orderFormArray.clear();
        this.processPhases.forEach(() => {
          this.orderFormArray.push(
            new FormGroup({
              end_process: new FormControl(false),
              previous: new FormControl(),
            }),
          );
        });
      });
  }

  drop(event: CdkDragDrop<any, any>) {
    moveItemInArray(this.processPhases, event.previousIndex, event.currentIndex);
    const currentGroup = this.orderFormArray.at(event.previousIndex);
    this.orderFormArray.removeAt(event.previousIndex);
    currentGroup.get('previous')?.setValue(null);
    this.orderFormArray.insert(event.currentIndex, currentGroup);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(obj: any): void {}

  ngOnDestroy(): void {
    this.onDestroy$.next(1);
    this.onDestroy$.complete();
  }
}