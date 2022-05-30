import { Component, forwardRef, Injector } from '@angular/core';
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
import { Observable, shareReplay, take } from 'rxjs';
import { Process } from '../../../../data/models/Process.model';
import { loadNextPageOfProcess, loadProcess } from '../../../../state/process/process.actions';
import { selectProcess } from '../../../../state/process/process.selector';
import { ProcessPhaseService } from '../../../../data/services/process-phase.service';
import { ProcessPhase } from '../../../../data/models/ProcessPhase.model';

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
export class BuildProjectComponent implements ControlValueAccessor {
  constructor(private dialog: MatDialog, private processPhaseService: ProcessPhaseService) {}

  onChange = (_: any) => {};

  onTouch = () => {};

  involvedFormArray = new FormArray([]);

  form = new FormGroup({
    order_phases: this.involvedFormArray,
  });

  processes: any[] = [];

  mapProcess = (process: any): Observable<ProcessPhase> =>
    this.processPhaseService.fetch(process.phase.id).pipe(shareReplay());

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(obj: any) {}

  openDialog() {
    const inj = Injector.create({
      providers: [
        { provide: CLAZZ, useValue: Process },
        { provide: LOAD_ACTION, useValue: loadProcess() },
        { provide: LOAD_NEXT_ACTION, useValue: loadNextPageOfProcess },
        { provide: SELECTOR, useValue: selectProcess },
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
      .pipe(take(1))
      .subscribe((processes: any[]) => {
        this.processes = processes;
        this.buildInvolvedFormArray();
      });
  }

  private buildInvolvedFormArray() {
    for (let i = 0; i < this.processes.length; i++) {
      this.involvedFormArray.push(
        new FormGroup({
          supervisor: new FormControl(),
          team: new FormControl(),
        }),
      );
    }
  }
}
