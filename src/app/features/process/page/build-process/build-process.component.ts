import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  Component,
  forwardRef,
  OnDestroy
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { PopupService } from 'o2c_core';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { ProcessPhaseDto } from '../../../../data/dto';
import {
  ProcessPhaseView,
  ProcessView,
  RoleView,
} from '../../../../data/presentation';
import {
  RoleServiceOld
} from '../../../../data/services';

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
  processPhases!: ProcessPhaseDto[];

  orderFormArray = new UntypedFormArray([]);

  form = new UntypedFormGroup({
    order_phases: this.orderFormArray,
  });

  rolesProvider = RoleView;

  private onDestroy$ = new Subject<number>();

  constructor(
    public rolesService: RoleServiceOld,
    public popupService: PopupService,
  ) {
    this.form.valueChanges
      .pipe(debounceTime(100), takeUntil(this.onDestroy$))
      .subscribe((value) => this.notifyValueChange(value));
  }

  onChange = (_: any) => {};

  onTouch = () => {};

  onlyPrevious = (array: any[], [index]: [number]) => {
    return array.reduce((acc, currentItem, i) => {
      return i < index ? [...acc, currentItem] : acc;
    }, []);
  };

  openDialog() {

    this.popupService
    .openTablePopup({ viewClass: ProcessPhaseView, title: "Selecciona una fase", options: { isMulti: true }})
    .subscribe((processPhases: any[]) => {
      if (processPhases) {
        this.processPhases = processPhases;
        this.buildOrderFormArray();
      }
    });
  }

  drop(event: CdkDragDrop<any, any>) {
    moveItemInArray(
      this.processPhases,
      event.previousIndex,
      event.currentIndex,
    );
    const currentGroup = this.orderFormArray.at(event.previousIndex);
    const nextGroup = this.orderFormArray.at(event.currentIndex);
    this.orderFormArray.removeAt(event.previousIndex);
    currentGroup.get('previous')?.setValue(null);
    nextGroup.get('previous')?.setValue(null);
    this.orderFormArray.insert(event.currentIndex, currentGroup);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(obj: any): void {
    if (obj) {
      console.log('obj -----> ', obj);
      const { order_phases, phases_process } = ProcessView.mapConfigOnWrite(obj);
      this.processPhases = obj.phases;
      this.buildOrderFormArray();
      this.orderFormArray.patchValue(order_phases);
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(1);
    this.onDestroy$.complete();
  }

  private notifyValueChange(value: any) {
    this.onChange(ProcessView.mapConfigOnChange(value, this.processPhases));
    this.onTouch();
  }

  private buildOrderFormArray() {
    this.orderFormArray.clear();
    this.processPhases.forEach(() => {
      this.orderFormArray.push(
        new UntypedFormGroup({
          end_process: new UntypedFormControl(false),
          previous: new UntypedFormControl(),
          roles_supervision: new UntypedFormControl(null, Validators.required),
          roles_team: new UntypedFormControl(null, Validators.required),
        }),
      );
    });
  }
}
