import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActionsCard } from '../card-view/card-view.component';

@Component({
  selector: 'app-change-view',
  templateUrl: './change-view.component.html',
  styleUrls: ['./change-view.component.scss'],
})
export class ChangeViewComponent {
  isSelected: boolean = false;

  @Input()
  actions: ActionsCard[] = [];

  @Output() selectedItem = new EventEmitter<any>();

  setSelectedItem(item: any) {
    this.selectedItem.emit(item);
  }
}
