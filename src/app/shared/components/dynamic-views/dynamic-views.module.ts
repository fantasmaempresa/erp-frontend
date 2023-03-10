import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemoizedSelector } from '@ngrx/store';
import { TableViewComponent } from './table-view/table-view.component';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { CardViewComponent } from './card-view/card-view.component';
import { ChangeViewComponent } from './change-view/change-view.component';
import { PopupMultiSelectorComponent } from './popup-multi-selector/popup-multi-selector.component';
import { MapToPipe } from '../../pipes';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { PopupSelectorComponent } from './popup-selector/popup-selector.component';
import { HostDirective } from '../../directives';
import { BindPopupDirective } from './directives/bind-popup.directive';
import { BindMultiPopupComponent } from './directives/bind-multi-popup/bind-multi-popup.component';
import { MaterialModule } from '../../material/material.module';

@NgModule({
  declarations: [
    HostDirective,
    MapToPipe,
    TableViewComponent,
    CardViewComponent,
    ChangeViewComponent,
    PopupMultiSelectorComponent,
    PopupSelectorComponent,
    BindPopupDirective,
    BindMultiPopupComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonToggleModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MaterialModule,
  ],
  exports: [
    TableViewComponent,
    CardViewComponent,
    ChangeViewComponent,
    PopupMultiSelectorComponent,
    MapToPipe,
    BindPopupDirective,
    BindMultiPopupComponent,
  ],
})
export class DynamicViewsModule {}

export const SELECTOR = new InjectionToken<MemoizedSelector<any, any>>(
  'selector',
);
export const CLAZZ = new InjectionToken<any>('class');
export const LOAD_ACTION = new InjectionToken<any>('load_action');
export const LOAD_NEXT_ACTION = new InjectionToken<
  (props: { size: number; page: number }) => any
>('load_next_action');
export const ACTION_KEY = new InjectionToken<string>('action_key');
