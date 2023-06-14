import { Component, forwardRef, OnDestroy } from "@angular/core";
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup
} from "@angular/forms";
import {
  forkJoin,
  lastValueFrom,
  map,
  Observable,
  shareReplay,
  Subject,
  takeUntil,
  tap
} from "rxjs";
import { ProcessDto, ProcessPhaseDto } from "../../../../data/dto";
import {
  ProcessPhaseServiceOld,
  ProcessServiceOld,
  RoleServiceOld
} from "../../../../data/services";
import { ProcessView, ProjectView } from "../../../../data/presentation";
import { PopupService } from "o2c_core";

@Component({
  selector: "app-build-project",
  templateUrl: "./build-project.component.html",
  styleUrls: ["./build-project.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BuildProjectComponent),
      multi: true
    }
  ]
})
export class BuildProjectComponent implements ControlValueAccessor, OnDestroy {
  involvedFormArray = new UntypedFormArray([]);

  form = new UntypedFormGroup({ involved: this.involvedFormArray });

  processes: any[] = [];

  users_data: any[] = [];

  roles: any[] = [];

  private destroy$ = new Subject<boolean>();

  constructor(
    private processPhaseService: ProcessPhaseServiceOld,
    private processService: ProcessServiceOld,
    private roleService: RoleServiceOld,
    private popupService: PopupService
  ) {
    this.involvedFormArray.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.onChange(ProjectView.mapToProcessOnChange(value));
        this.onTouch();
      });
  }

  private static createMandatoryConfig(
    keyType: "mandatory_supervision" | "mandatory_work",
    { id, user } = {
      id: 0,
      user: false
    }
  ) {
    return new UntypedFormGroup({
      id: new UntypedFormControl(id),
      [keyType]: new UntypedFormControl(false),
      user: new UntypedFormControl(user)
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (_: any) => {
  };

  onTouch = () => {
  };

  mapProcessPhase = (phaseProcess: any, [process]: [any]) => {
    console.log("process -->", process, phaseProcess);
    if ("roles" in process) {
      this.roles = process.roles;
    }
    const phase = process.phases.filter((x: any) => x.id === phaseProcess.phase.id);
    console.log("process -->", phase[0]);
    return phase[0];
  };
  // this.processPhaseService.fetch(process.phase.id).pipe(shareReplay());

  nameMapFn = (value: any) => {
    console.log('value?.name --> ', value);
    return value?.name;
  };

  roleGroup = (groupArray: any[]) => {
    return this.roles.filter((x: any) =>
      groupArray.some((y: any) => y.id === x.id)
    );
  };

  userGroup = (groupArray: any[]) => {
    const roles = this.roleGroup(groupArray);

    const users = roles.map((rol: any) => rol.user)
      .reduce((prev: any[], curr: any[]) => [...prev, ...curr], []);

    return users;
  };

  users = (users$: Observable<any[]>, [i, j, type]: [number, number, string]) => {
    const phasesArray = (this.form.get("involved") as UntypedFormArray).controls[i].get("phases") as UntypedFormArray;

    const arrayKey = type === "work" ? "work_user" : "supervisor_user";
    const teamArray = (phasesArray.controls[j] as UntypedFormGroup).get(
      arrayKey
    ) as UntypedFormArray;

    if (this.users_data) {
      const configType =
        type === "work" ? "mandatory_work" : "mandatory_supervision";

      if (teamArray.length < this.users_data.length) {

        const user = this.users_data[this.users_data.length - 1];

        teamArray.push(
          BuildProjectComponent.createMandatoryConfig(configType, {
            id: user.id,
            user: true
          })
        );
      } else {
        const auxControls = teamArray.controls.filter((ctrl) =>
          this.users_data.some((user) => user.id === ctrl.value.id)
        );
        teamArray.clear();
        teamArray.controls = auxControls;
        teamArray.updateValueAndValidity();
      }
    } else {
      teamArray.clear();
    }
  };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  // configProcess: {
  //   process: { id: number };
  //   phases: { phase: { id: number }; involved: any }[];
  // }[],
  async writeValue(configProcess: any) {
    if (configProcess) {
      this.processes = configProcess[1];
      this.users_data = configProcess[0];
      this.roles = configProcess[3];
      this.buildInvolvedFormArray(configProcess[1]);

      // const processPhase = await Promise.all(
      //   this.processes.map(async ({ config }: any) =>
      //     Promise.all(
      //       config.order_phases.map(async (phase: any) => ({
      //         supervisor: this.userGroup(phase.involved.supervisor),
      //         work_group: this.userGroup(phase.involved.work_group)
      //       }))
      //     )
      //   )
      // );

      const processPhase = [];

      for (const { config } of this.processes) {
        const phases = [];

        for (const phase of config.order_phases) {
          const supervisor = this.userGroup(phase.involved.supervisor);
          const work_group = this.userGroup(phase.involved.work_group);

          phases.push({ supervisor, work_group });
        }

        processPhase.push(phases);
      }

      const valueToPatch = ProjectView.mapToProcessOnWrite(
        configProcess[2],
        processPhase
      );
      const references = valueToPatch.map((process) => ({
        phases: process.phases.map((phase: any) => ({
          supervisor_reference: phase.supervisor_reference,
          work_reference: phase.work_reference
        }))
      }));
      this.involvedFormArray.patchValue(references);
    }
  }

  openDialog() {
    this.popupService
      .openTablePopup(ProcessView, "Selecciona un proceso", { isMulti: true })
      .subscribe((processes: any[]) => {
        this.buildInvolvedFormArray(processes);
        this.processes = processes;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private buildInvolvedFormArray(processes: any[]) {
    this.involvedFormArray.clear();
    for (const process of processes) {
      this.involvedFormArray.push(
        new UntypedFormGroup({
          process: new UntypedFormControl({ id: process.id }),
          phases: new UntypedFormArray([])
        })
      );
      for (const phase of process.config.order_phases) {
        const phasesArrayControl = this.involvedFormArray
          .at(this.involvedFormArray.length - 1)
          .get("phases") as UntypedFormArray;
        phasesArrayControl.push(
          new UntypedFormGroup({
            phase: new UntypedFormControl({ id: phase.phase.id }),
            supervisor_reference: new UntypedFormControl(),
            supervisor: new UntypedFormArray([
              ...phase.involved.supervisor.map(({ id }: { id: number }) =>
                BuildProjectComponent.createMandatoryConfig(
                  "mandatory_supervision",
                  {
                    id,
                    user: false
                  }
                )
              )
            ]),
            supervisor_user: new UntypedFormArray([]),
            work_reference: new UntypedFormControl(),
            work_group: new UntypedFormArray([
              ...phase.involved.work_group.map(({ id }: { id: number }) =>
                BuildProjectComponent.createMandatoryConfig("mandatory_work", {
                  id,
                  user: false
                })
              )
            ]),
            work_user: new UntypedFormArray([])
          })
        );
      }
    }
  }
}
