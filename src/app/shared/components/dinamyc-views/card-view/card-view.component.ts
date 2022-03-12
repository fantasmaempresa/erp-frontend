import { Component, Input } from '@angular/core';
import { DynamicViewComponent } from '../class/dynamic-view.component';
import { EntityModel } from '../../../../core/interfaces/EntityModel';

export interface ActionsCard {
  icon: string;
  OnClick: (item?: any) => void;
  tooltip?: string;
}

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss'],
})
export class CardViewComponent<T extends EntityModel> extends DynamicViewComponent<T> {
  mapToGetKey = (item: any, [index]: [number]) => {
    return item[this.displayedColumns[index]];
  };

  @Input()
  actions: ActionsCard[] = [];
}
