import { Component, Input } from '@angular/core';
import { DynamicViewComponent } from '../class/dynamic-view.component';
import { EntityModel } from '../../../../core/interfaces/EntityModel';

export interface ActionsCard {
  icon: string;
  callback: (item?: any) => void;
  isVisible?: (item?: any) => boolean;
  tooltip?: string;
}

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss'],
})
export class CardViewComponent<T extends EntityModel> extends DynamicViewComponent<T> {
  @Input()
  actions: ActionsCard[] = [];

  mapToTooltip = (s: any) => (!s ? '' : s);

  mapToVisible = (callback: (item?: any) => boolean, [item]: any[]) => {
    if (!callback) {
      return true;
    }
    return callback(item);
  };
}
