import { Component, forwardRef, Injector, OnDestroy, StaticProvider } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  CLAZZ,
  LOAD_ACTION,
  LOAD_NEXT_ACTION,
  SELECTOR,
} from '../../../../shared/components/dinamyc-views/dynamic-views.module';
import { PopupMultiSelectorComponent } from '../../../../shared/components/dinamyc-views/popup-multi-selector/popup-multi-selector.component';
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
  Validators,
} from '@angular/forms';
import { debounceTime, forkJoin, Subject, take, takeUntil } from 'rxjs';
import { Process } from '../../../../data/models/Process.model';
import { ProcessPhaseService } from '../../../../data/services/process-phase.service';
import { RoleService } from '../../../../data/services/role.service';
import { Role } from '../../../../data/models/Role.model';
import { loadNextPageOfRoles, loadRoles } from '../../../../state/role/role.actions';
import { selectRoles } from '../../../../state/role/role.selector';

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

  constructor(
    private dialog: MatDialog,
    private processPhaseService: ProcessPhaseService,
    public rolesService: RoleService,
  ) {
    this.form.valueChanges
      .pipe(debounceTime(100), takeUntil(this.onDestroy$))
      .subscribe((value) => this.notifyValueChange(value));
  }

  private notifyValueChange(value: any) {
    this.onChange(Process.mapConfigOnChange(value, this.processPhases));
    this.onTouch();
  }

  onChange = (_: any) => {};

  onTouch = () => {};

  onlyPrevious = (array: any[], [index]: [number]) => {
    return array.reduce((acc, currentItem, i) => {
      return i < index ? [...acc, currentItem] : acc;
    }, []);
  };

  rolesProvider: StaticProvider[] = [
    { provide: SELECTOR, useValue: selectRoles },
    { provide: CLAZZ, useValue: Role },
    { provide: LOAD_ACTION, useValue: loadRoles() },
    { provide: LOAD_NEXT_ACTION, useValue: loadNextPageOfRoles },
  ];

  openDialog() {
    const inj = Injector.create({
      providers: [
        { provide: CLAZZ, useValue: ProcessPhase },
        { provide: LOAD_ACTION, useValue: loadProcessPhase() },
        { provide: LOAD_NEXT_ACTION, useValue: loadNextPageOfProcessPhase },
        { provide: SELECTOR, useValue: selectProcessPhase },
      ],
    });

    const dialogRef = this.dialog.open(PopupMultiSelectorComponent, {
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
        if (processPhases) {
          this.processPhases = processPhases;
          this.buildOrderFormArray();
        }
      });
  }

  private buildOrderFormArray() {
    this.orderFormArray.clear();
    this.processPhases.forEach(() => {
      this.orderFormArray.push(
        new FormGroup({
          end_process: new FormControl(false),
          previous: new FormControl(),
          roles_supervision: new FormControl(null, Validators.required),
          roles_team: new FormControl(null, Validators.required),
        }),
      );
    });
  }

  drop(event: CdkDragDrop<any, any>) {
    moveItemInArray(this.processPhases, event.previousIndex, event.currentIndex);
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
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { order_phases, phases_process } = Process.mapConfigOnWrite(obj);
      const arrayRequest$ = phases_process.map(({ id }) => this.processPhaseService.fetch(id));
      forkJoin(arrayRequest$).subscribe((phasesProcess: ProcessPhase[]) => {
        this.processPhases = phasesProcess;
        this.buildOrderFormArray();
        this.orderFormArray.patchValue(order_phases);
      });
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(1);
    this.onDestroy$.complete();
  }
}
