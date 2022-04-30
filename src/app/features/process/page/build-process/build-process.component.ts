import { Component, Injector } from '@angular/core';
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
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-build-process',
  templateUrl: './build-process.component.html',
  styleUrls: ['./build-process.component.scss'],
})
export class BuildProcessComponent {
  processPhases!: ProcessPhase[];

  orderFormArray = new FormArray([]);

  form = new FormGroup({
    order_phases: this.orderFormArray,
  });

  onlyPrevious = (array: any[], [index]: [number]) => {
    return array.reduce((acc, currentItem, i) => {
      return i < index ? [...acc, currentItem] : acc;
    }, []);
  };

  constructor(private dialog: MatDialog) {}

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

    dialogRef.afterClosed().subscribe((processPhases: any[]) => {
      this.processPhases = processPhases;
      this.orderFormArray.clear();
      this.processPhases.forEach(() => {
        this.orderFormArray.push(
          new FormGroup({
            end_process: new FormControl(),
            next: new FormControl(),
          }),
        );
      });
    });
  }

  drop(event: CdkDragDrop<any, any>) {
    moveItemInArray(this.processPhases, event.previousIndex, event.currentIndex);
    const currentGroup = this.orderFormArray.at(event.previousIndex);
    this.orderFormArray.removeAt(event.previousIndex);
    currentGroup.get('next')?.setValue(null);
    this.orderFormArray.insert(event.currentIndex, currentGroup);
  }
}
