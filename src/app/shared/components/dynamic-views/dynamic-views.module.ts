import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemoizedSelector } from '@ngrx/store';
import { TableViewComponent } from './table-view/table-view.component';
import { CardViewComponent } from './card-view/card-view.component';
import { ChangeViewComponent } from './change-view/change-view.component';
import { PopupMultiSelectorComponent } from './popup-multi-selector/popup-multi-selector.component';
import { MapToPipe } from '../../pipes';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { PopupSelectorComponent } from './popup-selector/popup-selector.component';
import { HostDirective } from '../../directives';
import { BindPopupDirective } from './directives/bind-popup.directive';
import { BindMultiPopupComponent } from './directives/bind-multi-popup/bind-multi-popup.component';
import { MaterialModule } from '../../material/material.module';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

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
