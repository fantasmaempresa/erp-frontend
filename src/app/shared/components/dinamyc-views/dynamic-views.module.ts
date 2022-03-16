import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemoizedSelector } from '@ngrx/store';
import { TableViewComponent } from './table-view/table-view.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CardViewComponent } from './card-view/card-view.component';
import { SharedModule } from '../../shared.module';
import { ChangeViewComponent } from './change-view/change-view.component';

@NgModule({
  declarations: [TableViewComponent, CardViewComponent, ChangeViewComponent],
  imports: [CommonModule, MatTableModule, MatCheckboxModule, MatPaginatorModule, SharedModule],
  exports: [TableViewComponent, CardViewComponent, ChangeViewComponent],
})
export class DynamicViewsModule {}

export const SELECTOR = new InjectionToken<MemoizedSelector<any, any>>('selector');
export const LOAD_ACTION = new InjectionToken<any>('load_action');
export const LOAD_NEXT_ACTION = new InjectionToken<(props: { size: number; page: number }) => any>(
  'load_next_action',
);
export const LABELS = new InjectionToken<string[]>('labels');
export const FIELDS = new InjectionToken<string[]>('fields');
export const MAP_TO_FIELDS = new InjectionToken<Object>('mapTo');
export const ACTION_KEY = new InjectionToken<string>('action_key');
