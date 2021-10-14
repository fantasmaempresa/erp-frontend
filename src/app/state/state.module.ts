import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducers } from './index';

@NgModule({
  declarations: [],
  imports: [CommonModule, StoreModule.forRoot(reducers)],
})
export class StateModule {}
