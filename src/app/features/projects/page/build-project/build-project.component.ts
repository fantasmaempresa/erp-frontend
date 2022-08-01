import { Component, forwardRef, Injector, OnDestroy } from '@angular/core';
import {
  ControlValueAccessor,
  FormArray,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  CLAZZ,
  LOAD_ACTION,
  LOAD_NEXT_ACTION,
  SELECTOR,
} from '../../../../shared/components/dinamyc-views/dynamic-views.module';
import { PopupMultiSelectorComponent } from '../../../../shared/components/dinamyc-views/popup-multi-selector/popup-multi-selector.component';
import {
  filter,
  forkJoin,
  lastValueFrom,
  map,
  Observable,
  shareReplay,
  Subject,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import { ProcessDto } from '../../../../data/dto/Process.dto';
import { loadNextPageOfProcess, loadProcess } from '../../../../state/process/process.actions';
import { selectProcess } from '../../../../state/process/process.selector';
import { ProcessPhaseService } from '../../../../data/services/process-phase.service';
import { ProcessPhaseDto } from '../../../../data/dto/ProcessPhase.dto';
import { RoleService } from '../../../../data/services/role.service';
import { ProcessService } from '../../../../data/services/process.service';
import { ProjectView } from '../../../../data/Presentation/Project.view';
import { ProcessView } from '../../../../data/Presentation/Process.view';

@Component({
  selector: 'app-build-project',
  templateUrl: './build-project.component.html',
  styleUrls: ['./build-project.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BuildProjectComponent),
      multi: true,
    },
  ],
})
export class BuildProjectComponent implements ControlValueAccessor, OnDestroy {
  involvedFormArray = new FormArray([]);

  form = new FormGroup({ involved: this.involvedFormArray });

  processes: any[] = [];

  private destroy$ = new Subject<boolean>();

  constructor(
    private dialog: MatDialog,
    private processPhaseService: ProcessPhaseService,
    private processService: ProcessService,
    private roleService: RoleService,
  ) {
    this.involvedFormArray.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.onChange(ProjectView.mapToProcessOnChange(value));
      this.onTouch();
    });
  }

  private static createMandatoryConfig(
    keyType: 'mandatory_supervision' | 'mandatory_work',
    { id, user } = {
      id: 0,
      user: false,
    },
  ) {
    return new FormGroup({
      id: new FormControl(id),
      [keyType]: new FormControl(false),
      user: new FormControl(user),
    });
  }

  onChange = (_: any) => {};

  onTouch = () => {};

  mapProcessPhase = (process: any): Observable<ProcessPhaseDto> =>
    this.processPhaseService.fetch(process.phase.id).pipe(shareReplay());

  nameMapFn = (value: any) => value.name;

  roleGroup = (groupArray: any[]) => {
    const group$ = groupArray.map(({ id }) => this.roleService.fetch(id));
    return forkJoin(group$).pipe(shareReplay());
  };

  userGroup = (groupArray: any[]) =>
    this.roleGroup(groupArray).pipe(
      map((roles: any[]) =>
        roles.map((rol) => rol.user).reduce((prev, curr) => [...prev, ...curr], []),
      ),
    );

  users = (users$: Observable<any[]>, [i, j, type]: [number, number, string]) => {
    return users$.pipe(
      tap((users) => {
        const phasesArray = (this.form.get('involved') as FormArray).controls[i].get(
          'phases',
        ) as FormArray;

        const arrayKey = type === 'work' ? 'work_user' : 'supervisor_user';
        const teamArray = (phasesArray.controls[j] as FormGroup).get(arrayKey) as FormArray;

        if (users) {
          const configType = type === 'work' ? 'mandatory_work' : 'mandatory_supervision';

          if (teamArray.length < users.length) {
            const user = users[users.length - 1];
            teamArray.push(
              BuildProjectComponent.createMandatoryConfig(configType, {
                id: user.id,
                user: true,
              }),
            );
          } else {
            const auxControls = teamArray.controls.filter((ctrl) =>
              users.some((user) => user.id === ctrl.value.id),
            );
            teamArray.clear();
            teamArray.controls = auxControls;
            teamArray.updateValueAndValidity();
          }
        } else {
          teamArray.clear();
        }
      }),
    );
  };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(
    configProcess: {
      process: { id: number };
      phases: { phase: { id: number }; involved: any }[];
    }[],
  ) {
    if (configProcess) {
      const requests$: Observable<ProcessDto>[] = configProcess.map(({ process: { id } }) =>
        this.processService.fetch(id),
      );
      forkJoin(requests$).subscribe(async (processes: ProcessDto[]) => {
        this.processes = processes;
        this.buildInvolvedFormArray(processes);
        const processPhase = await Promise.all(
          processes.map(async ({ config }: any) =>
            Promise.all(
              config.order_phases.map(async (phase: any) => ({
                supervisor: await lastValueFrom(this.userGroup(phase.involved.supervisor)),
                work_group: await lastValueFrom(this.userGroup(phase.involved.work_group),
              }),
            ,
          ,
        );
        const valueToPatch = ProjectView.mapToProcessOnWrite(configProcess, processPhase);
        const references = valueToPatch.map((process) => ({
          phases: process.phases.map((phase: any) => ({
            supervisor_reference: phase.supervisor_reference,
            work_reference: phase.work_referenc,
          }),
        }));
        this.involvedFormArray.patchValue(references);
        this.involvedFormArray.patchValue(valueToPatch);
      });
    }
  }

  openDialog() {
    const inj = Injector.create({
      providers: [
        { provide: CLAZZ, useValue: ProcessView },
        { provide: LOAD_ACTION, useValue: loadProcess() },
        { provide: LOAD_NEXT_ACTION, useValue: loadNextPageOfProcess },
        { provide: SELECTOR, useValue: selectProcess }
      ],
    });

    const dialogRef = this.dialog.open(PopupMultiSelectorComponent, {
      data: {
        title: 'Procesos',
        property: 'name',
        inj,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(
        take(1),
        filter((value: any[]) => !!value),
      )
      .subscribe((processes: any[]) => {
        console.log('Entra');
        this.buildInvolvedFormArray(processes);
        this.processes = processes;
      });
  }

  private buildInvolvedFormArray(processes: any[]) {
    this.involvedFormArray.clear();
    for (const process of processes) {
      this.involvedFormArray.push(
        new FormGroup({
          process: new FormControl({ id: process.id }),
          phases: new FormArray([]),
        }),
      );
      for (const phase of process.config.order_phases) {
        const phasesArrayControl = this.involvedFormArray
          .at(this.involvedFormArray.length - 1)
          .get('phases') as FormArray;
        phasesArrayControl.push(
          new FormGroup({
            phase: new FormControl({ id: phase.phase.id }),
            supervisor_reference: new FormControl(),
            supervisor: new FormArray([
              ...phase.involved.supervisor.map(({ id }: { id: number }) =>
                BuildProjectComponent.createMandatoryConfig('mandatory_supervision', {
                  id,
                  user: false,
                }),
              ),
            ]),
            supervisor_user: new FormArray([]),
            work_reference: new FormControl(),
            work_group: new FormArray([
              ...phase.involved.work_group.map(({ id }: { id: number }) =>
                BuildProjectComponent.createMandatoryConfig('mandatory_work', {
                  id,
                  user: false,
                }),
              ),
            ]),
            work_user: new FormArray([]),
          }),
        );
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
