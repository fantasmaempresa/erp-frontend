import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActionsCard } from '../card-view/card-view.component';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-change-view',
  templateUrl: './change-view.component.html',
  styleUrls: ['./change-view.component.scss'],
})
export class ChangeViewComponent implements OnInit, OnDestroy {
  hiddenSelector = false;

  private unsubscribeSubject = new Subject<boolean>();

  constructor(private breakpointObserver: BreakpointObserver) {}

  isSelected: boolean = false;

  @Input()
  actions: ActionsCard[] = [];

  @Output() selectedItem = new EventEmitter<any>();

  setSelectedItem(item: any) {
    this.selectedItem.emit(item);
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(max-width: 1024px)'])
      .pipe(takeUntil(this.unsubscribeSubject))
      .subscribe({
        next: (state: BreakpointState) => {
          this.hiddenSelector = state.matches;
          this.isSelected = state.matches;
        },
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeSubject.next(true);
    this.unsubscribeSubject.complete();
  }
}
