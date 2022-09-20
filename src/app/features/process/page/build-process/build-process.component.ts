import { Component, forwardRef, Injector, OnDestroy, StaticProvider } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import {
  CLAZZ,
  LOAD_ACTION,
  LOAD_NEXT_ACTION,
  SELECTOR
} from "../../../../shared/components/dinamyc-views/dynamic-views.module";
import {
  PopupMultiSelectorComponent
} from "../../../../shared/components/dinamyc-views/popup-multi-selector/popup-multi-selector.component";
import { ProcessPhaseDto } from "../../../../data/dto/ProcessPhase.dto";
import { loadNextPageOfProcessPhase, loadProcessPhase } from "../../../../state/process-phase/processPhase.actions";
import { selectProcessPhase } from "../../../../state/process-phase/processPhase.selector";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
  Validators
} from "@angular/forms";
import { debounceTime, forkJoin, Subject, take, takeUntil } from "rxjs";
import { ProcessPhaseService } from "../../../../data/services/process-phase.service";
import { RoleService } from "../../../../data/services/role.service";
import { loadNextPageOfRoles, loadRoles } from "../../../../state/role/role.actions";
import { selectRoles } from "../../../../state/role/role.selector";
import { ProcessView } from "../../../../data/Presentation/Process.view";
import { RoleView } from "../../../../data/Presentation/Role.view";
import { ProcessPhaseView } from "../../../../data/Presentation/ProcessPhase.view";

@Component({
  selector: "app-build-process",
  templateUrl: "./build-process.component.html",
  styleUrls: ["./build-process.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BuildProcessComponent),
      multi: true
    }
  ]
})
export class BuildProcessComponent implements ControlValueAccessor, OnDestroy {
  processPhases!: ProcessPhaseDto[];

  orderFormArray = new UntypedFormArray([]);

  form = new UntypedFormGroup({
    order_phases: this.orderFormArray
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
    this.onChange(ProcessView.mapConfigOnChange(value, this.processPhases));
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
    { provide: CLAZZ, useValue: RoleView },
    { provide: LOAD_ACTION, useValue: loadRoles() },
    { provide: LOAD_NEXT_ACTION, useValue: loadNextPageOfRoles },
  ];

  openDialog() {
    const inj = Injector.create({
      providers: [
        { provide: CLAZZ, useValue: ProcessPhaseView },
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
        new UntypedFormGroup({
          end_process: new UntypedFormControl(false),
          previous: new UntypedFormControl(),
          roles_supervision: new UntypedFormControl(null, Validators.required),
          roles_team: new UntypedFormControl(null, Validators.required)
        })
      );
    });
  }

  drop(event: CdkDragDrop<any, any>) {
    moveItemInArray(
      this.processPhases,
      event.previousIndex,
      event.currentIndex
    );
    const currentGroup = this.orderFormArray.at(event.previousIndex);
    const nextGroup = this.orderFormArray.at(event.currentIndex);
    this.orderFormArray.removeAt(event.previousIndex);
    currentGroup.get("previous")?.setValue(null);
    nextGroup.get("previous")?.setValue(null);
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
      const { order_phases, phases_process } =
        ProcessView.mapConfigOnWrite(obj);
      const arrayRequest$ = phases_process.map(({ id }) =>
        this.processPhaseService.fetch(id)
      );
      forkJoin(arrayRequest$).subscribe((phasesProcess: ProcessPhaseDto[]) => {
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
